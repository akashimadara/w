const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")

const fs = require('fs')
const moment = require('moment')

const links = [
    'discord.gg',
    'dsc.bio',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg'
]


module.exports = {
    name: 'snipe',
    usage: 'snipe',
    description: `Permet d'afficher le derniers message supprimé sur le serveur`,
     async execute(client, message, args,config,emote,footer,color) {

        

        let isLinkall = false

        const msg = client.snipes.get(message.channel.id)
        if (!msg) return message.channel.send("Aucun message n'a été supprimer récemment !")

        const embed = new Discord.MessageEmbed()
            .setAuthor({name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
            .setDescription(`${msg.content}`)
            .setColor("BLURPLE")
            .setTimestamp()
        if (msg.image) embed.setImage(msg.image)

        message.channel.send({ embeds: [embed] })
    }
}
