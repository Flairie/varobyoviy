const Discord = require("discord.js");
const client = new Discord.Client(); 


client.on('ready', () => {
  //console.log(`Logged in as ${423868710940311552}!`);
});

client.on('message', msg => {
    if (msg.content == "Вахтанг лох") {
       msg.delete(1);
    }
});

client.login(process.env.BOT_TOKEN); // wow

