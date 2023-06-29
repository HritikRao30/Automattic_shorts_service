const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

const configg = new Configuration({
  apiKey: "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",
});

const script = {
  "video_title": "Battle of Porto Bello, 1739-1741",
  "name_of_battle": "Battle of Porto Bello, 1739-1741",
  "location":"Porto Bello",
  "sections": [
    {
      "title": "Opening Sequence",
      "context": "The War of Jenkins' Ear was fought between Great Britain and Spain between 1739 and 1741.",
      "narration": "The Battle of Porto Bello was a crucial episode in the War of Jenkins' Ear.",
      "image": [{
        "title": "British Ships at Porto Bello",
        "description": "Image of the British ships attacking Porto Bello.",
        "location": "Porto Bello, Panama",
        "theme": "War"
      }, {
        "title": "Spanish Defenders of Porto Bello",
        "description": "Image of the Spanish soldiers defending Porto Bello.",
        "location": "Porto Bello, Panama",
        "theme": "Defence"
      }],
      "music": "high octane"
    },
    {
      "title": "Key Events",
      "context": "The Battle of Porto Bello was fought between a British naval and land force and defending Spanish forces",
      "events": [
        {
          "image": {
            "title": "British Naval Fleet",
            "description": "Image of the British fleet attacking Porto Bello.",
          },
          "data": "On November 21, 1739, the British naval fleet led by Admiral Edward Vernon attacked Porto Bello.",
          "date": "November 21, 1739",
          "characters": ["Admiral Edward Vernon"],
          "narration":
            [
              {
                "point": "The British fleet led by Admiral Edward Vernon attacked Porto Bello on November 21, 1739.",
                "context image": "British Naval Fleet",
                "person": "Admiral Edward Vernon",
                "generic_image": "Image of a British fleet attacking a port."
              },
              {
                "point": "The Spanish defenders fought back fiercely.",
                "context image": "Spanish Defenders of Porto Bello",
                "person": "Spanish defenders",
                "generic_image": "Image of Spanish soldiers fighting against a naval attack."
              }
            ],
          "location": "Porto Bello, Panama",
          "theme": "War",
          "music": "epic"
        }, {
          "image": {
            "title": "British Victory",
            "description": "Image of the British ships victorious in Porto Bello.",
          },
          "data": "After weeks of battle, the British fleet emerged victorious.",
          "date": "December 22, 1739",
          "characters": ["Admiral Edward Vernon"],
          "narration":
            [
              {
                "point": "The British fleet emerged victorious on December 22, 1739 after weeks of battle.",
                "context image": "British Victory",
                "person": "Admiral Edward Vernon",
                "generic_image": "Image of British ships celebrating victory."
              }
            ],
          "location": "Porto Bello, Panama",
          "theme": "Victory",
          "music": "sad"
        }
      ]
    },
    {
      "title": "Historical Footage",
      "context": "Historical footage of the Battle of Porto Bello.",
      "image": {
        "title": "British Naval Fleet",
        "keyword": "British fleet attacking Porto Bello",
      },
      "narration": "Historical footage of the British fleet attacking Porto Bello.",
      "music": "emotional"
    },
    {
      "title": "Maps and Graphics",
      "context": "Geopolitical context of the War of Jenkins' Ear.",
      "image": [{
        "title": "Geopolitical Map",
        "location": "Atlantic Ocean and Caribbean Sea",
        "phase": "Battle of Porto Bello",
        "date": "1739-1741",
        "map_description": "Map of the Atlantic Ocean and Caribbean Sea during the Battle of Porto Bello.",
        "narration": "A map of the Atlantic Ocean and Caribbean Sea during the Battle of Porto Bello."
      }],
      "music": "nostalgic"
    },
    {
      "title": "Personal Stories",
      "context": "Personal stories of soldiers that fought in the Battle of Porto Bello.",
      "image": {
        "title": "Soldiers of Porto Bello",
        "description": "Image of the soldiers fighting in the Battle of Porto Bello.",
      },
      "characters": [
        {
          "name": "Admiral Edward Vernon",
          "designation": "British Admiral",
          "testimonial": "It was a tremendous battle and we fought bravely.",
          "image": "Image of a British Admiral saluting his fleet."
        }, {
          "name": "Colonel Juan Pizarro",
          "designation": "Spanish Commander",
          "testimonial": "We fought with honour and courage, but were ultimately defeated.",
          "image": "Image of a Spanish Commander standing proudly."
        }
      ],
      "music": "drama"
    }
  ]
}

const openai = new OpenAIApi(configg);

let topics = {};

const genres = ["historical mysteries", "inverntor profiles", "time travel Adventures", "Ancient Civilizations lifestyles,architecture and other", "biographical dramas", "recreating past events"]

const runPrompt = async () => {
  console.log("running");
  const ytStoryPrompt = `
    Can you provide a 'What If' scenario based on a 26/11 terror attacks? Please specify the event and describe the hypothetical scenario you'd like to explore.the paragraphs will folow general trend intro,consequences , climax , conclusion etc but you can mould it a bit if required and follow non linear narration as well to make narration better and more interesting. Additionally, include any specific questions or aspects you'd like to be addressed in the discussion of the scenario. Provide a category for the video, an intriguing video title, a captivating thumbnail description, and around 5 points that will be discussed in the video. do not repeat your responses ever respond in the json parsable format giiven below dont give any explaination or any additional text just respond in the following json parsable format.
    {
      "title": "title of the video make it intriguing and interesting",
      "thumbnail_description": "A gripping thumbnail with great detailing relevant to the topic",
      "content": {
            "paragraphs": [
              {
                "type": "intro",
                "content": "In this segment, we delve into the hypothetical scenario of what if topic",
                "title": "short title for this section",
                "images": [
                  {
                    "title": "tile of image",
                    "description": "image description for ai art generator (for eg An image depicting a beachhead under heavy enemy fire, representing the potential challenges faced in a failed D-Day invasion.)"
                  }, // around 2 or 3 images for each paragraph
                ],
                "body": {
                  "title": "Introduction",
                  "description": "The intro paragraph provides an overview of the hypothetical scenario and sets the stage for the discussion.",
                  "points": [
                    {
                      "content": "actual point",
                      "image": {
                        "title": "tile of image",
                        "description": "image description for ai art generator (for eg An image depicting a beachhead under heavy enemy fire, representing the potential challenges faced in a failed D-Day invasion.)"
                      },
                      "music_effect": "relevant music effect relevant to the scene or the event depicted in the point for eg thunderstorm,battle,rain,chaos,fire many more"
                    }, ... //have around 4 to 5 points for each
                  ]
                }
              },
              {
                "type": "consequences",
                "content": "We analyze the potential outcomes regarding the hypothetical situation.",
                "title": "short title for this section",
                "image": "theme image description summarizing the situation",
                "body": {
                  "title": "consequences",
                  "description": "The build-up paragraph explores the positive or negartive outcomes following the situation.",
                  "points": [
                    {
                      "content": "actual point",
                      "image": {
                        "title": "tile of image",
                        "description": "image description for ai art generator (for eg An image depicting a beachhead under heavy enemy fire, representing the potential challenges faced in a failed D-Day invasion.)"
                      },
                      "music_effect": "relevant music effect relevant to the scene or the event depicted in the point for eg thunderstorm,battle,rain,chaos,fire many more"
                    }, ... //have around 4 to 5 points for each
                  ]
                }
              },
              ...
            ],
            "questions": "array of interesting and deep additional questions that might arise in viewers mind return 3 questions"
            "background_music" : "describe the music suitable for the theme or mood depicted in the video for eg aggressive,high octane,pleasant,fun or ambient"
        }
    }
  }`

  const ytWarDocumentary = `choose a historic battle and make the script analysis the battle and its key events in the following json parsable format.ensure your responses are unique each time. ensure the image titles and descriptions are unique music id must be returned in music where id relates to index starting from 0 of the array = ["high octane","epic","ambient","sad","emotional","nostalgic","suspense","drama"] ensure the narrations are not more than 30 40 words keep it short and crisp
    {
    "video_title":"title",
    "name_of_battle":"battle name",
        "sections": [
          {
            "title": "Opening Sequence",
                "context": "historic context",
                "narration": "narration for build up",
            "image": [{
              "title": "title",
              "description": "description.",
                "location": "location",
              "theme": "theme of image"
            },..],
            "music": "music id"
          },
          {
            "title": "Key Events",
            "context": "context",
            "events": [
                  {
                    "image": {
                        "title": "title",
                        "description": "generic artistic description for ai generator",
                    },
                    "data": "data",
                    "date": "date",
                    "characters": "array containing major people involved in this event",
                    "narration": 
                        [
                            {
                            "point": "actual script for narration",
                            "context image": "context image",
                            "person": "keyword for person image involved in the point",
                            "generic_image":"description for ai art generator a bit generic"
                            },...
                        ],
                    "location": "location",
                    "theme":"theme of event",
                    "music": "music id",
                },..
            ]
          },
          {
            "title": "Historical Footage",
            "context": "context",
            "image": {
              "title": "title",
              "keyword": "keyword to search for in youtube pay attention to the detailing in the description",
           
              },
              "narration": "narration",
            "music": "music id"
          },
          {
            "title": "Maps and Graphics",
            "context": "geopolitical context",
            "image": [{
                "title": "Geopolitical Map",
                "location": "location of the war",
                "phase": "map in respective phase of the war",
                "date": "date",
                "map_description": "description",
              "narration": "brief narration"
            },...],
            "music": "music id"
          },
          {
            "title": "Personal Stories",
            "context": "context",
            "image": {
              "title": "title",
              "description": "description",
            },
            "characters": [
              {
                "name": "name",
                "designation": "designation",
                "testimonial": "testimony of individual during the war",
                "image":"description related to the testimonial"
              },...
            ],
            "music": "music id"
          }
        ]
      }`

  const tstPrompt = `return a 100 word script on amazing facts in history`;

  let topics = {
    "data": [
      'Sri Lanka vs Ireland',
      'Wagner Group',
      'Zimbabwe vs West Indies',
      'SAFF Championship',
      'Messi',
      'Egypt',
      'Rahul gandhi',
      'India vs West Indies',
      'Lionel Messi Birthday',
      'Warren Buffett',
      'Implosion',
      '1920: Horrors of the Heart',
      'Adani',
      'Kamala Harris',
      'James Cameron',
      'Kerala Story OTT',
      'Sundar Pichai',
      'Kylian mbappé',
      'Shahzada Dawood',
      'Dhoomam'
    ]
  }

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

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: tstPrompt,
    //   max_tokens: 2048,
    //   temperature: 0.9,
    // });

    // const parsableJSONresponse = response.data.choices[0].text;

    // console.log(parsableJSONresponse);

    // const parsedResponse = JSON.parse(parsableJSONresponse);

    // const responsee = await axios.post('http://localhost:5000/imageGen2', { video_script: JSON.stringify(parsedResponse) }); 

    let obj = imageGen(script, 0);

    const responsee = await axios.post('http://localhost:5000/imageGen2', { imageObj: JSON.stringify(obj) }); 

    console.log(responsee.data);

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
    const resp = await axios.post('http://localhost:5000//relatedQueries', { categoryObj: JSON.stringify(tmp) });
    console.log(resp.data.data);

  }
  catch (err) {
    console.log(err);
    topicPrompt();
  }
}


runPrompt();

//video template topic name general image
//intro template context narration with arrow left context  or bottom third
//person name image template
//points template with text overlay
//quote template
//outro







