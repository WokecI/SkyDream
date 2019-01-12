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
    }

    if (message.content === prefix + "liens"){
        var embed = new Discord.RichEmbed()
            .setTitle("__Les liens utiles:__")
            .addField("Le Discord:","[Clique ici pour rejoindre le discord !](https://discord.gg/A5dd5ZX)", true)
            .setColor("RANDOM")
            .setFooter("Comandes faites par: Skylost#5655")
        message.channel.sendEmbed(embed);
    }
    
})
