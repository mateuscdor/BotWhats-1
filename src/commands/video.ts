import { IBotData } from "../interfaces/IBotData";
import fs from 'fs'
import ytdl from "ytdl-core";
import * as yt from 'youtube-search-without-api-key';

export default async ({ sendVideo,sendText, args, reply, webMessage }: IBotData) => {

  try {

    let r = (await yt.search(args))[0]

    let titlevideo = `video=${webMessage.key.remoteJid}.mp4`

    reply("Aguarde, estamos processando o video " + r.title + ". Esse processo pode domoraar um pouco...")

    ytdl(`http://www.youtube.com/watch?v=${r.id.videoId}`)
      .pipe(fs.createWriteStream(`./assets/temp/${titlevideo}`));

      setTimeout(()=>{
        sendVideo(`./assets/temp/${titlevideo}`, r.snippet.title, true)
    },17000);

      setTimeout(()=>{
     fs.unlink(`./assets/temp/${titlevideo}`, (err) => {
      if (err) throw err;
      console.log('file was deleted');
    });
    },20000);

  } catch (e) {
    reply("Algo deu errado")
  }
}