import { IBotData } from "../interfaces/IBotData";
import fs from 'fs'
import request from 'request'
import path from 'path'
import { getCommand, getRandomName } from "../functions";

export default async ({reply, sendVideo, args}:IBotData) => {

    const videoLink = args;
    try {

          const tempFile = path.resolve(
            __dirname,
            "..",
            "..",
            "assets",
            "temp",
            getRandomName("mp4")
          );
      

            request(args)
            .pipe(fs.createWriteStream(tempFile))
            .on("finish", async () => {
              await sendVideo(tempFile, "r.title", true);
            });
      
    } catch (error) {
        reply("Não foi possovel baixar o conteudo")
    }
}