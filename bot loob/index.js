const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("discord-ytdl-core");  

function Quran(){
let stream = ytdl("https://www.youtube.com/watch?v=g7X9X6TlrUo", 
{
            filter: "audioonly",
            opusEncoded: true,
            encoderArgs: ['-af', 'bass=g=10,dynaudnorm=f=200']
        });
      let ch = client.channels.cache.get(process.env.qch)
      ch.join()
        .then(connection => {
            let dispatcher = connection.play(stream, {
                type: "opus"
            })
            .on("loop", () => {
                Quran()
            })
        });
}
client.on("ready", () => {
console.log(`s`)
console.log(`[NAME] ${client.user.tag}`)
console.log(`[ID] ${client.user.id}`)
console.log(`[GUILDS] ${client.guilds.cache.size}`)
console.log(`( bot )`)
Quran()
    
});

client.login(process.env.token)

client.on('messageCreate', message => {
    if(!message.guild || message.author.bot) return;
    const mention = message.mentions.users.first();
    if(!mention) return ;
    if(mention.id === client.user.id) return message.channel.send(`My Prefix is : \`${prefix}\``)
})



