const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ('.')

bot.on('ready', function() {
    bot.user.setGame(".help | 1 serveurs");
    console.log("Conecté");
});

bot.login(process.env.TOKEN);

 /*help*/
bot.on('message', message => {
    if (message.content === prefix + "help"){
        var help = new Discord.RichEmbed()
            .setTitle("__Liste des commandes disponibles:__")
            .addField("help","Affiche ce message.")
            .addField("liens","Donne des liens utiles ^^")
            .setColor("RANDOM")
            .setFooter("Comandes faites par: Skylost#5655")
        message.channel.sendEmbed(help);
    }
/*fin help*/

    if (message.content === 'salut'){
        message.channel.send("Bien le bonjour");
    }

    if (message.content === 'ping'){
        message.channel.sendMessage(":white_check_mark: pong :white_check_mark:");
    }

    if (message.content === prefix + "liens"){
        var liens = new Discord.RichEmbed()
            .setTitle("__Les liens utiles:__")
            .addField("Le Discord:","[Clique ici](https://discord.gg/A5dd5ZX) pour rejoindre le discord !", true)
            .setColor("RANDOM")
            .setFooter("Comandes faites par: Skylost#5655")
        message.channel.sendEmbed(liens);
    }
    
    bot.on('guildMemberAdd', member =>{
        var embed1 = new Discord.RichEmbed()
            .setDescription(':tada: **' + member.user.username + '** a rejoint ' + member.guild.name)
            .setFooter('Nous sommes désormais ' + member.guild.memberCount)
            .setColor('RANDOM')
        member.guild.channels.get('524172484879187968').send(embed1)
        member.addRole('524171607493574656')
     
    });
     
    bot.on('guildMemberRemove', member =>{
        var embed2 = new Discord.RichEmbed()
            .setDescription(':cry: **' + member.user.username + '** a quitté ' + member.guild.name)
            .setFooter('Nous sommes désormais ' + member.guild.memberCount)
            .setColor('RANDOM')
        member.guild.channels.get('524172484879187968').send(embed2)
    }

    )})
