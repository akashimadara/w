const Discord = require("discord.js")

module.exports = {
    name: 'find',
    usage: 'find',
    description: `Permet de chercher un membre en vocal dans le serveur`,
     async execute(client, message, args,config,emote,footer,color) {

        

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let vc = member.voice.channel

        if (vc) {

            let embedvc = new Discord.MessageEmbed()
            .setTitle("Recherche vocal")
            .setColor(color)
            .setDescription(`${member} est dans le salon vocal ${vc}`)

            message.channel.send({ embeds: [embedvc] })

        } else if (!vc) {

            let embedvc = new Discord.MessageEmbed()
            .setTitle("Recherche vocal")
            .setColor(color)
            .setDescription(`${member} n'est pas en vocal`)

            message.channel.send({ embeds: [embedvc] })
        }
    }
}