const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")

const cl = new db.table("Color")
const ml = new db.table("modlog")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'clear',
    usage: 'clear',
    description: `Permet de supprimer des messages`,
     async execute(client, message, args,config,emote,footer,color) {
        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if (message.mentions.members.first()) {
            let number = args[1] || 99;
            if(number > 99) return message.channel.send({ content: "Vous ne pouvez pas supprimer plus de 99 messages" })
            


            if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true)

                message.delete()
            message.channel.messages.fetch({ limit: 99 })
                .then(async (messages) => {
                    var filterUser = message.mentions.members.first().id;
                    var filtered = [...messages.filter(m => m.author.id === filterUser).values()].slice(0, number);
                  await   message.channel.bulkDelete(filtered, true).catch(() => false);
                    message.channel.send({ content: `J'ai supprimé ${args[1]} messages de <@${message.mentions.members.first().id}>` }).then(m => setTimeout(() => m.delete().catch(() => null), 5000))

                }).catch(() => false);

        }
             else  {
                if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {
                   let number = args[0]
                   if(!number) return message.channel.send({ content: "Merci de spécifier un nombre de messages à supprimer" })
                   if(isNaN(parseInt(number))) return message.channel.send({ content: "Merci de spécifier un nombre de messages à supprimer" })
                     if(number > 99) return message.channel.send({ content: "Vous ne pouvez pas supprimer plus de 99 messages" })
                    message.delete()
                  let msg = await   message.channel.messages.fetch({ limit: 99 })
                  await message.channel.bulkDelete(msg, true).catch(() => false);
                  message.channel.send({ content: `J'ai supprimé ${args[0]} messages` }).then(m => setTimeout(() => m.delete().catch(() => null), 5000))
                }

                
        
                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`<@${message.author.id}> a \`clear\` ${args[0]} message dans <#${message.channel.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `📚` })
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

            } 
    }
}