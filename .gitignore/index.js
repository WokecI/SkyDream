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
            .addField("liens","Donne des liens utiles ^^.")
            .addField("discordinfos","Donne les informations du serveur.")
            .addField("sondage","permet de crée un sondage.")
            .addField("helpmod","Affiche les commandes de modérations.")
            .setColor("RANDOM")
            .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(help);
    }

    if (message.content === prefix + "helpmod"){
        console.log('helpmod ok')
        var helpm = new Discord.RichEmbed()
            .setTitle("__Liste des commandes de modérations:__")
            .addField("helpmod","Affiche ce message.")
            .addField("clear [nombre entre 1 et 100]","fait le ménage.")
            .setColor("RANDOM")
            .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(helpm);
    }

    if (message.content === 'ping'){
        message.channel.sendMessage(":white_check_mark: pong :white_check_mark:");
    }

    if (message.content === prefix + "liens"){
        var liens = new Discord.RichEmbed()
            .setTitle("__Les liens utiles:__")
            .addField("Le Discord officiel:","[Clique ici](https://discord.gg/A5dd5ZX) pour rejoindre le discord officiel de SkyDream !", true)
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
         message.channel.bulkDelete(parseInt(count) + 1)
     }
 })

 bot.on('message', message => {
    if (message.content === prefix + "discordinfos"){
        var infos = new Discord.RichEmbed()
        .setTitle("__Informations du discord__:")
        .addField("Nom du discord:", message.guild.name)
        .addField("Propriétaire du serveur:", message.guild.owner)
        .addField("Crée le:",message.guild.createdAt)
        .addField("Tu as rejoin le:",message.guild.joinedAt)
        .addField("Utilisateurs sur le discord:",message.guild.memberCount)
        .addField("L'avatar du serveur:", message.guild.iconURL)
        .setColor("RANDOM")
        .setFooter("Commandes faites par: Skylost#5655")
        message.channel.sendEmbed(infos);
    }});

bot.on('message', message => {
    if (message.content.startsWith(prefix + "sondage")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = arg.join(" ")
        var sondage = new Discord.RichEmbed()
            .setDescription("Sondage")
            .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
            .setColor("RANDOM")
            .setTimestamp()
        message.channel.sendEmbed(sondage)
        .then(function (message) { 
            message.react("❌")
            message.react("✅")
        }).catch(function() {
        });
    }else{
        return message.reply("Tu n'as pas la permission.")
}},)

    switch (args[0].toLowerCase()) {
        case "roll":
            var roll = Math.floor(Math.random() * args[1]) +1;
            if (!roll) return message.reply("Entre un numéro")
            message.channel.send("Je choisis le numéro " + roll + " !");
            break;
        case "8ball":
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte) {
            return message.reply("Merci de poser une question :8ball:")};

            var replys = [
                "Oui",
                "Nan",
                "Je sais pas",
                "Peut être",
            ];

            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var bembed = new Discord.RichEmbed()
            .setDescription(":8ball: 8ball")
            .addField("Question", tte)
            .addField("Réponse", reponse)
            message.channel.sendEmbed(bembed)
    }
