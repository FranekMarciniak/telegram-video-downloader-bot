import { Bot } from "./deps.deno.ts";
import linkifyJS from "https://cdn.skypack.dev/linkifyjs?dts";

export const bot = new Bot(Deno.env.get("BOT_TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.on('message::url', (ctx) => {
  const links = linkifyJS.find(ctx.message.text).map((link: {href: string}) => link.href)
  return ctx.reply(`You sent a url: ${ctx.message.text}`);
});
bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));
