import { Bot } from "./deps.deno.ts";
import * as linkifyJS from "https://cdn.skypack.dev/linkifyjs?dts";
import axiod from "https://deno.land/x/axiod/mod.ts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on('message::url', async (ctx) => {
  const links = linkifyJS.find(ctx.message.text).map((link: {href: string}) => link.href)

  if(!links[0].includes("instagram.com/reel")) return
  const data = await getVideoURL(links[0])
  const url = data?.data?.url
  if(!url) return 

  return await ctx.replyWithVideo(url);
});
bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

const getVideoURL = (url: string) => {
  return axiod.post(Deno.env.get("DOWNLOAD_URL"), {url: url})
}