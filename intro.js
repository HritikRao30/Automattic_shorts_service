const axios = require('axios');
const fs = require("fs")

//intro template 
//countdown or point 
//opinions template done

const runPrompt = async (topic) => {
    console.log("running");
    introPrompt = `write youtube shorts script of on ${topic} and give 3 tags for it in the following json parsable format return valid json dont use # or anything outside string dont add escape characters or unexpected tokens it should not give parse error. avoid using unexpected tokens and add punctuation marks wherever needed and the background music will correspond to one of the music genre suitable for theme from among ["high octane","epic","ambient","sad","emotional","nostalgic","suspense","drama"] only. ensure you give different quotes of experts or the person involved in the fact dont add any unexpected characters in json just return the string no escape characters also
    {
        "title": "topic",
        "image": {
          "title": "title",
          "description": "generic artistic description for ai art generator"
        },
        "context": "short introduction to the topic keep it below 40 words",
        "script": [
          {
            "part": 1,
            "title": "INTRO",
            "context": "summary for the part within 30 words",
            "narration": "short intro to the topic",
            "background music": {"genre":"genre name","id","id"},
            "specific_image": [
              {
                "title": "title",
                "description": "generic artistic description for ai generator"
              }
            ],
            "youtube_clip": {
              "title": "title of the clip",
              "description": "keyword or description to search on youtube"
            }
          },
          {
            "part": 2,
            "title": "OUTRO",
            "narration": "brief summary followed by outro to the shorts video",
            "background music": {"genre":"genre name","id","id"},
            "generic_image": {
              "title": "title",
              "description": "generic artistic description for ai generator"
            }
          }
        ],
        "opinions": [
          {
            "opinion": "quote or opinion of person on the topic",
            "person": "name of the person quoting",
            "designation": "designation"
          }
        ],
        "description": "description for youtube shorts",
        "tags": ["tags"]
      }`;

    Pointsprompt = `write youtube shorts script of on the ${topic} and give 3or 4 key events or points or facts (brief and crisp) for it in the following json parsable format avoid using unexpected tokens and add punctuation marks wherever needed and the background music id will correspond to the index of the music genre suitable for theme from among ["high octane","epic","ambient","sad","emotional","nostalgic","suspense","drama"] only index starts from 0 ensure you give different quotes of experts or the person involved in the fact dont add any unexpected characters in json just return the string no escape characters also
    {
  "script": 
    {
      "part":2,
      "title":"KEY POINTS",
      "points":[
        {
          "title": "title",
          "narration": "actual fact or content",
          "quote":{
            "quote":"quote",
            "person":"name of the person quoting",
            "designation":"designation"
          },
          "background music": {"genre":"genre name","id":"id"},
          "person": {
            "name":"name of person image involved in the point",  
            "image":"keyword for his image"
          },
          "specific_image": [{
            "title": "title",
            "description": "generic artistic description for ai generator",
          } ,...]
        },...
      ]
    }
    }`

    try {

        let obj = {
            "prompt": introPrompt
        }

        const response = await axios.post('http://localhost:5000/shorts', { prompt: JSON.stringify(obj) });

        let regex = /```json([\s\S]*?)```/;
        let match = regex.exec(response.data.bard)[1];
        let json1 = match.replace("/\n/g", "");
        let javascriptObj = JSON.parse(json1);  //intro and outro

        // let obj2 = {
        //     "prompt":Pointsprompt
        // }

        // const response2 = await axios.post('http://localhost:5000/shorts', { prompt: JSON.stringify(obj2) });


        // let match2 = regex.exec(response2.data.bard)[1];
        // let json2 = match.replace("/\n/g", "");
        // let javascriptObj2 = JSON.parse(json2);
        // console.log(javascriptObj2);

    }
    catch (err) {
        console.log(err);
    }

};


const imageGen = (script, prt) => {
    let google = [];
    let nameOverlay = [];
    let leo = [];
    if (prt == 0) {
        for (image of script["sections"][0]["image"]) {
            leo.push(JSON.stringify(image));
        } //intro done       
    }
    else if (prt == 1) {
        for (let evts of script["sections"][1]["events"]) {   //the date overlay will be present in all from this point
            google.push(evts["location"] + evts["war"]);
            leo.push(evts["image"]["description"]);
            nameOverlay = [...evts["characters"]];  //used by different template
            for (let narr of evts["narration"]) {
                google.push(narr["person"]);
                leo.push(narr["generic_image"]);    //key events template            
            }
        }
    }
    else if (prt == 2) {
        for (image of script["sections"][3]["image"]) {
            let str = image["location"] + " during " + image["phase"] + "date :" + image["date"];
            google.push(str);
        } //intro done  
    }
    else {
        leo.push(script["sections"][4]["image"]["description"]);     //the testimonial template
        for (image of script["sections"][4]["characters"]) {
            let str = `${image["name"]} ${image["designation"]}`;
            google.push(str);
            leo.push(image["image"]);
        } //intro done       
    }
    return {
        "google": google,
        "leo": leo,
        "nameOverlay": nameOverlay
    }

}

const topicPrompt = async () => {

    const response = await axios.post('http://localhost:5000/trends', {});

    const topics = response.data;

    console.log(topics);

    console.log("/////////////////////")

    const topicCategoryPrompt = `I will prompt you with a list of topics topics : ${topics.data} you should categorise them under 5 categories 1.) Entertainment,
    2.)Literature,
    3.)Business & Industrial,
    4.)Science,
    5.)Sports  respond in the following json parsable format
    {
        "entertainment":"array of list items under this category",
        "literature":"array of list items under this category",
        "business":"array of list items under this category",
        "science":"array of list items under this category",
        "sports":"array of list items under this category",
    }`

    try {

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: topicCategoryPrompt,
            max_tokens: 2048,
            temperature: 0.9,
        });

        const parsableJSONresponse = response.data.choices[0].text;

        const parsedResponse = JSON.parse(parsableJSONresponse);

        console.log("/////////////////////")

        console.log(parsedResponse)

        let tmp = []


        for (let key in parsedResponse) {
            if (parsedResponse[key].length) {
                tmp.push({
                    "category": key,
                    "value": parsedResponse[key][0]
                })
            }
        }

        console.log("/////////////////////")

        console.log(tmp)
        const resp = await axios.post('http://localhost:5000/relatedQueries', { categoryObj: JSON.stringify(tmp) });
        console.log(resp.data.data);

    }
    catch (err) {
        console.log(err);
        topicPrompt();
    }
}


// runPrompt("Ancient Egypt");



/*

const ytPrompt = `write youtube shorts script of on ${topic} and give 3 tags for it avoid using unexpected tokens and add punctuation marks wherever needed and the background music id will correspond to the index of the music genre suitable for theme from among ["high octane","epic","ambient","sad","emotional","nostalgic","suspense","drama"] only index starts from 0.Give 5 points for it. ensure you give different quotes of experts or the person involved in the fact.Add 2 or 3 quotes of people ivolved or of experts on the topic. Respond in the following json parsable format dont break the response comple the json fully and dont break your response give the full json response  dont add any unexpected characters in json just return the string no escape characters also
    {
  "title": ${topic},
  "image": {
    "title": "title",
    "description": "generic artistic description for ai art generator",
  },
  "context":"short introduction to the ${topic} keep it below 40 words",
  "script": [
    {
      "part": 1,
      "title":"INTRO",
      "context": "context and details of the pople , place etc involved",
      "narration":"short intro to the topic",
      "background music": "music genre id",
      "specific_image": [{
        "title": "title",
        "description": "generic artistic description for ai generator",
      } ,...],
      "youtub_clip":{
        "title":"title of the clip",
        "description":"keyword or description to earch on youtube"
      }
    },
    {
      "part":2,
      "title":"KEY POINTS",
      "points":[
        {
            "number":"fact number",
          "title": "title",
          "narration": "actual fact or content",
          "context":"context",
          "background music": "music genre id",
          "quote":{
            "opinion":"quote or opinion of person on the topic",
            "person":"name of the person quoting",
            "designation":"designation"
           },
          "person": {
            "name":"name of person image involved in the point",  
            "image":"keyword for his image"
          },
          "specific_image": [{
            "title": "title",
            "description": "generic artistic description for ai generator",
          } ,...]
        },...
      ]
    },
    {
      "part": 3,
      "title":"OUTRO",
      "narration": "breif summary followed by outro to the shorts video",
      "background music": "music genre id",
      "generic_image": {
        "title": "title",
        "description": "generic artistic description for ai generator",
      }
    }
    ],
    "opinions":[
        {
            "opinion":"quote or opinion of person on the topic",
            "person":"name of the person quoting",
            "designation":"designation"
        },...
    ],
    "description": "description for youtube shorts",
    "tags": "tags"
    }`

*/


let music = ["https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9lu86-1vlu-qq2m-bfcc-2srfgu3rg5aj/source.mp3", "https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9ltof-21sw-xq0q-tfka-1p9wug1ekbul/source.mp3", "https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9ludd-4ko2-vx1l-ouaz-3owvyl3hvpvb/source.mp3", "https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9ltsn-2fsw-rn3z-pief-43bfsu1hgkba/source.mp3", "https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9lttd-0i2i-y80r-vxhi-10wghs0lhvny/source.mp3", "https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9ltzy-271n-aq1d-wpwe-1nmiol4lwgho/source.mp3", "https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9lu3f-0hq4-wn2a-29hs-2h581b0von3f/source.mp3", "https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/5mcs01j6wg/zzy9lu5z-1utg-g83m-yl3l-2tvfz73zwwhb/source.mp3"];


let script = {
    "script":
    {
        "part": 2,
        "title": "KEY POINTS",
        "points": [
            {
                "title": "The Great Pyramid of Giza",
                "narration": "The Great Pyramid of Giza is the largest pyramid in the world, and one of the Seven Wonders of the Ancient World. It was built as a tomb for the pharaoh Khufu, and is estimated to have taken over 20 years to build.",
                "quote": {
                    "quote": "The Great Pyramid of Giza is a testament to the ingenuity and engineering skills of the ancient Egyptians.",
                    "person": "Zahi Hawass",
                    "designation": "Former Minister of Antiquities of Egypt"
                },
                "background music": { "genre": "ambient", "id": 2 },
                "person": {
                    "name": "Zahi Hawass",
                    "image": "zahi_hawass"
                },
                "specific_image": [{
                    "title": "The Great Pyramid of Giza",
                    "description": "A colossal limestone pyramid located in Giza, Egypt."
                }]
            },
            {
                "title": "The Book of the Dead",
                "narration": "The Book of the Dead is a collection of funerary texts that were used by the ancient Egyptians. It is believed to contain instructions on how to navigate the afterlife.",
                "quote": {
                    "quote": "The Book of the Dead is a fascinating glimpse into the beliefs and practices of the ancient Egyptians.",
                    "person": "James Henry Breasted",
                    "designation": "American Egyptologist"
                },
                "background music": { "genre": "sad", "id": 5 },
                "person": {
                    "name": "James Henry Breasted",
                    "image": "james_henry_breasted"
                },
                "specific_image": [{
                    "title": "The Book of the Dead",
                    "description": "A papyrus scroll containing a collection of funerary texts."
                }]
            },
            {
                "title": "The Rosetta Stone",
                "narration": "The Rosetta Stone is a multilingual slab of stone that was discovered in Egypt in 1799. It contains a decree issued by the pharaoh Ptolemy V in three languages: Egyptian hieroglyphs, Demotic script, and Ancient Greek.",
                "quote": {
                    "quote": "The Rosetta Stone was a major breakthrough in the decipherment of Egyptian hieroglyphs.",
                    "person": "Jean-François Champollion",
                    "designation": "French Egyptologist"
                },
                "background music": { "genre": "epic", "id": 0 },
                "person": {
                    "name": "Jean-François Champollion",
                    "image": "jean_francois_champollion"
                },
                "specific_image": [{
                    "title": "The Rosetta Stone",
                    "description": "A multilingual slab of stone containing a decree issued by the pharaoh Ptolemy V in three languages."
                }]
            }
        ]
    }
}




let narrationUrls = [
    {
        lenNarration: 11,
        lenQuote: 16,
        narration: 'https://cdn.filestackcontent.com/d6wp9nRQTbGBTmo3JpHE',
        quote: 'https://cdn.filestackcontent.com/orHmSPxiTGG1UMydXXIr'
    },
    {
        lenNarration: 10,
        lenQuote: 12,
        narration: 'https://cdn.filestackcontent.com/DhJnIOJ1TIewhnjbPBZw',
        quote: 'https://cdn.filestackcontent.com/pu4Q6aGQQWzWjA6enlkr'
    },
    {
        lenNarration: 9,
        lenQuote: 17,
        narration: 'https://cdn.filestackcontent.com/mwt6rOSnS6KWa1i1jbJQ',
        quote: 'https://cdn.filestackcontent.com/7SzGlvsTRiGmb1Van1m3'
    }
]


let imgurlls =
    [
        {
            'leornado': 'https://cdn.leonardo.ai/users/227e1e1b-765e-4418-8984-2734c26f12bc/generations/42f43d85-08ff-4fa9-b94d-bf74c7a2eec6/Default_The_Rosetta_StoneA_multilingual_slab_of_stone_containi_0.jpg?w=512',
            'google': 'https://theantiquitiescoalition.org/wp-content/uploads/2018/10/Dr.-Zahi-Hawass-.jpg'
        },
        {
            'leornado': 'https://cdn.leonardo.ai/users/227e1e1b-765e-4418-8984-2734c26f12bc/generations/7602e194-2495-48a7-92c1-2f6ccef904e4/Default_The_Book_of_the_DeadA_papyrus_scroll_containing_a_coll_0.jpg?w=512',
            'google': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Smithsonian_Institution_Archives_-_SIA2007-0364.jpg/220px-Smithsonian_Institution_Archives_-_SIA2007-0364.jpg'
        },
        {
            'leornado': 'https://cdn.leonardo.ai/users/227e1e1b-765e-4418-8984-2734c26f12bc/generations/7752ce87-07e3-427c-880c-7adda12e9f80/Default_The_Rosetta_StoneA_multilingual_slab_of_stone_containi_0.jpg?w=512',
            'google': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Jacques-Joseph_Champollion-Figeac_young.jpg/220px-Jacques-Joseph_Champollion-Figeac_young.jpg'
        }
    ]

const imageObj = (script) => {
    let google = [];
    let leo = [];
    let fin = [];
    let pts = script["script"]["points"];
    for (pt of pts) {
        let obj = {
            "google": "",
            "leornado": ""
        }
        obj["leornado"] = pt["specific_image"][0];
        // leo.push(pt["specific_image"][0]);
        if (pt["quote"] && pt["quote"]["quote"]) {
            obj["google"] = pt["quote"]["person"] + " " + pt["quote"]["designation"];
            // google.push(pt["quote"]["person"] + " " + pt["quote"]["designation"]);
        }
        fin.push(obj);
    } //intro done       
    return fin;
}

//   ,startTime,wait,speechRate
function processText(txt) {
    let words = txt.split(/\s+/);
    for (let word of words) {
        if (!isNaN(word)) {
            let newSentence = txt.replace(word, `<u>${word}</u>`);
            txt = newSentence
        }
    }
    return txt;
}

async function shotstackGen(script, i, startTime, wait, speechRate) {

    let transitionss = [{ "in": "fade", "out": "fade" }, { "in": "reveal", "out": "reveal" }, { "in": "wipeLeft", "out": "wipeRight" }, { "in": "slideLeft", "out": "slideRight" }, { "in": "carouselLeft", "out": "carouselRight" }, { "in": "shuffleTopRight", "out": "shuffleRightTop" }]

    let htmlOverlaytemplate = {
        "clips": [
            {
                "asset": {
                    "type": "html",
                    "html": "<p>&nbsp;</p>",
                    "width": 1920,
                    "height": 1080,
                    "background": "#cc140f28"
                },
                "start": 5,
                "length": 6,
                "transition": {
                    "in": "fade",
                    "out": "fade"
                },
                "fit": "none",
                "scale": 1,
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "position": "center"
            }
        ]
    }

    let htmlQuoteTemplate = {
        "clips": [
            {
                "asset": {
                    "type": "html",
                    "html": "<p data-html-type=\"text\">yepparra</p>",
                    "css": "p { color: #ffffff; font-size: 28px; font-family: Montserrat ExtraBold;} u { color: #ff0000; text-align: left; }",
                    "width": 311,
                    "height": 364
                },
                "fit": "none",
                "scale": 1,
                "offset": {
                    "x": -0.332,
                    "y": -0.04
                },
                "position": "center",
                "start": 5.8,
                "length": 4,
                "transition": {
                    "in": "slideUp"
                }
            }
        ]
    }

    let textOverlayClip = {
        "asset": {
            "type": "html",
            "html": "<p data-html-type='text'>HELLO WORLD</p>",
            "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; } u { color: #ff0000; text-decoration: none; }",
            "width": 300,
            "height": 127
        },
        "start": 0.32,
        "length": 0.5,
        "fit": "none",
        "scale": 1,
        "offset": {
            "x": 0,
            "y": 0
        },
        "position": "center"
    }

    let imageClip = {
        "asset": {
            "type": "image",
            "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lcha-3wmw-301k-o25e-0yhaxg29jn3u/source.jpg"
        },
        "start": 0,
        "offset": {
            "x": 0,
            "y": 0
        },
        "position": "center",
        "fit": "cover",
        "length": 4.95,
        "transition": {
            "out": "fade"
        },
        "scale": 1
    }


    let audioClip = {
        "asset": {
            "type": "audio",
            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/audio/financial-podcast.mp3"
        },
        "start": 0,
        "length": 10
    }

    let bgm = {
        "src": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/music/unminus/kring.mp3",
        "effect": "fadeOut"
    }

    let editObj = {
        "timeline": {
            "background": "#ff6600",
            "tracks": [

            ]
        },
        "output": {
            "size": {
                "width": 1024,
                "height": 576
            },
            "format": "mp4"
        }
    };
    if (i == 1) {  //for the main part
        //generate the text to speech for all of the points
        let pts = script["script"]["points"];

        // const resp = await axios.post('http://localhost:5000/textToSpeech', { points: JSON.stringify(pts) });
        // const speechData = resp.data.data;  //got the audio created

        // console.log(speechData)

        //generate all the images specific as well as general
        // let obj = imageObj(script);

        // console.log(obj);

        // const responsee = await axios.post('http://localhost:5000/imageGen2', { imageObj: JSON.stringify(obj) }); 
        // console.log(responsee.data.success)

        let textOverlayClip = {
            "asset": {
                "type": "html",
                "html": "<p data-html-type='text'>HELLO WORLD</p>",
                "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; } u { color: #ff0000; text-decoration: none; }",
                "width": 300,
                "height": 127
            },
            "start": 0.32,
            "length": 0.5,
            "fit": "none",
            "scale": 1,
            "offset": {
                "x": 0,
                "y": 0
            },
            "position": "center"
        }

        let prev = startTime;
        let indx = 0;
        for (let pt of pts) {
            transitionIndx = Math.floor(Math.random() * 6);
            let textOverlayTrack = {
                "clips": []
            }
            let audioTrack = {
                "clips": []
            }
            let imageTrack = {
                "clips": []
            }
            let title = {
                "asset": {
                    "type": "html",
                    "html": "<p data-html-type='text'>HELLO WORLD</p>",
                    "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; } u { color: #ff0000; text-decoration: none; }",
                    "width": 300,
                    "height": 127
                },
                "start": 0.32,
                "length": 0.5,
                "fit": "none",
                "scale": 1,
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "position": "center"
            };
            title["asset"]["html"] = `<p data-html-type='text'>${processText(pt["title"])}</p>`;
            title["start"] = prev + 0.5;
            console.log(`TITLE: ${title["start"]}`);
            title["length"] = 2;

            prev += ((0.5 + 2) + 1);

            let darkOut = htmlOverlaytemplate;                                     //overlay the screen dark out
            darkOut["clips"][0]["start"] = prev;
            darkOut["clips"][0]["length"] = 5 + 1;

            console.log(`DARKOUT: ${darkOut["clips"][0]["start"]}`);

            let context = {
                "asset": {
                    "type": "html",
                    "html": "<p data-html-type='text'>HELLO WORLD</p>",
                    "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; } u { color: #ff0000; text-decoration: none; }",
                    "width": 300,
                    "height": 127
                },
                "start": 0.32,
                "length": 0.5,
                "fit": "none",
                "scale": 1,
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "position": "center"
            };
            context["asset"]["html"] = `<p data-html-type='text'>${processText(pt["narration"])}</p>`;
            context["start"] = prev + 0.5;
            console.log(`CONTEXT : ${context["start"]}`);
            context["length"] = 5;



            textOverlayTrack["clips"].push(title);
            textOverlayTrack["clips"].push(context);



            prev += (5.5)
            let words = pt["narration"].split(/\s+/);





            //image clips will be edited here along with the audio clips

            let img = {
                "asset": {
                    "type": "image",
                    "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lcha-3wmw-301k-o25e-0yhaxg29jn3u/source.jpg"
                },
                "start": 0,
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "position": "center",
                "fit": "cover",
                "length": 4.95,
                "transition": {
                    "out": "fade"
                },
                "scale": 1
            }
            img["asset"]["src"] = imgurlls[indx]["leornado"];
            img["start"] = prev

            console.log(`IMAGE1 : ${img["start"]}`);

            img["transition"]["in"] = transitionss[transitionIndx]["in"];
            img["transition"]["out"] = transitionss[transitionIndx]["out"];
            img["effect"] = "zoomIn",
                prev += 0.5

            let narrationTTS = {
                "asset": {
                    "type": "audio",
                    "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/audio/financial-podcast.mp3"
                },
                "start": 0,
                "length": 10
            }
                ;
            narrationTTS["asset"]["src"] = narrationUrls[indx]["narration"];
            narrationTTS["start"] = prev;
            narrationTTS["length"] = narrationUrls[indx]["lenNarration"];

            console.log(`NARRATION : ${narrationTTS["start"]}`);

            let arr = [];

            for (let word of words) {



                let dur = (word.length * 60) / 130;
                let wordTemplate = {
                    "asset": {
                        "type": "html",
                        "html": "<p data-html-type='text'>HELLO WORLD</p>",
                        "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; } u { color: #ff0000; text-decoration: none; }",
                        "width": 300,
                        "height": 127
                    },
                    "start": 0.32,
                    "length": 0.5,
                    "fit": "none",
                    "scale": 1,
                    "offset": {
                        "x": 0,
                        "y": 0
                    },
                    "position": "center"
                };
                wordTemplate["asset"]["html"] = `<p data-html-type='text'>${processText(word)}</p>`;
                wordTemplate["start"] = prev;
                console.log(`TEXT OVERLAY : ${prev}`);
                wordTemplate["length"] = dur + 0.1;
                prev += (dur + 0.1);

                // console.log(wordTemplate);
                // console.log("/////////////////////////");
                textOverlayTrack["clips"].push(wordTemplate);

            }

            console.log(textOverlayTrack["clips"]);

            prev += 1;

            img["length"] = (prev - img["start"]) / 2;

            let img2 = {
                "asset": {
                    "type": "image",
                    "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lcha-3wmw-301k-o25e-0yhaxg29jn3u/source.jpg"
                },
                "start": 0,
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "position": "center",
                "fit": "cover",
                "length": 4.95,
                "transition": {
                    "out": "fade"
                },
                "scale": 1
            };
            img2["asset"]["src"] = imgurlls[indx]["leornado"];
            img2["start"] = img["start"] + img["length"];

            console.log(`IMAGE2 : ${img2["start"]}`);

            img2["length"] = img["length"];

            img2["transition"]["in"] = transitionss[transitionIndx]["in"];
            img2["transition"]["out"] = transitionss[transitionIndx]["out"];
            img2["effect"] = "zoomOut";

            let quote = htmlQuoteTemplate;
            quote["clips"][0]["asset"]["html"] = `<p data-html-type='text'>${processText(pt["quote"]["quote"])}</p>`;
            quote["clips"][0]["start"] = prev + 1.5;
            console.log(`QUOTE TEXPLATE : ${quote["clips"][0]["start"]}`);
            quote["clips"][0]["length"] = narrationUrls[indx]["lenQuote"] + 0.8;

            let quoteTTS = {
                "asset": {
                    "type": "audio",
                    "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/audio/financial-podcast.mp3"
                },
                "start": 0,
                "length": 10
            }
                ;
            quoteTTS["asset"]["src"] = narrationUrls[indx]["quote"];
            quoteTTS["start"] = prev + 1.9;
            console.log(`QUOTE TTS : ${quoteTTS["start"]}`);
            quoteTTS["length"] = narrationUrls[indx]["lenQuote"];

            let quoteAnimation = {
                "clips": [
                    {
                        "asset": {
                            "type": "video",
                            "src": "https://templates.shotstack.io/basic/asset/video/overlay/flat-panel/black/content-left-in.mov"
                        },
                        "start": prev + 0.8,
                        "length": (narrationUrls[indx]["lenQuote"] + 2.3 + 1)
                    }
                ]
            }
            console.log(`QUOTE ANIMATION: ${quoteAnimation["clips"][0]["start"]}`)

            let img3 = {
                "asset": {
                    "type": "image",
                    "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lcha-3wmw-301k-o25e-0yhaxg29jn3u/source.jpg"
                },
                "start": 0,
                "offset": {
                    "x": 0,
                    "y": 0
                },
                "position": "center",
                "fit": "cover",
                "length": 4.95,
                "transition": {
                    "out": "fade"
                },
                "scale": 1
            };
            img3["asset"]["src"] = imgurlls[indx]["google"];
            img3["start"] = prev;
            console.log(`GOOGLE IMAGE : ${prev}`);
            img3["length"] = (narrationUrls[indx]["lenQuote"] + 1.5 + 1.5);
            img3["transition"]["in"] = transitionss[transitionIndx]["in"];
            img3["transition"]["out"] = transitionss[transitionIndx]["out"];
            img3["effect"] = "slideRight";

            prev += ((narrationUrls[indx]["lenQuote"] + 3.3) + 0.5) //0.5 is between 2 scenes

            audioTrack["clips"].push(narrationTTS);
            audioTrack["clips"].push(quoteTTS);

            imageTrack["clips"] = [img, img2, img3];

            editObj["timeline"]["tracks"].push(quote);

            editObj["timeline"]["tracks"].push(textOverlayTrack);
            editObj["timeline"]["tracks"].push(htmlOverlaytemplate);
            editObj["timeline"]["tracks"].push(quoteAnimation);
            editObj["timeline"]["tracks"].push(imageTrack);
            editObj["timeline"]["tracks"].push(audioTrack);
            indx += 1;
        }


        fs.writeFile("C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/videoJSON.txt", JSON.stringify(editObj), (error) => {
            if (error) {
                console.error('Error writing file:', error);
            } else {
                console.log('File written successfully');
            }
        });


        try {
            const headers2 = {
                'Accept': 'application/json',
                'x-api-key': 'JzcMgcgeNRa6AapdPjtHU9A61heZWpIp70D37Kbz'
            };

            const response2 = await axios.post(`https://api.shotstack.io/edit/stage/render/`, JSON.stringify(editObj), {
                headers: headers2
            });
            let id = response2.data.response.id;

            let url = await polling(id);

            const response = await axios.get(url, { responseType: 'stream' });

            // Create a writable stream to save the MP4 file
            const fileStream = fs.createWriteStream("C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/finalVid.mp4");

            // Pipe the readable stream to the writable stream
            response.data.pipe(fileStream);

            // Event handlers to track progress or handle errors
            response.data.on('end', () => {
                console.log('Download complete');
            });

            response.data.on('error', (error) => {
                console.error('Download error:', error);
            });

            fileStream.on('finish', () => {
                console.log('File saved successfully');
            });
        } catch (err) {
            console.log(err);
        }

    }
}

const polling = async (id) => {
    let url = `https://api.shotstack.io/edit/stage/render/${id}`;
    return new Promise(async (resolve, reject) => {
        try {
            while (true) {
                const headers = {
                    'Accept': 'application/json',
                    'x-api-key': 'JzcMgcgeNRa6AapdPjtHU9A61heZWpIp70D37Kbz'
                };
                const response = await axios.get(url, {
                    headers: headers
                });

                const status = response.data.response.status;

                if (status == "done") {
                    resolve(response.data.response.url);
                    return
                }
                else {
                    setTimeout(() => {
                        console.log("not ready");
                    }, 5000);
                }
            }

        } catch (err) {
            reject(-1);
        }
    })


}

shotstackGen(script, 1, 0, 0, 130);




// {
//     "timeline": {
//         "background": "#000000",
//             "tracks": [
//                 {
//                     "clips": [
//                         {
//                             "asset": {
//                                 "type": "html",
//                                 "html": "<p data-html-type=\"text\">yepparra</p>",
//                                 "css": "p { color: #ffffff; font-size: 28px; font-family: Montserrat ExtraBold; u { color: #ff0000; text-align: left; }",
//                                 "width": 311,
//                                 "height": 364
//                             },
//                             "fit": "none",
//                             "scale": 1,
//                             "offset": {
//                                 "x": -0.332,
//                                 "y": -0.04
//                             },
//                             "position": "center",
//                             "start": 5.8,
//                             "length": 4,
//                             "transition": {
//                                 "in": "slideUp"
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     "clips": [
//                         {
//                             "asset": {
//                                 "type": "html",
//                                 "html": "<p data-html-type='text'>HELLO WORLD</p>",
//                                 "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
//                                 "width": 300,
//                                 "height": 127
//                             },
//                             "start": 0.32,
//                             "length": 0.5,
//                             "fit": "none",
//                             "scale": 1,
//                             "offset": {
//                                 "x": 0,
//                                 "y": 0
//                             },
//                             "position": "center"
//                         },
//                         {
//                             "asset": {
//                                 "type": "html",
//                                 "html": "<p>this</p>",
//                                 "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
//                                 "width": 450,
//                                 "height": 100,
//                                 "position": "center"
//                             },
//                             "start": 1.03,
//                             "length": 0.5
//                         },
//                         {
//                             "asset": {
//                                 "type": "html",
//                                 "html": "<p>is</p>",
//                                 "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
//                                 "width": 450,
//                                 "height": 100,
//                                 "position": "center"
//                             },
//                             "start": 1.74,
//                             "length": 0.5
//                         },
//                         {
//                             "asset": {
//                                 "type": "html",
//                                 "html": "<p>my</p>",
//                                 "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
//                                 "width": 450,
//                                 "height": 100,
//                                 "position": "center"
//                             },
//                             "start": 2.5,
//                             "length": 0.5
//                         },
//                         {
//                             "asset": {
//                                 "type": "html",
//                                 "html": "<p>Kinetic</p>",
//                                 "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
//                                 "width": 450,
//                                 "height": 100,
//                                 "position": "center"
//                             },
//                             "start": 3.19,
//                             "length": 0.5
//                         },
//                         {
//                             "asset": {
//                                 "type": "html",
//                                 "html": "<p>text</p>",
//                                 "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
//                                 "width": 450,
//                                 "height": 100,
//                                 "position": "center"
//                             },
//                             "start": 3.96,
//                             "length": 0.5
//                         }
//                     ]
//                 },
//                 {
//                     "clips": [
//                         {
//                             "asset": {
//                                 "type": "video",
//                                 "src": "https://templates.shotstack.io/basic/asset/video/overlay/flat-panel/black/content-left-in.mov"
//                             },
//                             "start": 5.5,
//                             "length": 5
//                         }
//                     ]
//                 },
//                 {
//                     "clips": [
//                         {
//                             "asset": {
//                                 "type": "image",
//                                 "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lcha-3wmw-301k-o25e-0yhaxg29jn3u/source.jpg"
//                             },
//                             "start": 0,
//                             "offset": {
//                                 "x": 0,
//                                 "y": 0
//                             },
//                             "position": "center",
//                             "fit": "cover",
//                             "length": 4.95,
//                             "transition": {
//                                 "out": "fade"
//                             },
//                             "scale": 1
//                         }
//                     ]
//                 },
//                 {
//                     "clips": [
//                         {
//                             "asset": {
//                                 "type": "image",
//                                 "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lcep-3uxs-b81v-wrxs-3om8zn1ezuku/source.jpg"
//                             },
//                             "start": 4.83,
//                             "length": 6,
//                             "transition": {
//                                 "in": "carouselUp"
//                             },
//                             "offset": {
//                                 "x": 0,
//                                 "y": 0
//                             },
//                             "position": "center",
//                             "fit": "cover"
//                         }
//                     ]
//                 }
//             ]
//     },
//     "output": {
//         "size": {
//             "width": 1024,
//                 "height": 576
//         },
//         "format": "mp4"
//     }
// }








