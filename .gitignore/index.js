const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ('.')

bot.on('ready', function() {
    bot.user.setGame(".help |");
    console.log("Conecté");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if (message.content === prefix + "help"){
        console.log('help ok')
        var help = new Discord.RichEmbed()
            .setTitle("Liste des commandes disponibles:")
            .addField("help","Affiche ce message.")
            .addField("liens","Donne des liens utiles ^^.")
            .addField("discordinfos","Donne les informations du serveur.")
            .addField("joueurinfos","Donne tes informations d'utilisateur.")
            .addField("helpmod","Affiche les commandes de modérations.")
            .setColor("RANDOM")
            .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(help);
    }

    if (message.content === prefix + "helpmod"){
        console.log('helpmod ok')
        var helpm = new Discord.RichEmbed()
            .setTitle("Liste des commandes de modérations:")
            .addField("helpmod","Affiche ce message.")
            .addField("clear [nombre entre 1 et 100]","fait le ménage.")
            .setColor("RANDOM")
            .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(helpm);
    }

    if (message.content === 'ping'){
        console.log('ping ok')
        var pinge = new Discord.RichEmbed()
        .setTitle("🏓Pong🏓")
        .setColor("RANDOM")
        message.channel.sendEmbed(pinge);
    }

    if (message.content === prefix + "liens"){
        console.log('liens ok')
        var liens = new Discord.RichEmbed()
            .setTitle("Les liens utiles:")
            .addField("Le Discord officiel:","[Clique ici](https://discord.gg/FQE9x8R) pour rejoindre le discord officiel de SkyDream !", true)
            .addField("La cousine Plisk:","[Clique ici](https://discord.gg/SthKtBJ) pour rejoindre le serveur de notre cousine Plisk !", true)
            .setColor("RANDOM")
            .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(liens);
    }

    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
     
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
            let count = args[1]
            if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
            if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
            if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
         message.channel.bulkDelete(parseInt(count) + 1);
    }
    if (message.content === prefix + "discordinfos"){
        var servIcon = message.guild.iconURL
        var discordi = new Discord.RichEmbed()
            .setTitle("Informations du discord:")
            .setThumbnail(servIcon)
            .addField("Nom du discord:", message.guild.name)
            .addField("Propriétaire du serveur:", message.guild.owner)
            .addField("Crée le:",message.guild.createdAt)
            .addField('Tu a rejoint le:', message.member.joinedAt)
            .addField("Utilisateurs sur le discord:",message.guild.memberCount)
            .setColor("RANDOM")
            .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(discordi);
    }
    if (message.content === prefix + "joueurinfos"){
        console.log('jinfos ok')
        var iconJ = message.author.avatarURL
        var infos = new Discord.RichEmbed()
            .setTitle("Informations du joeurs:")
            .setThumbnail(iconJ)
            .addField("Nom du joueur:",message.author.username)
            .addField("ID:",message.author.id)
            .addField("Compte crée le:",message.author.createdAt)
            .setColor("RANDOM")
            .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(infos)
    }
    if (message.content === prefix + 'botinfos'){
        var botIvon = bot.user.displayAvatarURL
        var botinfo = new Discord.RichEmbed()
            .setTitle("Informations sur le bot:")
            .setThumbnail(botIvon)
            .setColor('RANDOM')
            .addField("Nom du bot:", bot.user.username)
            .addField("Crée le:", bot.user.createdAt)
            .addField("Créateur:","Skylost#5655")
        message.channel.sendEmbed(botinfo)
     }})
