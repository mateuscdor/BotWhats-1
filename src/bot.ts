import { general } from "./configurations/general";
import { connect } from "./connection"
import { getBotData, getCommand, isCommand } from "./functions";

export default async () => {
    const socket = await connect()

    socket.ev.on('messages.upsert',async (message) => {
       const [webMessage ] = message.messages;

       const { command, ...data} = getBotData(socket, webMessage)

       if(!isCommand(command))
        return

        try {
            const actiion = await getCommand(command.replace(general.prefix, ""))
            await actiion({command, ...data})
        } catch (error) {
            console.log(error)
            await data.reply(`${error.message}`)
        }
    })
}