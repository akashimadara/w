const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const p = new db.table("Prefix")



module.exports = {
    name: 'catsay',
    usage: 'catsay',
    description: `jeux`,
     async execute(client, message, args,config,emote,footer,color) {

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px

        message.delete()

        const msg = args.join(" ")
        if (!msg) {
            return message.channel.send("Faut indiquer un message ")
        }
        message.channel.send({
            files: [
                {
                    attachment: `https://cataas.com/cat/cute/says/${msg}`,
                    name: "catsay.png",
                }
            ]
        })
    }
}