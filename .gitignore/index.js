const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ('.')

bot.on('ready', function() {
    bot.user.setGame(".help | 1 serveurs");
    console.log("Conecté");
});

bot.login('NTMzNjM2ODczMTk3NzE1NDU2.Dxt81g.Lcmuz5Ithnswc5imYK3pjpdi1U8');

bot.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("**__liste des commandes__**: \n .help");
    }

    if (message.content === 'salut'){
        message.channel.send("Bien le bonjour");
    }

    if (message.content === 'ping'){
        message.channel.sendMessage(":white_check_mark: pong :white_check_mark:");
    }})
