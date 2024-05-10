const Discord = require("discord.js")

const db = require('quick.db')
const owner = new db.table("Owner")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'unban',
    usage: 'unban',
    description: `Permet de unban`,
     async execute(client, message, args,config,emote,footer,color) {

        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            const user = args[0]

            const bans = await message.guild.bans.fetch()

            const isBanned = bans.has(user)
            if (!isBanned)
                return message.reply(`Le membre n'est pas banni`)

            message.guild.bans.remove(user)
            message.reply(`<@${user}> a été unban`)

        }
    }

}