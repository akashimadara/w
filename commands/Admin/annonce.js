const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")


module.exports = {
    name: 'annonce',
    usage: 'annonce',
    description: `Permet de faire une annonce de l'administration.`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
            message.delete().catch(e=>  null)

            if (!args.join(" ")) return message.reply("Rentrez votre message !");


            let embed = new Discord.MessageEmbed()

                .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024, }))
                .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                .setColor(color)
                .setDescription(`**Message de l'administration :** \n \`\`\`\n${args.join(" ")}\n\`\`\``)
            message.channel.send({ content: '@everyone', embeds: [embed] })
        }
    }
}