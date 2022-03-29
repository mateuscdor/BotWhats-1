import { IBotData } from "../interfaces/IBotData";
import fs from 'fs'
import path from "path";
import ytdl from "ytdl-core";
import * as yt from 'youtube-search-without-api-key';
import { getRandomName } from "../functions";

export default async ({ sendVideo, args, reply, webMessage }: IBotData) => {

  try {

    let r = (await yt.search(args))[0]

    reply("Aguarde, estamos processando o video " + r.title + ". Esse processo pode domoraar um pouco...")

    const tempFile = path.resolve(
      __dirname,
      "..",
      "..",
      "assets",
      "temp",
      getRandomName("mp4")
    );

    ytdl(`http://www.youtube.com/watch?v=${r.id.videoId}`)
      .pipe(fs.createWriteStream(tempFile))
      .on("finish", async () => {
        await sendVideo(tempFile, r.title, true);
        fs.unlinkSync(tempFile);
      });

  } catch (e) {
    reply("Algo deu errado")
  }
}