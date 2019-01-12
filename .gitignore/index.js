const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ('.')

bot.on('ready', function() {
    bot.user.setGame(".help | 1 serveurs");
    console.log("Conecté");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("**__liste des commandes__**: \n .help");
    }

    if (message.content === 'salut'){
        message.channel.send("Bien le bonjour");
    }

    if (message.content === 'ping'){
        message.channel.sendMessage(":white_check_mark: pong :white_check_mark:");

    if (message.content === prefix + "liens"){
        var lien = new Discord.RichEmbed()
            .setTitle("Les liens utiles:")
            .addField("Le Discord:","[Clique ici](https://discord.gg/A5dd5ZX)")
            .setColor("random")
            .setFooter("Comandes faites par: Skylost#5655")
    }
    }})
