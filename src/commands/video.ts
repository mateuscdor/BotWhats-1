import { IBotData } from "../interfaces/IBotData";
import axios from "axios";
import { API_KEY } from "../configurations/API_CONFIGURATIONS";
import fs from 'fs'
import ytdl from "ytdl-core";
import * as yt from 'youtube-search-without-api-key';

export default async ({ sendVideo,sendText, args, reply, webMessage }: IBotData) => {

  try {
    // const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&utype=video&part=snippet&maxResults=1&q=${args}`)
    // let r = response.data.items[0]

    let r = (await yt.search(args))[0]

    let titlevideo = `video=${webMessage.key.remoteJid}.mp4`

    reply("Aguarde, estamos processando o video " + r.title)

    ytdl(`http://www.youtube.com/watch?v=${r.id.videoId}`)
      .pipe(fs.createWriteStream(`./src/movies/${titlevideo}`));

      setTimeout(()=>{
        sendVideo(`./src/movies/${titlevideo}`, r.snippet.title, true)
    },7000);

      setTimeout(()=>{
     fs.unlink(`./src/movies/${titlevideo}`, (err) => {
      if (err) throw err;
      console.log('file was deleted');
    });
        
    },10000);

  } catch (e) {
    reply("Algo deu errado")
  }
}