const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")

const cl = new db.table("Color")
const ms = require('ms')


module.exports = {
    name: 'unbanall',
    usage: 'unbanall',
    description: `Permet d'unban toutes les personnes du serveur.`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
            message.channel.send({ content: `${emote.utilitaire.loading} Unban all en cours merci de patienter` }).then(async msg => {
                message.guild.bans.fetch().then(bans => {
                    if (bans.size == 0) { msg.edit({ content: "Aucun utilistateur banni" }) };
                    bans.forEach(ban => {
                        message.guild.members.unban(ban.user.id).catch(e=> {})
                    })
                })
                msg.edit({ content: ` Unban all effectué avec succès` })

            })
        }
    }
}






