import json2video from "json2video";

let jsonTemplate = {
  "script": ["This is the first line of text.", "This is the second line of text."],
  "images": ["image1.jpg", "image2.jpg"],
  "transitions": ["fade", "slide"],
  "text_overlays": [
    {
      "text": "This is the first text overlay.",
      "position": "top-left",
      "duration": 5000
    },
    {
      "text": "This is the second text overlay.",
      "position": "bottom-right",
      "duration": 3000
    }
  ],
  "date_time_display": {
    "position": "top-left",
    "format": "YYYY-MM-DD HH:mm:ss"
  },
  "text_to_speech": {
    "text": "This is the text that will be spoken.",
    "voice": "male",
    "rate": 1.0,
    "pitch": 1.0
  },
  "zoom_or_slide": {
    "images": ["image1.jpg"],
    "zoom": 0.5,
    "duration": 2000
  }
}

const video = json2video.create_video(jsonTemplate);
video.save("output.mp4");




///////////////////////////////////////////////


{
  "merge": [
      {
          "find": "LOWER_THIRD_PANEL",
          "replace": "https://templates.shotstack.io/basic/asset/image/overlay/slanted-panel-cyan-highlite.png"
      },
      {
          "find": "HIGHLITE_COLOR",
          "replace": "#00f4e9"
      }
  ],
  "timeline": {
      "soundtrack": {
          "src": "https://assets.mixkit.co/music/download/mixkit-driving-ambition-32.mp3",
          "effect": "fadeOut"
      },
      "fonts": [
          {
              "src": "https://templates.shotstack.io/basic/asset/font/roboto-bold.ttf"
          }
      ],
      "tracks": [
          {
              "clips": [
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>It's estimated global temperatures will rise <u>1.5 degrees Celcius</u> in the next 2 decades.</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: #ffffff; font-size: 46px; text-align: left;} u { color: {{HIGHLITE_COLOR}}; text-decoration: none; }",
                          "width": 960,
                          "height": 120
                      },
                      "start": 0.5,
                      "length": 4.5,
                      "position": "bottomLeft",
                      "offset": {
                          "x": 0.03,
                          "y": 0.135
                      },
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      }
                  },
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>The last <u>10 years</u> have been the warmest on record.</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: #ffffff; font-size: 46px; text-align: left; } u { color: {{HIGHLITE_COLOR}}; text-decoration: none; }",
                          "width": 960,
                          "height": 120
                      },
                      "start": 5.5,
                      "length": 4.5,
                      "position": "bottomLeft",
                      "offset": {
                          "x": 0.03,
                          "y": 0.135
                      },
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      }
                  },
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>More than <u>1 million</u> species are at risk of extinction by climate change.</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: #ffffff; font-size: 46px; text-align: left; } u { color: {{HIGHLITE_COLOR}}; text-decoration: none; }",
                          "width": 960,
                          "height": 120
                      },
                      "start": 10.5,
                      "length": 4.5,
                      "position": "bottomLeft",
                      "offset": {
                          "x": 0.03,
                          "y": 0.135
                      },
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      }
                  },
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>Climate change is <u>detrimental to human life</u> and it's already happening.</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: #ffffff; font-size: 46px; text-align: left; } u { color: {{HIGHLITE_COLOR}}; text-decoration: none; }",
                          "width": 960,
                          "height": 120
                      },
                      "start": 15.5,
                      "length": 4.5,
                      "position": "bottomLeft",
                      "offset": {
                          "x": 0.03,
                          "y": 0.135
                      },
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      }
                  },
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>Many world leaders still aren't taking it <u>seriously</u>.</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: #ffffff; font-size: 44px; text-align: left; } u { color: {{HIGHLITE_COLOR}}; text-decoration: none; }",
                          "width": 960,
                          "height": 120
                      },
                      "start": 20.5,
                      "length": 4.5,
                      "position": "bottomLeft",
                      "offset": {
                          "x": 0.03,
                          "y": 0.135
                      },
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      }
                  },
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>LIKE</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: {{HIGHLITE_COLOR}}; font-size: 44px; text-align: center;}",
                          "width": 800,
                          "height": 200
                      },
                      "start": 25.5,
                      "length": 0.8,
                      "transition": {
                          "in": "slideDown",
                          "out": "slideDown"
                      }
                  },
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>COMMENT</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: {{HIGHLITE_COLOR}}; font-size: 44px; text-align: center; }",
                          "width": 800,
                          "height": 200
                      },
                      "start": 26.3,
                      "length": 0.8,
                      "transition": {
                          "in": "slideDown",
                          "out": "slideDown"
                      }
                  },
                  {
                      "asset": {
                          "type": "html",
                          "html": "<p>SHARE</p>",
                          "css": "p { font-family: 'Roboto'; font-weight: bold; color: {{HIGHLITE_COLOR}}; font-size: 44px; text-align: center; margin: 50px;}",
                          "width": 800,
                          "height": 200
                      },
                      "start": 27.1,
                      "length": 0.8,
                      "transition": {
                          "in": "slideDown",
                          "out": "slideDown"
                      }
                  }
              ]
          },
          {
              "clips": [
                  {
                      "asset": {
                          "type": "image",
                          "src": "{{LOWER_THIRD_PANEL}}"
                      },
                      "scale": 0.24,
                      "position": "bottomLeft",
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      },
                      "offset": {
                          "y": 0.1
                      },
                      "start": 0,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "image",
                          "src": "{{LOWER_THIRD_PANEL}}"
                      },
                      "scale": 0.25,
                      "position": "bottomLeft",
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      },
                      "offset": {
                          "y": 0.1
                      },
                      "start": 5,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "image",
                          "src": "{{LOWER_THIRD_PANEL}}"
                      },
                      "scale": 0.25,
                      "position": "bottomLeft",
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      },
                      "offset": {
                          "y": 0.1
                      },
                      "start": 10,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "image",
                          "src": "{{LOWER_THIRD_PANEL}}"
                      },
                      "scale": 0.25,
                      "position": "bottomLeft",
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      },
                      "offset": {
                          "y": 0.1
                      },
                      "start": 15,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "image",
                          "src": "{{LOWER_THIRD_PANEL}}"
                      },
                      "scale": 0.25,
                      "position": "bottomLeft",
                      "transition": {
                          "in": "slideRight",
                          "out": "slideLeft"
                      },
                      "offset": {
                          "y": 0.1
                      },
                      "start": 20,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "image",
                          "src": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/logos/news-white.png"
                      },
                      "fit": "none",
                      "scale": 0.65,
                      "transition": {
                          "in": "slideUp"
                      },
                      "start": 28,
                      "length": 3
                  }
              ]
          },
          {
              "clips": [
                  {
                      "asset": {
                          "type": "video",
                          "src": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/footage/sun-clouds.mp4"
                      },
                      "start": 0,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "video",
                          "src": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/footage/desert-overhead.mp4",
                          "trim": 5
                      },
                      "start": 5,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "video",
                          "src": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/footage/lemur-eating.mp4",
                          "trim": 5
                      },
                      "start": 10,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "video",
                          "src": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/footage/shanty-town-overhead.mp4",
                          "trim": 5
                      },
                      "start": 15,
                      "length": 5
                  },
                  {
                      "asset": {
                          "type": "video",
                          "src": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/footage/podium-speach.mp4"
                      },
                      "start": 20,
                      "length": 6,
                      "transition": {
                          "out": "fade"
                      }
                  }
              ]
          }
      ]
  },
  "output": {
      "format": "mp4",
      "resolution": "hd"
  }
}

















