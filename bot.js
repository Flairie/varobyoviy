const Discord = require("discord.js");
const client = new Discord.Client(); 

function clean_empty(array) {
  for (i = 0; i < array.length; i++) {
    if(array[i] == "") {
      array.splice(i,1);
      i--;
    }
  }
}

client.on('ready', () => {
  //console.log(`Logged in as ${423868710940311552}!`);
});

client.on('message', msg => {
  if (msg.content.search("Вахтанг") != -1 && (msg.content.search("лох") != -1 || msg.content.search("дубина") != -1)) {
     msg.delete(4);
  }
  
  if (msg.content.search("вахтанг") != -1 && !msg.author.bot)
    msg.reply("не существует никакого вахтанга, существует только Вахтанг");
});

client.login(process.env.BOT_TOKEN); // wow

