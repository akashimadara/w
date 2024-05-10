const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const ownercount = new db.table("Ownercount")
const cl = new db.table("Color")
 const config = require("../../config.js")
const footer = config.app.footer

module.exports = {
    name: 'close',
    usage: 'close [#channel]',
    description: `Permet de supprimer un salon.`,
    async execute(client, message, args) {

        let own = message.guild.ownerId

        if (message.member.permissions.has("ADMINISTRATOR") || own === message.author.id || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

           if(args[0]) {
            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);

            newChannel.delete()
                } else if (!args[0]) {

                    message.channel.delete()
                }

            }
        }
    }
