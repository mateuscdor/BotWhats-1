"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const yt = __importStar(require("youtube-search-without-api-key"));
exports.default = ({ sendVideo, sendText, args, reply, webMessage }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&utype=video&part=snippet&maxResults=1&q=${args}`)
        // let r = response.data.items[0]
        let r = (yield yt.search(args))[0];
        let titlevideo = `video=${webMessage.key.remoteJid}.mp4`;
        reply("Aguarde, estamos processando o video " + r.title + ". Esse processo pode domoraar um pouco...");
        (0, ytdl_core_1.default)(`http://www.youtube.com/watch?v=${r.id.videoId}`)
            .pipe(fs_1.default.createWriteStream(`./src/movies/${titlevideo}`));
        setTimeout(() => {
            sendVideo(`./src/movies/${titlevideo}`, r.snippet.title, true);
        }, 17000);
        setTimeout(() => {
            fs_1.default.unlink(`./src/movies/${titlevideo}`, (err) => {
                if (err)
                    throw err;
                console.log('file was deleted');
            });
        }, 18000);
    }
    catch (e) {
        reply("Algo deu errado");
    }
});
