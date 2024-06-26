const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')

const owner = new db.table("Owner")
const cl = new db.table("Color")
const ml = new db.table("modlog")
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")



module.exports = {
    name: 'voicemute',
    usage: 'voicemute <@>',
    description: `Permet de mute vocal un membre sur le serveur.`,
    async execute(client, message, args, config, emote, footer, color) {

        const perm1 = p1.fetch(`perm1_${message.guild.id}`)
        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {


            const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(!muteUser) return message.channel.send("Veuillez mentionner un utilisateur !");
            if (muteUser.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous mute vous même !")
            if (muteUser.id === client.user.id) return message.channel.send("Vous ne pouvez pas mute le bot !")
            if (muteUser.id === message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute le propriétaire du serveur !")
            if (muteUser.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Vous ne pouvez pas mute un membre plus haut gradé que vous !")
           
            if (owner.get(`owners.${muteUser.id}`) || config.app.owners.includes(muteUser.id) || config.app.funny.includes(muteUser.id) === true)
             return  message.reply("Tu ne peux pas le voicemute !")
             if(!muteUser.voice.channel) return message.channel.send("Le membre n'est pas dans un salon vocal ou est déjà mute vocal.")

            const muteReason = args.join(" ").slice(23);

            if (muteUser.voice.serverMute) {
                return message.channel
                    .send("Le membre n'est pas dans un salon vocal ou est déjà mute vocal.")
            }

            try {
                muteUser.voice.setMute(true, "muteReason");
            } catch (err) {
                console.error(err);
                message
                    .reply("Je n'ai pas pu désactiver le son de cet utilisateur, veuillez vérifier mes permissions et réessayer.\n" + err)
            }

            try {
                muteUser.user.send(
                    `Vous avez été **Mute** sur **${message.guild.name}**, Raison: **${muteReason || "Aucune"}**.`
                );
            } catch (err) {
                console.err(err);
                message.reply("Impossible d'envoyer un message privé à ce membre...").then((m) => setTimeout(() => m.delete(), 10000));
            }

            message.channel.send(
                `**${muteUser.user.tag}** a été mute avec succès sur le serveur. Raison: **${muteReason || "Aucune"
                }**. `
            )

            
    
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`voicemute\` ${muteUser}\nRaison: ${muteReason}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

        }
    }
}