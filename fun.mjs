import * as filestack from "filestack-js";

const apiKey = "ABEy3bO94RUy5TplZTJ0Fz";

const file = "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/musicEffects/bgm/ambient/2.mp3";


const a = async () => {
    const filestackFile = await filestack.create(file, { apiKey });
    const filestackUrl = filestackFile.url();
    console.log(filestackUrl);

};

a();
