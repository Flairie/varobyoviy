const Discord = require("discord.js");
const client = new Discord.Client();
let hellowed = false;


client.on('ready', () => {
  //console.log(`Logged in as ${423868710940311552}!`);
});

client.on('message', msg => { 
  if(hellowed == false) {
    msg.channel.send("Я обновился!");
    hellowed = true;
  }
});

client.login(process.env.BOT_TOKEN); // wow

