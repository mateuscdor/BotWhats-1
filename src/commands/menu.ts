import { IBotData } from "../interfaces/IBotData";
import { general } from "../configurations/general";

export default async ({reply}: IBotData) => {
    reply(`
    *Prefixo*: ${general.prefix}

    eu que fix tiw

    *${general.prefix}audio* (nome)

    *${general.prefix}video* (nome)
    `)
}