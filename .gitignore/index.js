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
        var help = new Discord.RichEmbed()
            .setTitle("__Liste des commandes disponibles:__")
            .addField("help","Affiche ce message.")
            .addField("liens","Donne des liens utiles ^^")
            .addField("helpmod","Affiche les commandes de modérations.")
            .setColor("RANDOM")
            .setFooter("Comandes faites par: Skylost#5655")
        message.channel.sendEmbed(help);
    }

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

  if (message.content === prefix + "helpmod"){
        console.log('helpmod ok')
        var helpm = new Discord.RichEmbed()
            .setTitle("__Liste des commandes de modérations:__")
            .addField("helpmod","Affiche ce message.")
            .addField("clear [nombre entre 1 et 100]","fait le ménage.")
            .setColor("RANDOM")
            .setFooter("Comandes faites par: Skylost#5655")
        message.channel.sendEmbed(helpm);
    }

    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
     
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
            let count = args[1]
            if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
            if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
            if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
            message.channel.bulkDelete(parseInt(count) + 1)
        }
    }
,)
