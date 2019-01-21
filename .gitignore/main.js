const Discord = require('discord.js');

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} est en ligne !`);
    bot.user.setActivity(`.help sur ${bot.guilds.size} serveurs`);
});

bot.on("guildCreate", guild => {
    bot.user.setActivity(`.help sur ${bot.guilds.size} serveurs`);
    });
    
bot.on("guildDelete", guild => {
    bot.user.setActivity(`.help sur ${bot.guilds.size} serveurs`);
    });
  
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return

    let PREFIX = ".";
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    //information sur le serveur
    if (command === `${PREFIX}infoserv`) {
    let servcreate = message.guild.createdAt.toString().split(" ");

    const moment3 = require("moment");
    moment3.locale("fr");

    let servIcon = message.guild.iconURL

    let servEmbed = new Discord.RichEmbed()
            .setTitle('Information du serveur:')
            .setColor('RANDOM')
            .setThumbnail(servIcon)
            .addField('Nom du serveur:', message.guild.name, true)
            .addField('Créé le:',  moment3(message.guild.createdAt).format("LL"), true)
            .addField('Propriétaire:', message.guild.owner.user.tag, true)
            .addField('ID:', message.guild.id, true)
            .addField('Région:', message.guild.region, true)
            .addField('Nombre total de membres:', message.guild.memberCount, true)
            .addField('Bots:', message.guild.members.filter(m => m.user.bot).size, true)
            .addField('Humains:', message.guild.members.filter(m => ! m.user.bot).size, true)
            .addField('Nombres de roles:', message.guild.roles.size, true)
            .addField('Channels textuels:', message.guild.channels.filter(channel => channel.type === 'text').size, true)
            .addField('Channels vocal:', message.guild.channels.filter(channel => channel.type === 'voice').size, true)
            .addField("Nombre d'emojis:", message.guild.emojis.filter(e=>e.toString()).size || "Pas d'emojis.", true)
            .setFooter("Exécutée par:" + " " + message.author.tag);
        return message.channel.send(servEmbed);
   }

    //informations sur le bot
    if (command === `${PREFIX}infobot`) {

        let botIcon = bot.user.displayAvatarURL;

        const moment2 = require("moment");
        moment2.locale("fr");
        
        let embed = new Discord.RichEmbed()
            .setTitle('Informations sur le bot:')
            .setColor('RANDOM')
            .setThumbnail(botIcon)
            .addField('Nom du bot:', bot.user.username, true)
            .addField('crée le', moment2(bot.createdAt).format("LL"), true)
            .addField('Créé par:','Skylost#5655', true)
            .addField('Serveurs en tout:', bot.guilds.size, true)
            .addField('Utilisateurs en tout:', bot.users.size, true)
            .addField("API:", `${Math.round(bot.ping)}ms`, true)
            .addField('Le discord officiel:', '>[Clique ici](https://discord.gg/FQE9x8R)< pour rejoindre le discord de SkyDream !', true)
            .setFooter("Exécutée par:" + " " + message.author.tag);

        return message.channel.send(embed);
    }

    //informations sur le joueur
    if (command === `${PREFIX}info`) {


        const moment = require("moment");
    moment.locale("fr");

    let user = message.mentions.users.first() || message.author;
    let member = message.mentions.members.first() || message.member;
 let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(member.user.avatarURL) 
        .addField('Pseudo:', member.user.username, true)
        .addField('ID:', member.id, true)
        .addField('Tag:',  `#${member.user.discriminator}`, true)
        .addField('Type:', member.user.bot ? 'Bot' : 'Humain', true)
        .addField('Jeu:', member.user.presence.game ? member.user.presence.game.name : 'pas de jeux', true)
        .addField('Arriver sur le serveur:', moment(message.guild.members.get(member.id).joinedAt).format("LL"), true)
        .addField('Compte discord crée le:', moment(member.user.createdAt).format("LL"), true)
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.channel.send(embed)

    }

    //help
    if (command === `${PREFIX}help`) {
        let help1 = new Discord.RichEmbed()
        .setTitle('Help:')
        .setColor('RANDOM')
        .setDescription("Les <> sont obligatoires/Les () sont pas necessaire")
        .addField(`${PREFIX}helpmod`, 'Envois les commandes de modération.')
        .addField(`${PREFIX}infoserv`, 'Envois les informations sur du serveur.')
        .addField(`${PREFIX}infobot`, 'Envois les informations sur le bot.')
        .addField(`${PREFIX}info (mention)`, 'Envois les informations sur la personne souhaiter.')
        .addField(`${PREFIX}8ball <question>`, 'SkyDream va répondre à tes questions.')
        .addField(`${PREFIX}suggestion <proposition>`, 'Envois une suggestion sur le serveur officiel de SkyDream (sans abus).')
        .addField(`${PREFIX}say <message>`, 'SkyDream va parler a ta place.')
        .addField(`${PREFIX}avatar (mention)`, "SkyDream va donner l'avatar de la personne souhaiter.")
        .addField(`${PREFIX}calcul <calcul souhaiter>`, "SkyDream va faire le calcul demander (+|-|*|/)")
        .addField(`${PREFIX}invite`, "Pour avoir l'invitation pour ajouter SkyDream sur ton serveur.")
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.channel.send(help1);
    }
    //helpmod
    if (command === `${PREFIX}helpmod`) {
        let help2 = new Discord.RichEmbed()
        .setTitle('Helpmod:')
        .setColor('RANDOM')
        .addField(`${PREFIX}report <mention> <raison>`, 'Report un utilisateur.')
        .addField(`${PREFIX}kick <mention> <raison>`, 'Kick un utilisateur.')
        .addField(`${PREFIX}ban <mention> <raison>`, 'ban un utilisateur.')
        .addField(`${PREFIX}clear <nombre>`, 'Fait le ménage.')
        .addField(`${PREFIX}sondage <question>`, "Crée un sondage pour avoir l'avis des autres.")
       
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.channel.send(help2);
    }

    //report
    if (command === `${PREFIX}report`) {
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
        .setFooter("Exécutée par:" + " " + message.author.tag);
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
        .setFooter("Exécutée par:" + " " + message.author.tag);

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
    if (command === `${PREFIX}kick`) {
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
        .setFooter("Exécutée par:" + " " + message.author.tag);
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
        .setFooter("Exécutée par:" + " " + message.author.tag);

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

    //ban
    if (command === `${PREFIX}ban`) {
        let  banUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!banUser) {
            return message.channel.send(":x: L'utilisateur n'exite pas ! :x:");
        }
        let banReason = args.join(' ').slice(22);

        if(!banReason) {
            return message.channel.send(":x: Vous devez mettre une raison a votre ban ! :x:");
        }
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(":x: Vous n'avez pas la permission pour ban ! :x:")
        }
        if (banUser.hasPermission('BAN_MEMBERS')) {
            return message.channel.send(":x: Vous ne pouvez pas ban cette utilisateur ! :x:")
        }

        let banmp = new Discord.RichEmbed()
        .setTitle('Ban:')
        .setColor('RANDOM')
        .addField('Du serveur:', message.guild.name)
        .addField('Pour la raison suivante:', banReason)
        .setFooter("Exécutée par:" + " " + message.author.tag);
        banUser.createDM().then(channel => {
        channel.send(banmp);
        });

        let banEmbed = new Discord.RichEmbed()
        .setTitle('Bans')
        .setColor('RANDOM')
        .addField(
            'Utilisateur ban:',
            `${banUser} (ID: ${banUser.id})`
            )
        .addField(
            'Utilisateur ayant ban:',
            `${message.author} (ID: ${message.author.id})`
            )
        .addField('Canal:', message.channel)
        .addField('Raison:', banReason)
        .setFooter("Exécutée par:" + " " + message.author.tag);

        let banChannel = message.guild.channels.find(x => x.name === "logs");
        if (!banChannel) {
            return message.channel.send(
                ":x: Canal 'logs' introuvable. Veuillez créer ce canal ! :x:"
            );
        }
        message.delete();
        message.guild.member(banUser).ban(banReason);
        banChannel.send(banEmbed);
        message.channel.send(':white_check_mark: Utilisateur ban avec succés ! :white_check_mark:');
    }
    //8Ball
    if (command === `${PREFIX}8ball`) {
    if (!args[1]) return message.reply("Entrez une question !");

    let replies = ["Essaye plus tard.", "Peut être.", "Pas d'avis.", "C'est ton destin.", "Le sort en est jeté.", "Une chance sur deux.", "D'après moi oui.", "C'est certain.", "Oui absolument.", "Repose ta question.", "Tu peut compter dessus.", "Sans aucun doute.", "Très probable.", "Oui.", "C'est bien parti.", "C'est non.", "Peu probable.", "Faut pas rêver.", "N'y compte pas.", "Impossible.", "Même pas en rêve.", "Bien sur.", "Sûrrement.", "Tout à fait."];
    let question = args.slice(0).join(" ");
    let res = Math.floor((Math.random() * replies.length));

    let Ball8 = new Discord.RichEmbed()
    .setTitle("🎱 8Ball 🎱")
    .setColor("RANDOM")
    .addField("Question:", question)
    .addField("Réponse:", replies[res])
    .setFooter("Exécutée par:" + " " + message.author.tag);
    message.channel.send(Ball8);
    }

    //invite
    if (command === `${PREFIX}invite`) {
        let liens = new Discord.RichEmbed()
        .setTitle("L'invitation:")
        .addField("Lien pour m'inviter:", ">[Clique ici](https://discordapp.com/oauth2/authorize?client_id=533636873197715456&scope=bot&permissions=8)< pour m'inviter sur ton serveur !")
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.channel.send(liens);
    }
    
    //clear
    if (command === `${PREFIX}clear`) {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply(":x: Vous n'avez pas la permission pour clear ! :x:");
        if (!args[0])
        return message.reply(
            `Erreur: ${PREFIX}clear <nombre de message a suprimé>`
        );
                   
    let clearChannel = message.guild.channels.find(x => x.name === "logs");
    if (!clearChannel) {
        return message.channel.send(
            ":x: Canal 'logs' introuvable. Veuillez créer ce canal ! :x:"
        )};

            let ménageEmbed = new Discord.RichEmbed()
            .setTitle('Clear:')
            .setColor('RANDOM')
            .addField('Messages suprimer:', `${args[0]}`)
            .addField('Dans le salon:', message.channel)
            .addField('Par:', message.author.tag)
            .setFooter("Exécutée par:" + " " + message.author.tag);
            clearChannel.send(ménageEmbed);
 
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel
            .send('✅')
            .then(msg => msg.delete(3000));
        });
    }

    //say
    if (command === `${PREFIX}say`) {
    let messagetobot = args.join(' ');

    let sayChannel = message.guild.channels.find(x => x.name === "logs");
    if (!sayChannel) {
        return message.channel.send(
            ":x: Canal 'logs' introuvable. Veuillez créer ce canal ! :x:"
        )};

    let messagetobotEmbed = new Discord.RichEmbed()
        .setTitle('Say:')
        .setColor('RANDOM')
        .addField('Message:', messagetobot)
        .setFooter("Exécutée par:" + " " + message.author.tag)
        sayChannel.send(messagetobotEmbed);
    message.channel.send(messagetobot);
    message.delete().catch();
    }

    //sondage
    if (command === `${PREFIX}sondage`) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send(":x: Vous n'avez pas la permission pour cela ! :x:")
    };
    if (!args[0]) return message.channel.send(`Erreur: ${PREFIX}sondage <question>`);

    message.delete().catch();

    let sondagembed = new Discord.RichEmbed()
    .setTitle(`Sondage de ${message.author.username}:`)
    .setColor('RANDOM')
    .addField('Question:', args.join(' '))
    .setFooter("Exécutée par:" + " " + message.author.tag);

    let Mes = await message.channel.send(sondagembed);
    await Mes.react('✅')
    await Mes.react('❌')
    }

    //suggestion
    if (command === `${PREFIX}suggestion`) {
        let messagesug = args.join(' ');
        if (!args[0]) return message.channel.send(`Erreur: ${PREFIX}suggestion <proposition>`);

        let sugembed = new Discord.RichEmbed()
        .setTitle('Nouvelle suggestion:')
        .setColor('RANDOM')
        .addField('Venant de:', message.author.tag)
        .addField('Depuis:', message.guild.name + ' | ' + message.channel.name)
        .addField('Proposition:', messagesug)
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.delete().catch();

        var Mes2 = await bot.channels.get(`533926069045297167`)
            Mes2.send(sugembed).then(async function (Mes2) {
                await Mes2.react('✅')
                await Mes2.react('🤔')
                await Mes2.react('❌')
            });
    }   
    
    //avatar
    if (command === `${PREFIX}avatar`) {
    let user1 = message.mentions.users.first() ? message.mentions.users.first() : message.author
  let ava1 = user1.displayAvatarURL
  let embedav = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle("Avatar de:" + " " + user1.username)
      .setImage(ava1)
      .setFooter("Exécutée par:" + " " + message.author.tag);
  message.channel.send(embedav);
    }

    //calcul
    if (command === `${PREFIX}calcul`) {
        const math = require('math-expression-evaluator');

        if (!args[0]) return message.channel.send("Entrez un calcul !");
        let calcul;

        try {
            calcul = math.eval(args.join(' '));
        } catch (e) {
            return message.channel.send("Désolé, entrez des chiffres valides !");
        }

        let mathembed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Calcul:', args.join(' '))
        .addField('Résultat:', calcul)
        .setFooter("Exécutée par:" + " " + message.author.tag);
  message.channel.send(mathembed);
    }
 
    //fun
    if (command === `${PREFIX}kill`) {
        let user = message.mentions.users.first() || message.author;
        let member = message.mentions.members.first() || message.member;
    message.channel.send(`${member.user.username} est mort.`).then(Message => {
        setTimeout(() => { Message.edit("Réaparition..."); }, 2000);
        setTimeout(() => { Message.edit(`Réaparition complète. Rebonjour, ${member.user.username}`); }, 4000);
    
    });
}

});

bot.login(process.env.TOKEN);
