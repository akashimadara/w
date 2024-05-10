const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const wl = new db.table("Whitelist")
const wlcount = new db.table("Wlcount")
const cl = new db.table("Color")



module.exports = {
    name: 'unwl',
    usage: 'unwl',
    category: "owner",
    description: `Permet de gérer la wl du bot.`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
                if (!wl.get(`${message.guild.id}.${member.id}.wl`) === member.id) {
                    return message.channel.send({ content: `__${member.username}__ n'est pas whitelist` })
                } else {
                    wl.delete(`${message.guild.id}.${member.id}.wl`)
                    message.channel.send({ content: `**__${member.username}__** n'est plus whitelist` })
                }
            }
        }
    }
}