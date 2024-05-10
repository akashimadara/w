const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'reportbug',
    usage: 'reportbug <text>',
    description: `Envoie un bug du bot`,
    async execute(client, message, args) {
        
                if(!args[0]) return message.reply("specifiez un msg")

                
                const embeds = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag}`)
                .setDescription(`${args[0]}`)
                .setColor("RANDOM")
                .setTimestamp()
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
                .setFooter({text: "bug report"})
                client.users.cache.get("880376950647054397").send({embeds: [embeds]}).catch(()=> false) 
        }
   }
