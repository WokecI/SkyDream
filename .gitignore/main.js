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

bot.on("guildMemberAdd", user => {
    bot.user.setActivity(`.help sur ${bot.guilds.size} serveurs`);
    });

bot.on("guildMemberRemove", user => {
    bot.user.setActivity(`.help sur ${bot.guilds.size} serveurs`);
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
    let servcreate = message.guild.createdAt.toString().split(" ");

    let servIcon = message.guild.iconURL

    let servEmbed = new Discord.RichEmbed()
            .setTitle('Information du serveur:')
            .setColor('RANDOM')
            .setThumbnail(servIcon)
            .addField('Nom du serveur:', message.guild.name,)
            .addField('Nombre total de membres:', message.guild.memberCount,)
            .addField('Créé le:', servcreate[2] + '/' + servcreate[1] + '/' + servcreate[3] + '/' + servcreate[4],)
            .setFooter("Exécutée par:" + " " + message.author.tag);
           // .setFooter(message.author.tag + "/" + Datee.getDate() + "/" + (Datee.getMonth()+1) + "/" + Datee.getFullYear() + "/" + Datee.getHours() + ":" + Datee.getMinutes() + ":" + Datee.getSeconds());
        return message.channel.send(servEmbed);
   }

    //informations sur le bot
    if (command === `${prefix}infobot`) {
        let botcreate = bot.user.createdAt.toString().split(" ");

        let botIcon = bot.user.displayAvatarURL;
        
        let embed = new Discord.RichEmbed()
            .setTitle('Informations sur le bot:')
            .setColor('RANDOM')
            .setThumbnail(botIcon)
            .addField('Nom du bot:', bot.user.username,)
            .addField('Créé le:', botcreate[2] + '/' + botcreate[1] + '/' + botcreate[3] + '/' + botcreate[4],)
            .addField('Créé par:','Skylost#5655')
            .addField('Serveurs en tout:', bot.guilds.size)
            .addField('Utilisateurs en tout:', bot.users.size)
            .addField("API:", `${Math.round(bot.ping)}ms`)
            .addField('Le discord officiel:', '>[Clique ici](https://discord.gg/FQE9x8R)< pour rejoindre le discord de SkyDream !')
            .setFooter("Exécutée par:" + " " + message.author.tag);

        return message.channel.send(embed);
    }

    //informations sur le joueur
    if (command === `${prefix}info`) {
        let usercreate = message.author.createdAt.toString().split(" ");
        let userjoin = message.member.joinedAt.toString().split(" ");
    
        let jicon = message.author.avatarURL;

        let jembed = new Discord.RichEmbed()
            .setTitle('Informations sur le joueur:')
            .setColor('RANDOM')
            .setThumbnail(jicon)
            .addField('Pseudo:', message.author.tag, true)
            .addField('ID:', message.author.id, true)
            .addField('Compte créé le:', usercreate[2] + '/' + usercreate[1] + '/' + usercreate[3] + '/' + usercreate[4], true)
            .addField('Tu a rejoint le:', userjoin[2] + '/' + userjoin[1] + '/' + userjoin[3] + '/' + userjoin[4],true)
            .setFooter("Exécutée par:" + " " + message.author.tag);

        return message.channel.send(jembed);
    }

    //help
    if (command === `${prefix}help`) {
        let help1 = new Discord.RichEmbed()
        .setTitle('Help:')
        .setColor('RANDOM')
        .addField(`${prefix}helpmod`, 'Envois les commandes de modération.')
        .addField(`${prefix}infoserv`, 'Envois les informations sur du serveur.')
        .addField(`${prefix}infobot`, 'Envois les informations sur le bot.')
        .addField(`${prefix}info`, 'Envois les informations sur toi.')
        .addField(`${prefix}8ball <question>`, 'SkyDream va répondre à tes questions.')
        .addField(`${prefix}suggestion <proposition>`, 'Envois une suggestion sur le serveur officiel de SkyDream (sans abus).')
        .addField(`${prefix}say <message>`, 'SkyDream va parler a ta place.')
        .addField(`${prefix}calcul <nombre (+ / - / * / x) nombre>`, 'SkyDream va faire ton calcul.')
        .addField(`${prefix}invite`, "Pour avoir l'invitation pour ajouter SkyDream sur ton serveur.")
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.channel.send(help1);
    }
    //helpmod
    if (command === `${prefix}helpmod`) {
        let help2 = new Discord.RichEmbed()
        .setTitle('Helpmod:')
        .setColor('RANDOM')
        .addField(`${prefix}report <mention> <raison>`, 'Report un utilisateur.')
        .addField(`${prefix}kick <mention> <raison>`, 'Kick un utilisateur.')
        .addField(`${prefix}ban <mention> <raison>`, 'ban un utilisateur.')
        .addField(`${prefix}clear <nombre>`, 'Fait le ménage.')
        .addField(`${prefix}sondage <question>`, "Crée un sondage pour avoir l'avis des autres.")
       
        .setFooter("Exécutée par:" + " " + message.author.tag);
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
    if (command === `${prefix}ban`) {
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
    if (command === `${prefix}8ball`) {
    if (!args[1]) return message.reply("Entrez une question !");

    let replies = ["Essaye plus tard.", "Peut être.", "Pas d'avis.", "C'est ton destin.", "Le sort en est jeté.", "Une chance sur deux.", "D'après moi oui.", "C'est certain.", "Oui absolument.", "Repose ta question.", "Tu peut compter dessus.", "Sans aucun doute.", "Très probable.", "Oui.", "C'est bien parti.", "C'est non.", "Peu probable.", "Faut pas rêver.", "N'y compte pas.", "Impossible.", "Même pas en rêve.", "Bien sur.", "Sûrrement.", "Tout à fait."];
    let question = args.slice(0).join(" ");
    let res = Math.floor((Math.random() * replies.length));

    let Ball8 = new Discord.RichEmbed()
    .setTitle("?? 8Ball ??")
    .setColor("RANDOM")
    .addField("Question:", question)
    .addField("Réponse:", replies[res])
    .setFooter("Exécutée par:" + " " + message.author.tag);
    message.channel.send(Ball8);
    }

    //invite
    if (command === `${prefix}invite`) {
        let liens = new Discord.RichEmbed()
        .setTitle("L'invitation:")
        .addField("Lien pour m'inviter:", ">[Clique ici](https://discordapp.com/oauth2/authorize?client_id=533636873197715456&scope=bot&permissions=8)< pour m'inviter sur ton serveur !")
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.channel.send(liens);
    }
    
    //clear
    if (command === `${prefix}clear`) {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
        return message.reply(":x: Vous n'avez pas la permission pour clear ! :x:");
        if (!args[0])
        return message.reply(
            `Erreur: ${prefix}clear <nombre de message a suprimé>`
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
            .send('?')
            .then(msg => msg.delete(3000));
        });
    }

    //say
    if (command === `${prefix}say`) {
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
    if (command === `${prefix}sondage`) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send(":x: Vous n'avez pas la permission pour cela ! :x:")
    };
    if (!args[0]) return message.channel.send(`Erreur: ${prefix}sondage <question>`);

    message.delete().catch();

    let sondagembed = new Discord.RichEmbed()
    .setTitle(`Sondage de ${message.author.username}:`)
    .setColor('RANDOM')
    .addField('Question:', args.join(' '))
    .setFooter("Exécutée par:" + " " + message.author.tag);

    let Mes = await message.channel.send(sondagembed);
    await Mes.react('?')
    await Mes.react('?')
    }

    //suggestion
    if (command === `${prefix}suggestion`) {
        let messagesug = args.join(' ');
        if (!args[0]) return message.channel.send(`Erreur: ${prefix}suggestion <proposition>`);

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
                await Mes2.react('?')
                await Mes2.react('??')
                await Mes2.react('?')
            });
    }     
    
    //calcul
    if (command === `${prefix}calcul`) {

        const math = require("math-expression-evaluator"); 

        if (!args[0]) return message.channel.send("Entrez des chiffres !");
        let calcul;

        try {
            calcul = math.eval(args.join(' '));
        } catch (e) {
            return message.channel.send("Désolé, entrez des chiffres valides !");
        }

        const mathembed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('Chiffres:', args.join(' '))
        .addField('Résultat:', calcul)
        .setFooter("Exécutée par:" + " " + message.author.tag);
        message.channel.send(mathembed);
    }

});

bot.login(process.envTOKEN);
