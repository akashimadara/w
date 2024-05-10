const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")

const fs = require('fs')
const moment = require('moment')



module.exports = {
    name: 'serveur',
    usage: 'serveur',
    description: `Permet d'afficher des informations relatives au serveur /info /pic /banner`,
     async execute(client, message, args,config,emote,footer,color) {

        

        if (args[0] === "pic") {

            let pic = message.guild.iconURL()
            if (pic) {

                const picembed = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setImage(message.guild.iconURL({ dynamic: true, size: 1024, }))
                message.channel.send({ embeds: [picembed] })

            } else {
                const nopic = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setDescription(`Ce serveur ne possède pas d'avatar`)
                message.channel.send({ embeds: [nopic] })
            }

        }

        if (args[0] == "banner") {

            let banner = message.guild.bannerURL()
            if (banner) {

                const bannerembed = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                message.channel.send({ embeds: [bannerembed] })

            } else {
                const nobanner = new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name}`)
                    .setColor(color)
                    .setDescription('Ce serveur ne possède pas de bannière')
                message.channel.send({ embeds: [nobanner] })
            }

        }

        if (args[0] == "info") {

            const premiumTier = {
                NONE: 0,
                TIER_1: 1,
                TIER_2: 2,
                TIER_3: 3,
            };

            const verifLevels = {
                NONE: "Aucune",
                LOW: "faible",
                MEDIUM: "Moyen",
                HIGH: "Élevé",
                VERY_HIGH: "Maximum",
            };

            const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
            const membersGuild = message.guild.members.cache;
            const channelsGuild = message.guild.channels.cache;
            const emojisGuild = message.guild.emojis.cache;

            let desc = message.guild.description
            if (desc == null) desc = "Le serveur ne possède pas de déscription !"

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                .setAuthor({name: `${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true, format: "png", size: 512 })})
                .setDescription(`**➔ Informations sur le serveur**
                > \`•\` **Nom : ** ${message.guild.name}
                > \`•\` **Description : **${desc}
                > \`•\` **ID :** ${message.guild.id}
                > \`•\` **Niveau de verif :** ${verifLevels[message.guild.verificationLevel]}
                > \`•\` **Vanity :** ${message.guild.vanityURLCode || "n'a pas de vanity"}
                > \`•\` **Création :** <t:${Math.floor(message.guild.createdAt / 1000)}:f> (<t:${Math.floor(message.guild.createdAt / 1000)}:R>)
                **➔ Statistiques du serveur**
                > \`•\` **Membres :** ${message.guild.members.cache.size}
                > \`•\` **Bots :** ${membersGuild.filter(member => member.user.bot).size}
                > \`•\` **Boost :** ${message.guild.premiumSubscriptionCount}
                `)
                
            message.channel.send({ embeds: [embed] })

        }

    }
}