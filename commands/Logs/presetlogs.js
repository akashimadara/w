const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const serveur = new db.table("serveur")
const msglog = new db.table("msglog")
const modlog = new db.table("modlog")
const ticketlog = new db.table("ticketlog")
const membrelog = new db.table("membrelog")
const voicelog = new db.table("voicelog")




module.exports = {
    name: 'presetlogs',
    usage: 'presetlogs',
    description: `Permet de créer automatiquement la catégorie des logs.`,
     async execute(client, message, args,config,emote,footer,color) {

        let own = message.guild.ownerId

        if (own === message.author.id || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) || wl.get(`${message.guild.id}.${message.member.id}.wl`) || message.author.permissions.has('ADMINISTRATOR')) {
    
            message.channel.send(`${emote.administration.loading} Création de la **catégorie des logs** en cours...`).then(async msge => {
                message.guild.channels.create('LOGS', {
                    type: 'GUILD_CATEGORY',
                    permissionsOverwrites: [{
                        id: message.guild.id,
                        deny: ['VIEW_CHANNEL']
                    }]
                }).then(c => {
                    
                    c.guild.channels.create(`logs-joins`, {
                        type: "GUILD_TEXT",
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        membrelog.set(`${message.guild.id}.membrelogs`, logs.id)
                    })
                    c.guild.channels.create(`logs-messages`, {
                        type: "GUILD_TEXT",
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        msglog.set(`${message.guild.id}.messagelog`, logs.id)
                    })
                    c.guild.channels.create(`logs-modération`, {
                        type: "GUILD_TEXT",
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        modlog.set(`${message.guild.id}.modlog`, logs.id)
                    })
                    c.guild.channels.create(`logs-serveur`, {
                        type: "GUILD_TEXT",
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        serveur.set(`${message.guild.id}.serveur`, logs.id)
                    })

                    c.guild.channels.create(`logs-voice`, {
                        type: "GUILD_TEXT",
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        voicelog.set(`${message.guild.id}.ticketlogs`, logs.id)
                    })

                    c.guild.channels.create(`logs-ticket`, {
                        type: "GUILD_TEXT",
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                        ],
                    }).then(logs => {
                        ticketlog.set(`${message.guild.id}.ticketlog`, logs.id)
                    }).then(msge.edit(`${emote.buyer.valid} Création de la **catégorie des logs** effectué avec succès.`))

                }
                )
            }
            )
        }
    }
}