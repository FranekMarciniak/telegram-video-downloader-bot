import { Bot } from "./deps.deno.ts";
import * as linkifyJS from "https://cdn.skypack.dev/linkifyjs?dts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on('message::url', (ctx) => {
  const links = linkifyJS.find(ctx.message.text).map((link: {href: string}) => link.href)
  const promises = links.map((link: string) => getVideoURL(link));
  Promise.all(promises).then((data) => {
    console.log(data);
  })

  return ctx.reply(`You sent a url: ${links.join(", ")}`);
});
bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

const getVideoURL = (url: string) => {
  fetch(Deno.env.get("DOWNLOAD_URL"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({url})
    })
    .then((res) => res.json())
    .then((data) => {
      return data;
    }
  );
}