const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")


const pfp = new db.table("Pfp")

module.exports = {
    name: 'pfp',
    usage: 'pfp',
    category: "owner",
    description: `Permet d'activer le mode pfp`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
            if (message.mentions.channels.first() ||message.guild.channels.cache.get(args[0] || message.channelId) ) {

                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
                if (!channel) return message.channel.send({ content: "Aucun salon trouvé !" })
                await pfp.set(`${message.guild.id}.channelpfp`, channel.id)
                message.channel.send({ content: `Salon Pfps ${channel}!` })

            }

            if (args[0] === "off") {

                pfp.delete(`${message.guild.id}.channelpfp`);
                message.channel.send({ content: "Pfps stoppé !" })
            }
        
        }
    }
}