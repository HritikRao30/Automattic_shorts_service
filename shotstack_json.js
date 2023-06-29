{
    "asset": {
        "type": "video",
            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/overlays/shapes-transition.mov"
    },
    "start": 5.5,
        "length": 2.68
}   //this is the great overlay for putting yup the section



//json for intro

{
    "timeline": {
        "soundtrack": {
            "src": "https://feeds.soundcloud.com/stream/276613373-unminus-kring.mp3",
                "effect": "fadeOut"
        },
        "background": "#000000",
            "tracks": [
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type=\"text\">{{context}}</p>",
                                "css": "p { color: #ffffff; font-size: 25px; font-family: Clear Sans; text-align: center; }",
                                "width": 634,
                                "height": 174
                            },
                            "start": 5.5,
                            "length": 5,
                            "fit": "none",
                            "scale": 1,
                            "offset": {
                                "x": 0,
                                "y": 0
                            },
                            "position": "center"
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type=\"text\">{{date}}</p>",
                                "css": "p { color: #e2a703; font-size: 20px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 174,
                                "height": 46
                            },
                            "start": 0.5,
                            "length": 14,
                            "fit": "none",
                            "scale": 1,
                            "offset": {
                                "x": -0.404,
                                "y": 0.388
                            },
                            "position": "center",
                            "transition": {
                                "in": "slideLeft"
                            }
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type=\"text\">{{title}}</p>",
                                "css": "p { color: #ffffff; font-size: 25px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 834,
                                "height": 46
                            },
                            "start": 0.5,
                            "length": 4,
                            "fit": "none",
                            "scale": 1,
                            "offset": {
                                "x": -0.006,
                                "y": -0.092
                            },
                            "position": "center",
                            "transition": {
                                "in": "slideUp",
                                "out": "slideDown"
                            }
                        }
                    ]
                },
                {
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
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "video",
                                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/overlays/shapes-transition.mov"
                            },
                            "start": 11,
                            "length": 2.64
                        },
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type=\"text\">INTRODUCTION</p>",
                                "css": "p { color: #ffffff; font-size: 34px; font-family: Montserrat ExtraBold; text-align: center; }",
                                "width": 498,
                                "height": 171
                            },
                            "start": 12,
                            "length": 1.5,
                            "fit": "none",
                            "scale": 1,
                            "offset": {
                                "x": -0.009,
                                "y": 0.018
                            },
                            "position": "center",
                            "transition": {
                                "in": "fade",
                                "out": "fade"
                            }
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "image",
                                "src": "{{ img }}"
                            },
                            "start": 0,
                            "length": 15,
                            "fit": "cover",
                            "offset": {
                                "x": 0,
                                "y": 0
                            },
                            "position": "center",
                            "scale": 1
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
    },
    "merge": [
        {
            "find": "title",
            "replace": "TITLE BLAH BLAH"
        },
        {
            "find": "img",
            "replace": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lppl-4tl7-sw2i-1ccz-0mwckw4yhav2/source.jpg"
        },
        {
            "find": "context",
            "replace": "CONTEXT BLAH BLAH"
        },
        {
            "find": "date",
            "replace": "27/06/2023"
        },
        {
            "find": "audio",
            "replace": "https://feeds.soundcloud.com/stream/276613373-unminus-kring.mp3"
        },
        {
            "find": "bgm",
            "replace": "https://feeds.soundcloud.com/stream/276613373-unminus-kring.mp3"
        }
    ]
}


//json part1

{
    "timeline": {
        "soundtrack": {
            "src": "{{ bgm }}",
                "effect": "fadeOut"
        },
        "background": "#000000",
            "tracks": [
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type=\"text\">{{context}}</p>",
                                "css": "p { color: #fffefa; font-size: 18px; font-family: Montserrat SemiBold; text-align: left; }",
                                "width": 339,
                                "height": 328,
                                "position": "bottom"
                            },
                            "start": 1.3,
                            "length": 3.9,
                            "position": "center",
                            "offset": {
                                "x": -0.315,
                                "y": 0.029
                            },
                            "transition": {
                                "in": "slideRight",
                                "out": "slideLeft"
                            },
                            "fit": "none",
                            "scale": 1
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "image",
                                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/templates/real-estate-slideshow/content-left.png"
                            },
                            "start": 0,
                            "offset": {
                                "x": -0.252,
                                "y": 0
                            },
                            "position": "center",
                            "transition": {
                                "in": "carouselRight",
                                "out": "carouselLeft"
                            },
                            "length": 5.6,
                            "scale": 1,
                            "fit": "contain"
                        },
                        {
                            "asset": {
                                "type": "image",
                                "src": "https://templates.shotstack.io/basic/asset/image/overlay/slanted-panel-cyan-highlite.png"
                            },
                            "scale": 0.24,
                            "position": "center",
                            "transition": {
                                "in": "slideRight",
                                "out": "slideLeft"
                            },
                            "offset": {
                                "x": -0.063,
                                "y": -0.303
                            },
                            "start": 6,
                            "length": 5
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "html",
                                "html": "<p data-html-type=\"text\">{{narration}}</p>",
                                "css": "p { color: #0ae5f5; font-size: 23px; font-family: Montserrat SemiBold; text-align: left; }",
                                "width": 912,
                                "height": 120
                            },
                            "start": 6.4,
                            "length": 4.5,
                            "position": "center",
                            "offset": {
                                "x": -0.027,
                                "y": -0.32
                            },
                            "transition": {
                                "in": "slideRight",
                                "out": "slideLeft"
                            },
                            "fit": "none",
                            "scale": 1,
                            "opacity": 1
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "image",
                                "src": "{{ img }}"
                            },
                            "start": 0,
                            "length": 6,
                            "effect": "zoomInSlow",
                            "transition": {
                                "in": "fade",
                                "out": "fade"
                            },
                            "offset": {
                                "x": 0,
                                "y": 0
                            },
                            "position": "center",
                            "fit": "crop",
                            "scale": 1
                        }
                    ]
                },
                {
                    "clips": [
                        {
                            "asset": {
                                "type": "video",
                                "src": "{{ vid }}",
                                "trim": 5
                            },
                            "start": 5,
                            "length": 7,
                            "transition": {
                                "in": "carouselUp",
                                "out": "fade"
                            },
                            "scale": 1
                        }
                    ]
                }
            ]
    },
    "output": {
        "format": "mp4",
            "size": {
            "width": 1024,
                "height": 576
        }
    },
    "merge": [
        {
            "find": "context",
            "replace": "context to the intro"
        },
        {
            "find": "narration",
            "replace": "blah blah about egypt etc"
        },
        {
            "find": "img",
            "replace": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/templates/real-estate-slideshow/realestate1.jpeg"
        },
        {
            "find": "vid",
            "replace": "https://shotstack-assets.s3.ap-southeast-2.amazonaws.com/footage/sun-clouds.mp4"
        },
        {
            "find": "bgm",
            "replace": "audio"
        },
        {
            "find": "audio",
            "replace": "audio"
        }
    ]
}

//json for part 2 key points

{
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

//json for expert opinions


{
    "timeline": {
        "fonts": [
            {
                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/OpenSans-Regular.ttf"
            },
            {
                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/OpenSans-Bold.ttf"
            },
            {
                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/OpenSans-ExtraBold.ttf"
            }
        ],
            "background": "#000000",
                "tracks": [
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "html",
                                    "html": "<p data-html-type=\"text\">{{quote}}</p>",
                                    "css": "p { color: #ffffff; font-size: 25px; font-family: Open Sans; text-align: center; }",
                                    "width": 319,
                                    "height": 267
                                },
                                "start": 0,
                                "length": 5,
                                "fit": "none",
                                "scale": 1,
                                "offset": {
                                    "x": -0.242,
                                    "y": -0.095
                                },
                                "transition": {
                                    "in": "slideDown"
                                },
                                "position": "center"
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "image",
                                    "src": "https://shotstack-ingest-api-v1-sources.s3.ap-southeast-2.amazonaws.com/ubfynx2m4k/zzy9lxke-4iqw-nd0m-anvf-3tr4oj2pajs8/source.jpg"
                                },
                                "start": 0.3,
                                "length": 5,
                                "fit": "contain",
                                "scale": 0.687,
                                "offset": {
                                    "x": -0.232,
                                    "y": -0.088
                                },
                                "transition": {
                                    "in": "fade"
                                },
                                "position": "center"
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "html",
                                    "html": "<p data-html-type=\"text\">EXPERTS CORNER</p>",
                                    "css": "p { color: #ffffff; font-size: 38px; font-family: \"Open Sans ExtraBold\"; text-align: left; }",
                                    "width": 450,
                                    "height": 100,
                                    "position": "center"
                                },
                                "start": 0.1,
                                "length": 5,
                                "position": "center",
                                "offset": {
                                    "x": 0.021,
                                    "y": 0.378
                                },
                                "transition": {
                                    "in": "slideLeft"
                                },
                                "fit": "none",
                                "scale": 1
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "html",
                                    "html": "<p>&nbsp;</p>",
                                    "width": 486,
                                    "height": 77,
                                    "background": "#d2bb8f"
                                },
                                "start": 0,
                                "length": 5,
                                "position": "center",
                                "offset": {
                                    "x": -0.019,
                                    "y": 0.381
                                },
                                "transition": {
                                    "in": "carouselRight"
                                },
                                "fit": "none",
                                "scale": 1
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "html",
                                    "html": "<p>Mr John Smith</p>",
                                    "css": "p { font-family: \"Open Sans\"; color: #d2bb8f; font-size: 28px; text-align: left; font-weight: bold;    }",
                                    "width": 217,
                                    "height": 50,
                                    "position": "center"
                                },
                                "start": 0.2,
                                "length": 5,
                                "position": "center",
                                "offset": {
                                    "x": 0.21,
                                    "y": -0.258
                                },
                                "transition": {
                                    "in": "slideLeft"
                                },
                                "fit": "none",
                                "scale": 1
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "html",
                                    "html": "<p data-html-type=\"text\">CTO BFL</p>",
                                    "css": "p { color: #ffffff; font-size: 25px; font-family: Open Sans; text-align: center; }",
                                    "width": 134,
                                    "height": 40
                                },
                                "start": 0.25,
                                "length": 5,
                                "fit": "none",
                                "scale": 1,
                                "offset": {
                                    "x": 0.162,
                                    "y": -0.343
                                },
                                "transition": {
                                    "in": "slideLeft"
                                },
                                "position": "center"
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "luma",
                                    "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/luma-mattes/circle.jpg"
                                },
                                "start": 0,
                                "length": 5,
                                "fit": "none",
                                "scale": 0.358,
                                "position": "center",
                                "offset": {
                                    "x": 0.157,
                                    "y": 0.092
                                },
                                "transition": {
                                    "in": "fade"
                                }
                            },
                            {
                                "asset": {
                                    "type": "image",
                                    "src": "{{ image }}"
                                },
                                "start": 0,
                                "length": 5,
                                "fit": "none",
                                "scale": 0.358,
                                "position": "center",
                                "offset": {
                                    "x": 0.212,
                                    "y": 0.003
                                },
                                "transition": {
                                    "in": "fade"
                                }
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "video",
                                    "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/audio-waveforms/circle-speach.mov",
                                    "trim": 5
                                },
                                "start": 0,
                                "length": 5,
                                "fit": "none",
                                "scale": 0.37,
                                "position": "center",
                                "offset": {
                                    "x": 0.211,
                                    "y": 0.003
                                },
                                "transition": {
                                    "in": "fade"
                                }
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "image",
                                    "src": "{{ background }}"
                                },
                                "start": 0,
                                "length": 5,
                                "effect": "slideUp",
                                "offset": {
                                    "x": 0,
                                    "y": 0
                                },
                                "position": "center",
                                "scale": 1
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "audio",
                                    "src": "{{ bgm }}"
                                },
                                "start": 0,
                                "length": 5
                            }
                        ]
                    },
                    {
                        "clips": [
                            {
                                "asset": {
                                    "type": "audio",
                                    "src": "{{ audio }}"
                                },
                                "volume": 0.4,
                                "start": 0,
                                "length": 5
                            }
                        ]
                    }
                ]
    },
    "output": {
        "format": "mp4",
            "size": {
            "width": 1024,
                "height": 576
        }
    },
    "merge": [
        {
            "find": "name",
            "replace": "Mr JohnSmith"
        },
        {
            "find": "designation",
            "replace": "CTO BFL"
        },
        {
            "find": "quote",
            "replace": "dfghjkl fghjkl fghjkl yghjjjkxknxhhjk  hhjjjjjj hjjjjj uhjhjhjh jhjhj jjj"
        },
        {
            "find": "background",
            "replace": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/images/financial-background.jpg"
        },
        {
            "find": "image",
            "replace": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/images/business-man.jpg"
        },
        {
            "find": "bgm",
            "replace": "na"
        },
        {
            "find": "audio",
            "replace": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/audio/financial-podcast.mp3"
        }
    ]
}


//podcast


{
    "timeline": {
        "tracks": [
            {
                "clips": [
                    {
                        "asset": {
                            "type": "html",
                            "html": "<p>The Finance Show</p>",
                            "css": "p { font-family: \"Open Sans\"; color: #ffffff; font-size: 34px; text-align: left;     }",
                            "width": 450,
                            "height": 100,
                            "position": "center"
                        },
                        "start": 0.2,
                        "length": 9.8,
                        "position": "topLeft",
                        "offset": {
                            "x": 0.05,
                            "y": -0.118
                        },
                        "transition": {
                            "in": "slideRight"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "html",
                            "html": "<p>&nbsp;</p>",
                            "width": 420,
                            "height": 64,
                            "background": "#d2bb8f"
                        },
                        "start": 0,
                        "length": 10,
                        "position": "topLeft",
                        "offset": {
                            "x": 0,
                            "y": -0.15
                        },
                        "transition": {
                            "in": "carouselRight"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "html",
                            "html": "<p>Podcast Heading</p>",
                            "css": "p { font-family: \"Open Sans ExtraBold\"; color: #ffffff; font-size: 38px; text-align: left;     }",
                            "width": 450,
                            "height": 100,
                            "position": "center"
                        },
                        "start": 0.1,
                        "length": 9.9,
                        "position": "left",
                        "offset": {
                            "x": 0.05,
                            "y": 0.1
                        },
                        "transition": {
                            "in": "slideLeft"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "html",
                            "html": "<p>Mr John Smith</p>",
                            "css": "p { font-family: \"Open Sans\"; color: #d2bb8f; font-size: 28px; text-align: left; font-weight: bold;    }",
                            "width": 400,
                            "height": 50,
                            "position": "center"
                        },
                        "start": 0.2,
                        "length": 9.8,
                        "position": "left",
                        "offset": {
                            "x": 0.05,
                            "y": 0
                        },
                        "transition": {
                            "in": "slideLeft"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "html",
                            "html": "<p>Head of Global Derivatives, Eagle Corporate</p>",
                            "css": "p { font-family: \"Open Sans\"; color: #ffffff; font-size: 22px; text-align: left;    line-height: 65%; }",
                            "width": 500,
                            "height": 40,
                            "position": "center"
                        },
                        "start": 0.3,
                        "length": 9.7,
                        "position": "left",
                        "offset": {
                            "x": 0.05,
                            "y": -0.05
                        },
                        "transition": {
                            "in": "slideLeft"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "luma",
                            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/luma-mattes/circle.jpg"
                        },
                        "start": 0,
                        "length": 10,
                        "fit": "none",
                        "scale": 0.3,
                        "position": "right",
                        "offset": {
                            "x": -0.1,
                            "y": 0
                        },
                        "transition": {
                            "in": "fade"
                        }
                    },
                    {
                        "asset": {
                            "type": "image",
                            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/images/business-man.jpg"
                        },
                        "start": 0,
                        "length": 10,
                        "fit": "none",
                        "scale": 0.4,
                        "position": "right",
                        "offset": {
                            "x": -0.1,
                            "y": 0
                        },
                        "transition": {
                            "in": "fade"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "video",
                            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/audio-waveforms/circle-speach.mov",
                            "trim": 5
                        },
                        "start": 0,
                        "length": 10,
                        "fit": "none",
                        "scale": 0.41,
                        "position": "right",
                        "offset": {
                            "x": -0.009,
                            "y": 0
                        },
                        "transition": {
                            "in": "fade"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "image",
                            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/logos/corporate-colour.png"
                        },
                        "start": 0,
                        "length": 10,
                        "fit": "none",
                        "scale": 0.25,
                        "position": "bottomLeft",
                        "offset": {
                            "x": 0.05,
                            "y": 0.15
                        },
                        "transition": {
                            "in": "fade"
                        }
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "image",
                            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/images/financial-background.jpg"
                        },
                        "start": 0,
                        "length": 10,
                        "effect": "slideUp"
                    }
                ]
            },
            {
                "clips": [
                    {
                        "asset": {
                            "type": "audio",
                            "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/audio/financial-podcast.mp3"
                        },
                        "start": 0,
                        "length": 10
                    }
                ]
            }
        ],
        "fonts": [
            {
                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/OpenSans-Regular.ttf"
            },
            {
                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/OpenSans-Bold.ttf"
            },
            {
                "src": "https://shotstack-assets.s3-ap-southeast-2.amazonaws.com/fonts/OpenSans-ExtraBold.ttf"
            }
        ]
    },
    "output": {
        "format": "mp4",
        "resolution": "sd"
    }
}