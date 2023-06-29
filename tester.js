let basicTmp = {
    "timeline": {
        "background": "#000000",
            "tracks": [
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type=\"text\">yepparra</p>",
                                "css": "p { color: #ffffff; font-size: 28px; font-family: Montserrat ExtraBold; text-align: left; }",
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
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type='text'>HELLO WORLD</p>",
                                "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
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
                        },
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p>this</p>",
                                "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 450,
                                "height": 100,
                                "position": "center"
                            },
                            "start": 1.03,
                            "length": 0.5
                        },
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p>is</p>",
                                "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 450,
                                "height": 100,
                                "position": "center"
                            },
                            "start": 1.74,
                            "length": 0.5
                        },
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p>my</p>",
                                "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 450,
                                "height": 100,
                                "position": "center"
                            },
                            "start": 2.5,
                            "length": 0.5
                        },
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p>Kinetic</p>",
                                "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 450,
                                "height": 100,
                                "position": "center"
                            },
                            "start": 3.19,
                            "length": 0.5
                        },
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p>text</p>",
                                "css": "p { color: #ffffff; font-size: 50px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 450,
                                "height": 100,
                                "position": "center"
                            },
                            "start": 3.96,
                            "length": 0.5
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "video",
                                "src": "https://templates.shotstack.io/basic/asset/video/overlay/flat-panel/black/content-left-in.mov"
                            },
                            "start": 5.5,
                            "length": 5
                        }
                    ]
                },
                {
                    "clips": [
                        {
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
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "image",
                                "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lcep-3uxs-b81v-wrxs-3om8zn1ezuku/source.jpg"
                            },
                            "start": 4.83,
                            "length": 6,
                            "transition": {
                                "in": "carouselUp"
                            },
                            "offset": {
                                "x": 0,
                                "y": 0
                            },
                            "position": "center",
                            "fit": "cover"
                        }
                    ]
                }
            ]
    },
    "output": {
        "size": {
            "width": 1024,
                "height": 576
        },
        "format": "mp4"
    }
}

let id = null;

let filePath = "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/musicEffects/bgm/ambient/2.mp3";


const axios = require('axios');
const fs = require('fs');
const { exec } = require('child_process');

async function postData() {
  try {
    const headers = {
      'Accept': 'application/json',
      'x-api-key': 'JzcMgcgeNRa6AapdPjtHU9A61heZWpIp70D37Kbz'
      };
      
      const data = {}

    const response = await axios.post('https://api.shotstack.io/ingest/stage/upload',data, { headers });
      let signedurl = response.data.data.attributes.url;
      id = response.data.data.id;

      console.log(signedurl);
    //   const mp4File = fs.readFileSync("C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/musicEffects/bgm/ambient/2.mp3");

    //   const headers2 = {
    //     'Content-Type': false, 
    //   };
      console.log("ready for upload");
    //    Make the PUT request with Axios
    //   const responsee = await axios.put(signedurl, mp4File, {
    //       headers: headers2
    //   });
    //   console.log(responsee.status);
    //   const response3 = await axios.get(`https://api.shotstack.io/ingest/stage/sources/${id}`, {
    //     headers
    //   });  
    //   let url = response3.data.data.attributes.source;
    //   console.log(url);
      let res = await uploadFileWithCurl(signedurl, filePath);
    const headers2 = {
        'Accept': 'application/json',
        'x-api-key': 'JzcMgcgeNRa6AapdPjtHU9A61heZWpIp70D37Kbz'
        };
    const response2 = await axios.get(`https://api.shotstack.io/ingest/stage/sources/${id}`, {
        headers:headers2
      });  
      let url = response2.data.data.attributes.source;   
      console.log(url);
  } catch (error) {
      console.log(error);
//     const headers = {
//         'Accept': 'application/json',
//         'x-api-key': 'JzcMgcgeNRa6AapdPjtHU9A61heZWpIp70D37Kbz'
//         };
//     const response3 = await axios.get(`https://api.shotstack.io/ingest/stage/sources/${id}`, {
//         headers
//       });  
//       let url = response3.data.data.attributes.source;   
//       console.log(url);
   }
}

postData();





function uploadFileWithCurl(url, filePath) {
    return new Promise((resolve, reject) => {
      const curlCommand = `curl -X PUT "${url}" -T "${filePath}" -H "Content-Type:"`;
  
      exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
  
        resolve(1);
      });
    });
  }