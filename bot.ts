import { Bot } from "./deps.deno.ts";
import * as linkifyJS from "https://cdn.skypack.dev/linkifyjs?dts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on('message::url', async (ctx) => {
  const links = linkifyJS.find(ctx.message.text).map((link: {href: string}) => link.href)
 
  const url = await getVideoURL(links[0])

  return ctx.reply(`You sent a url: ${JSON.stringify(url)}`);
});
bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

const getVideoURL = (url: string) => {
  return fetch(Deno.env.get("DOWNLOAD_URL"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({url: url})
    })
    .then((res) => {
      console.log(res);     
      res.json()
    })
}