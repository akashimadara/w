const { log } = require("console")
const Discord = require("discord.js")

const db = require('quick.db')
const p = new db.table("Prefix")
const cl = new db.table("Color")
const owner = new db.table("Owner")

module.exports = {
    name: 'help',
    usage: 'help',
    category: "utils",
    description: `Permet d'afficher l'help.`,
     async execute(client, message, args,config,emote,footer,color) {
        const funny = config.app.funny
        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        let img = db.fetch(`img_${message.guild.id}`)
        if (img == null) img = "https://share.creavite.co/NwlEYT8Z9txYAQgb.gif"

        

        if (args[0] === "settings") {

            if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

                let fufu = db.get(`help`)
                if (fufu == null) fufu = "Menu"
                if (fufu == 'help') fufu = "Menu"
                if (fufu == 'helpb') fufu = "Bouton"

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Help Settings`)
                    .setDescription(`Help actuel : \`${fufu}\``)
                    .setColor(color)

                const menu = new Discord.MessageEmbed()
                    .setTitle(`Help Settings`)
                    .setDescription(`Nouveau help : \`Menu\``)
                    .setColor(color)

                const button = new Discord.MessageEmbed()
                    .setTitle(`Help Settings`)
                    .setDescription(`Nouveau help : \`bouton\``)
                    .setColor(color)



                const helpset = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('menu')
                            .setLabel('Menu')
                            .setStyle('SUCCESS')
                    )
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('button')
                            .setLabel('Bouton')
                            .setStyle('DANGER')
                    )

                message.channel.send({ embeds: [embed], components: [helpset] }).then(async msg => {

                    const collector =msg.createMessageComponentCollector({
                        componentType: "BUTTON",
                        filter: i => i.user.id === message.author.id
                    })
                    collector.on("collect", async (c) => {
                        const value = c.customId
                        if (value === "menu") {
                            db.set(`help`, "help")
                            c.reply({ content: `Votre help sera désormais affiché sous forme de **menu**`, ephemeral: true }).catch(() => false)
                            msg.edit({ embeds: [menu] })
                        }

                        else if (value === "button") {
                            db.set(`help`, "helpb")
                            c.reply({ content: `Votre help sera désormais affiché avec des **boutons**`, ephemeral: true }).catch(() => false)
                            msg.edit({ embeds: [button] })
                        }
                    })
                })
                return
            }
        }

        if (args[0] === "msg") {

            const premiumTier = {
                NONE: 0,
                TIER_1: 1,
                TIER_2: 2,
                TIER_3: 3,
            };

            const embed = new Discord.MessageEmbed()
                .setTitle(`Arguments de messages`)
                .setDescription(`Exemple de message simple: \`{MemberMention} nous a rejoint,  nous sommes maintenant {MemberCount} sur {Server}\``)
                .addFields(
                    { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Funny`', inline: true },
                    { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`, inline: true },
                    { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Funny#0666`', inline: true },
                )
                .addFields(
                    { name: '{MemberID}', value: `L'ID du membre concerné\n\`Exemple: ${message.author.id}\``, inline: true },
                    { name: '{MemberCount}', value: `Le nombre total de membres sur le serveurn\n\`Exemple: ${message.guild.memberCount}\``, inline: true },
                    { name: '{Server}', value: `Le nom du serveur\n\`Exemple: ${message.guild.name}\``, inline: true },
                )
                .addFields(
                    { name: '{ServerBoostsCount}', value: `Le nombre de boost du serveur\n\`Exemple: ${message.guild.premiumSubscriptionCount || '0'}\``, inline: true },
                    { name: '{ServerLevel}', value: `Le niveau actuel du serveur\n\`Exemple: ${premiumTier[message.guild.premiumTier]}\``, inline: true },
                    { name: '{VocalMembersCount}', value: `Le nombre total de membres en vocal sur le serveur\n\`Exemple: ${message.guild.members.cache.filter(m => m.voice.channel).size}\``, inline: true },
                )
                .addFields(
                    { name: '{OnlineMembersCount}', value: `Le nombre total de membres en ligne sur le serveur\n\`Exemple: ${message.guild.presences.cache.filter((presence) => presence.status !== "offline").size}\``, inline: true },
                )
                .setColor(color)

            message.channel.send({ embeds: [embed] })
            return
        }

        if (args[0] === "all") {

            const imgperm = "https://share.creavite.co/NwlEYT8Z9txYAQgb.gif"

            
    
            //Embed Help

            const help = new Discord.MessageEmbed()
                .setTitle(`Panel d'aide Permissions ${client.user.username}`)
                .setDescription(`Ce bot appartient à <@${funny}>`)
                .setImage(imgperm)
                .setColor(color)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })


            const public = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Commandes Publiques
\`\`\`
    
    **\`${pf}activity\`**
    **\`${pf}avatar\`**
    **\`${pf}banner\`**
    **\`${pf}help\`**
    **\`${pf}helpall\`**
    **\`${pf}ping\`**
    **\`${pf}find\`**
    **\`${pf}serveur info/pic/banner\`**
    **\`${pf}config\`**
    **\`${pf}snipe\`**
    **\`${pf}support\`**
    **\`${pf}suggest\`**
    **\`${pf}perm\`**
    **\`${pf}gestion\`**
    **\`${pf}bypass\`**
    
              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


            //Embed perm1

            const perm1 = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Permission 1
\`\`\`
    
    **\`${pf}voicemute\`**
    **\`${pf}voiceunmute\`**
    **\`${pf}roleinfo\`**
    **\`${pf}mute\`**
    
              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            //Embed perm2

            const perm2 = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Permissions 2
\`\`\`
    
    **\`${pf}botlist\`**
    **\`${pf}adminlist\`**
    **\`${pf}rlist\`**
    **\`${pf}hide\`**
    **\`${pf}unhide\`**
    **\`${pf}clear\`**
    
    
    `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)




            //Embed perm3

            const perm3 = new Discord.MessageEmbed()
                .setDescription(`
\`\`\`fix
Permission 3
\`\`\`
    
    **\`${pf}lock\`**
    **\`${pf}unlock\`**
    **\`${pf}renew\`**
    **\`${pf}slowmode\`**
    **\`${pf}embed\`**
    **\`${pf}emoji\`**
    **\`${pf}ban\`**
    **\`${pf}kick\`**
    **\`${pf}unban\`**
    
    `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed permgs

            const permgs = new Discord.MessageEmbed()
                .setDescription(`
              
\`\`\`fix
Permission Gestion Staff
\`\`\`
**\`${pf}addrole\`**
**\`${pf}delrole\`**
    
              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

            //Embed permgp

            const permgp = new Discord.MessageEmbed()
                .setDescription(`
          
\`\`\`fix
Permission Gestion Permissions
\`\`\`
    **\`${pf}pall\`**
    **\`${pf}padmin\`**
    **\`${pf}pban\`**
    **\`${pf}pkick\`**
    **\`${pf}prole\`**
    **\`${pf}pserveur\`**
    **\`${pf}pview\`**
    **\`${pf}pvoc\`**
    **\`${pf}pwebhooks\`**
    
    
          `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)



            //Embed permga

            const permga = new Discord.MessageEmbed()
                .setDescription(`
                              
    \`\`\`fix
    Permission Giveaway
    \`\`\`
    **\`${pf}giveaway\`**
    Permet de lancé un Giveaway sur le serveur
    **\`${pf}end [ID]\`**
    Permet de terminé un Giveaway sur le serveur
    **\`${pf}reroll [ID]\`**
    Permet de reroll un Giveaway sur le serveur
                        
                              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)

              

            const owner = new Discord.MessageEmbed()
                .setDescription(`
                              
    \`\`\`fix
    Owners
    \`\`\`
    **\`${pf}setalerte\`**
    **\`${pf}alerte\`**
    **\`${pf}alerteping\`**
    **\`${pf}antiadmin on/off\`**
    **\`${pf}antiban on/off\`**
    **\`${pf}antiupdate on/off\`**
    **\`${pf}antibot on/off\`**
    **\`${pf}antidown on/off\`**
    **\`${pf}antilink invite/all/off\`**
    **\`${pf}antieveryone on/off\`**
    **\`${pf}antichannel create on/off\`**
    **\`${pf}antichannel delete on/off\`**
    **\`${pf}antichannel update on/off\`**
    **\`${pf}antirole create on/off\`**
    **\`${pf}antirole delete on/off\`**
    **\`${pf}antirole update on/off\`**
    **\`${pf}antiwebhook on/off\`**
    **\`${pf}server lock/unlock\`**
    **\`${pf}secur\`**
    **\`${pf}secur on/off\`**
    **\`${pf}wl\`**
    **\`${pf}unwl\`**
    **\`${pf}set perm\`**
    **\`${pf}del perm\`**
    **\`${pf}perm list\`**
    **\`${pf}playing\`**
    **\`${pf}stream\`**
    **\`${pf}watch\`**
    **\`${pf}list\`**
    **\`${pf}setcategorie\`**
    **\`${pf}setsuggest\`**
    **\`${pf}soutien\`**
    **\`${pf}boostlog\`**
    **\`${pf}giveawaylog\`**
    **\`${pf}messagelog\`**
    **\`${pf}ticketlog\`**
    **\`${pf}modlog\`**
    **\`${pf}raidlog\`**
    **\`${pf}imghelp\`**
    **\`${pf}muterole\`**
    **\`${pf}annonce\`**
    **\`${pf}derankall\`**
    **\`${pf}mp\`**
    **\`${pf}rolelist\`**
    **\`${pf}ticket\`**
    **\`${pf}ticketset\`**
    **\`${pf}punition\`**
    **\`${pf}join settings\`**
    **\`${pf}join role\`**
    **\`${pf}tempvoc\`**
    **\`${pf}unbanall\`**
    **\`${pf}dero\`**
    
                              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)





                const buyer = new Discord.MessageEmbed()
                .setDescription(`
                              
    \`\`\`fix
    Propriétaire
    \`\`\`
    **\`${pf}leave [Id]\`**
    Permet de faire quitter le bot d'un serveur
    
    **\`${pf}mybot\`**
    Permet d'inviter le bot sur des serveurs
    
    **\`${pf}owner add/remove/list\`**
    Permet de gérer les owners du bot
    
     
                              `)
                .setFooter({ text: `${footer} | Prefix actuel : ${pf}` })
                .setColor(color)


                
            const button1 = new Discord.MessageButton()
                .setCustomId('gauche')
                .setLabel('<<<')
                .setStyle('DANGER');

            const button2 = new Discord.MessageButton()
                .setCustomId('droite')
                .setLabel('>>>')
                .setStyle('DANGER');


            pages = [
                public,
                perm1,
                perm2,
                perm3,
                permgs,
                permgp,
                permga,
                owner,
                buyer,
                help
                
                

            ];

            buttonList = [
                button1,
                button2
            ]

            paginationEmbed(message, pages, buttonList);
            return
        }
      

        let helpm = db.get(`help`)
        if (helpm == null) helpm = 'help'
        let prefix = pf || config.app.px
      
            const fs = require("fs")
            let categorys = fs.readdirSync("./commands/")
            let cat = []
            categorys.forEach(category => {
                let dir = fs.readdirSync(`./commands/${category}/`).filter(file => file.endsWith(".js"))
                cat.push({
                    name : category,
                    commands : dir
                })
            })
            let embed = {
                color : 0x2f3136,
                title : cat[0].name[0].toUpperCase() + cat[0].name.slice(1),
                description : cat[0].commands.map(r=>(`\`${prefix}${r.split(".")[0]}\`\n${client.commands.get(r.split(".")[0])?.description}`).replace("undefined","Sans description")).join("\n"),
            }

            let buttons = [{
                type : 1,
                components : [ 
                {
                style : "PRIMARY",
                label : "<<<",
                type : 2,
                custom_id : "back"
            },{
                style : "PRIMARY",
                label : ">>>",
                type : 2,
                custom_id : "next"
            }]
        }]
           let emojis =
        {
            "Acceuil" : "", //mettre id emoji entre ""
            "Owner" : "", //mettre id emoji entre ""
            "Buyer" : "", //mettre id emoji entre ""
            "Antiraid" : "", //mettre id emoji entre ""
            "Gestion" : "", //mettre id emoji entre ""
            "Utilities" : "", //mettre id emoji entre ""
            "Music" : "", //mettre id emoji entre ""
            "Moderation" : "", //mettre id emoji entre ""
            "Logs" : "", //mettre id emoji entre ""
            "Giveway" : "", //mettre id emoji entre ""
            "Games" : "", //mettre id emoji entre "" 
            "Voice" : "" //mettre id emoji entre "" 
       }
           if(helpm == "help") {
            let options =  cat.map(r=>({
                label : r.name[0].toUpperCase() + r.name.slice(1),
                value : r.name,
                emoji : {id : emojis[(r.name[0].toUpperCase() + r.name.slice(1))]
                }
            }))
            options.unshift({
                label : "Acceuil",
                value : "acceuil",
                emoji : {id : emojis["Acceuil"]}
            })
            log( options)
            
            buttons = [{
                type : 1,
                components : [
                {
                    type : 3,
                    custom_id : "menu",
                    options : options,
                    placeholder : "Selectionnez une catégorie",
                    min_values : 1,
                    max_values : 1
                }
            ]

            }]
           }
            let msg = await message.channel.send({embeds : [embed],components : buttons})
            let filter = (button) => button.user.id === message.author.id
            const collector = msg.createMessageComponentCollector({filter,time : 300000})
            let index = 0
            collector.on("collect",async (button) => {
                if(button.customId === "menu"){
                    if(button.values[0] === "acceuil"){
                        return await button.update({embeds : [embed],components : buttons})
                    }
                    
                    index = cat.findIndex(r=>r.name === button.values[0])
                    embed = {
                        color : 0x2f3136,
                        title : cat[index].name[0].toUpperCase() + cat[index].name.slice(1),
                        description : cat[index].commands.map(r=>(`\`${prefix}${r.split(".")[0]}\`\n${client.commands.get(r.split(".")[0])?.description}`).replace("undefined","Sans description")).join("\n"),
                    }
                    await button.update({embeds : [embed]})
                }

                if(button.customId === "back"){
                    if(index === 0) index = cat.length - 1
                    else index--
                    embed = {
                        color : 0x2f3136,
                        title : cat[index].name[0].toUpperCase() + cat[index].name.slice(1),
                        description : cat[index].commands.map(r=>(`\`${prefix}${r.split(".")[0]}\`\n${client.commands.get(r.split(".")[0])?.description}`).replace("undefined","Sans description")).join("\n"),
                    }
                    await button.update({embeds : [embed]})
                }
                if(button.customId === "next"){
                    if(index === cat.length - 1) index = 0
                    else index++
                    embed = {
                        color : 0x2f3136,
                        title : cat[index].name[0].toUpperCase() + cat[index].name.slice(1),
                        description : cat[index].commands.map(r=>(`\`${prefix}${r.split(".")[0]}\`\n${client.commands.get(r.split(".")[0])?.description}`).replace("undefined","Sans description")).join("\n"),
                    }
                    await button.update({embeds : [embed]})
                }
            }
            )





           
        

    }
    }


function paginationEmbed(message,page,buttonList) {
    if (!page) throw new Error('Aucune page n\'a été fournie.');
    if (!buttonList) throw new Error('Aucun bouton n\'a été fourni.');
    if (buttonList[0].style === 'LINK' || buttonList[1].style === 'LINK') throw new Error('Les boutons de lien ne sont pas pris en charge.');

    const embed = page[0];
    if (!embed.footer) embed.footer = {};
    if (embed.footer.text) embed.footer.text += '\n';
    embed.footer.text += `Page 1 sur ${page.length}`;

    let components = [{
        type: 1,
        components: buttonList
    }]
    message.channel.send({ embeds: [embed], components: components }).then(msg => {
        const collector = msg.createMessageComponentCollector({ time: 300000 });

        let currentIndex = 0;
        collector.on('collect', async b => {
            if (b.user.id !== message.author.id) {
                b.reply({ content: 'Vous n\'êtes pas autorisé à utiliser ce bouton.', ephemeral: true });
                return;
            }

            if (b.customId === buttonList[0].customId) {
                currentIndex -= 1;
                if (currentIndex < 0) currentIndex = 0;
            } else if (b.customId === buttonList[1].customId) {
                currentIndex += 1;
                if (currentIndex > page.length - 1) currentIndex = page.length - 1;
            }

            b.deferUpdate();
            await msg.edit({ embeds: [page[currentIndex]], components: [{
                type: 1,
                components: buttonList
            }] });
        });
    });
}