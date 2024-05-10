const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const wl = new db.table("Whitelist")
const atr = new db.table("antirolecreate")
const config = require('../config')

module.exports = {
    name: 'roleCreate',
    once: false,

    async execute(client, role) {

        const audit = await role.guild.fetchAuditLogs({type: "ROLE_CREATE"}).then((audit) => audit.entries.first())
        if(!audit) return;
        if(audit?.executor?.id === client.user.id) return;
        if(role.managed) return;

        if (atr.fetch(`config.${role.guild.id}.antirolecreate`) == true) {

            if (role.guild.ownerId == audit.executor.id || owner.get(`owners.${audit.executor.id}`) || wl.get(`${role.guild.id}.${audit.executor.id}.wl`) || config.app.owners.includes(audit.executor.id) || client.user.id === audit.executor) return

            if (audit.action == 'ROLE_CREATE') {

                role.delete().catch(() => false)

                if (punish.get(`sanction_${role.guild.id}`) === "ban") {
                    role.guild.members.ban(audit.executor.id, { reason: `Antirole Create` }).catch(() => false)

                } else if (punish.get(`sanction_${role.guild.id}`) === "derank") {

                    role.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            role.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {

                    role.guild.members.kick(audit.executor.id, { reason: `Antirole Create` }).catch(() => false)
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`créer un role\`, il a été sanctionné`)
                    .setTimestamp()
                let channel =  client.channels.cache.get(rlog.fetch(`${role.guild.id}.raidlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)

            }
        }
    }
}