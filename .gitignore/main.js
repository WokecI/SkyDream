const Discord = require('discord.js');

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} est en ligne !`);
    bot.user.setActivity('.help | 3 serveurs');
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return

    let prefix = ".";
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    //information sur le serveur
    if (command === `${prefix}infoserv`) {
    let servIcon = message.guild.iconURL
    let servEmbed = new Discord.RichEmbed()
            .setTitle('Information du serveur:')
            .setColor('RANDOM')
            .setThumbnail(servIcon)
            .addField('Nom du serveur:', message.guild.name)
            .addField('Nombre total de membres:', message.guild.memberCount)
            .addField('Créé le:', message.guild.createdAt)
            .addField('Vous avez rejoint le:', message.member.joinedAt)
            .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);
        return message.channel.send(servEmbed);
   }

    //informations sur le bot
    if (command === `${prefix}infobot`) {
        let botIcon = bot.user.displayAvatarURL;
        let embed = new Discord.RichEmbed()
            .setTitle('Informations sur le bot:')
            .setColor('RANDOM')
            .setThumbnail(botIcon)
            .addField('Nom du bot:', bot.user.username)
            .addField('Créé le:', bot.user.createdAt)
            .addField('Créé par:','Skylost#5655')
            .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);

        return message.channel.send(embed);
    };

    //help
    if (command === `${prefix}help`) {
        let help1 = new Discord.RichEmbed()
        .setTitle('Help:')
        .setColor('RANDOM')
        .addField(`${prefix}helpmod`, 'Envois les commandes de modération.')
        .addField(`${prefix}infoserv`, 'Envois les informations sur du serveur.')
        .addField(`${prefix}infobot`, 'Envois les informations sur le bot.')
        .addField(`${prefix}8ball <question>`, 'SkyDream va répondre à tes questions.')
        .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);
        message.channel.send(help1);
    }
    //helpmod
    if (command === `${prefix}helpmod`) {
        let help2 = new Discord.RichEmbed()
        .setTitle('Helpmod:')
        .setColor('RANDOM')
        .addField(`${prefix}report <mention> <raison>`, 'Report un utilisateur.')
        .addField(`${prefix}kick <mention> <raison>`, 'Kick un utilisateur.')
        .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);
        message.channel.send(help2);
    }

    //report
    if (command === `${prefix}report`) {
        let reportedUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!reportedUser) {
            return message.channel.send(":x: L'utilisateur n'exite pas ! :x:");
        }
        let reportedReason = args.join(' ').slice(22);

        if(!reportedReason) {
            return message.channel.send(":x: Vous devez mettre une raison a votre report ! :x:");
        }

        let reportmp = new Discord.RichEmbed()
        .setTitle('Report:')
        .setColor('RANDOM')
        .addField('Du serveur:', message.guild.name)
        .addField('Pour la raison suivante:', reportedReason)
        .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag)
        reportedUser.createDM().then(channel => {
        channel.send(reportmp);
        });

        let reportEmbed = new Discord.RichEmbed()
        .setTitle('Reports')
        .setColor('RANDOM')
        .addField(
            'Utilisateur reporté:',
            `${reportedUser} (ID: ${reportedUser.id})`
            )
        .addField(
            'Utilisateur ayant reporté:',
            `${message.author} (ID: ${message.author.id})`
            )
        .addField('Canal:', message.channel)
        .addField('Raison:', reportedReason)
        .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);

        let reportedChannel = message.guild.channels.find(x => x.name === "logs");
        if (!reportedChannel) {
            return message.channel.send(
                ":x: Canal 'logs' introuvable. Veuillez créer ce canal ! :x:"
            );
        }
        message.delete();
        reportedChannel.send(reportEmbed)
        
        message.channel.send(':white_check_mark: Utilisateur reporté avec succés ! :white_check_mark:');
    }

    //kick
    if (command === `${prefix}kick`) {
        let kickUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!kickUser) {
            return message.channel.send(":x: L'utilisateur n'exite pas ! :x:");
        }
        let kickReason = args.join(' ').slice(22);

        if(!kickReason) {
            return message.channel.send(":x: Vous devez mettre une raison a votre report ! :x:");
        }
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send(":x: Vous n'avez pas la permission pour kick ! :x:")
        }
        if (kickUser.hasPermission('KICK_MEMBERS')) {
            return message.channel.send(":x: Vous ne pouvez pas kick cette utilisateur ! :x:")
        }

        let kickmp = new Discord.RichEmbed()
        .setTitle('Kick:')
        .setColor('RANDOM')
        .addField('Du serveur:', message.guild.name)
        .addField('Pour la raison suivante:', kickReason)
        .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag)
        kickUser.createDM().then(channel => {
        channel.send(kickmp);
        });

        let kickEmbed = new Discord.RichEmbed()
        .setTitle('kicks')
        .setColor('RANDOM')
        .addField(
            'Utilisateur kické:',
            `${kickUser} (ID: ${kickUser.id})`
            )
        .addField(
            'Utilisateur ayant kické:',
            `${message.author} (ID: ${message.author.id})`
            )
        .addField('Canal:', message.channel)
        .addField('Raison:', kickReason)
        .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);

        let kickChannel = message.guild.channels.find(x => x.name === "logs");
        if (!kickChannel) {
            return message.channel.send(
                ":x: Canal 'logs' introuvable. Veuillez créer ce canal ! :x:"
            );
        }
        message.delete();
        message.guild.member(kickUser).kick(kickReason);
        kickChannel.send(kickEmbed);
        message.channel.send(':white_check_mark: Utilisateur kické avec succés ! :white_check_mark:');
    }

    //8Ball
    if (command === `${prefix}8ball`) {
    if (!args[1]) return message.reply("Entrez une question !");

    let replies = ["Essaye plus tard.", "Essaye encore.", "Pas d'avis.", "C'est ton destin.", "Le sort en est jeté.", "Une cgance sur deux.", "D'après moi oui.", "C'est certain.", "Oui absolument.", "Repose ta question.", "Tu peut compter dessus.", "Sans aucun doute.", "Très probable.", "Oui.", "C'est bien parti.", "C'est non.", "Peu probable.", "Faut pas rêver.", "N'y compte pas.", "Impossible."];
    let question = args.slice(0).join(" ");
    let res = Math.floor((Math.random() * replies.length));

    let Ball8 = new Discord.RichEmbed()
    .setTitle(":8ball: 8Ball :8ball:")
    .setColor("RANDOM")
    .addField("Question:", question)
    .addField("Réponse:", replies[res])
    .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);
    message.channel.send(Ball8);
    }

    //liens
    if (command === `${prefix}liens`) {
        let liens = new Discord.RichEmbed()
        .setTitle('Les liens:')
        .addField('Le discord officiel:', '[Clique ici](https://discord.gg/FQE9x8R) pour rejoindre le discord de SkyDream !')
        .addField("Lien pour m'inviter:", "[Clique ici] pour m'inviter sur ton serveur !")
        .setFooter("Commandes par Skylost#5655 |" + " " + message.author.tag);
        message.channel.send(liens);
    }
});

bot.login(process.env.TOKEN);
