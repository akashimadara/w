const Discord = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: 'count',
    aliases: 'cont',
    description: `Afficher le nombre de salons.`,
    async execute(client, message, args) {
        
        message.channel.send(`${message.guild.channels.cache.size} channels`)
        }
    }
