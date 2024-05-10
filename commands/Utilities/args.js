const Discord = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: 'arguments',
    aliases: 'args',
    description: `Afficher les arguments de quelqu'un.`,
    async execute(client, message, args) {
        
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
                    { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Clyde`', inline: true },
                    { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`, inline: true },
                    { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Clyde#0000`', inline: true },
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

            message.channel.send({ embeds: [embed] })
                
        }
    }
