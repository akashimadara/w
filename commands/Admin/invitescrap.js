const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const db = require('quick.db')
const Discord = require("discord.js")
const owner = new db.table("Owner")
const cl = new db.table("Color")


module.exports = {
    name: 'invitescrap',
    usage: 'invite <invite>',
    description: `Permet de recevoir des infos avec une invite`,
    /**
     * 
     * @param {Discord.Client} client 
     * @param {*} message 
     * @param {*} args 
     * @param {*} config 
     * @param {*} emote 
     * @param {*} footer 
     * @param {*} color 
     * @returns 
     */
     async execute(client, message, args,config,emote,footer,color) {

    
            let invite = args[0]
            if(!invite) return message.reply("Rentrez une invite !")
            let inviteInfo = await client.fetchInvite(invite)
            const verifLevels = {
                NONE: "Aucune", 
                LOW: "faible",
                MEDIUM: "Moyen",
                HIGH: "Élevé",
                VERY_HIGH: "Maximum",
            }
                  
            let embed = new Discord.MessageEmbed()
            .setThumbnail(inviteInfo.guild.iconURL({ dynamic: true, size: 1024, }))
            .setImage(inviteInfo.guild.bannerURL({ dynamic: true, size: 512 }))
            .setColor("RANDOM")
            .setTitle(`Info Serveur : ${inviteInfo.guild.name}`)
            .setDescription(`
            **➔ Informations sur le serveur**
            > \`•\` **Nom :** ${inviteInfo.guild.name}
            > \`•\` **Description :** ${inviteInfo.guild.description || "Aucune description"}
            > \`•\` **ID :** ${inviteInfo.guild.id}
            > \`•\` **Vanity :** ${inviteInfo.guild.vanityURLCode || "n'a pas de vanity"}
            > \`•\` **Créer le :** <t:${Math.floor(inviteInfo.guild.createdAt / 1000)}:f>
            > \`•\` **Boost :** ${inviteInfo.guild.premiumSubscriptionCount}
            > \`•\` **Niveau de verif :** ${verifLevels[inviteInfo.guild.verificationLevel]}
            `)
            .setTimestamp()
            .setFooter({ text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true, size: 512}) });

            message.channel.send({embeds: [embed]})
        
    }
}