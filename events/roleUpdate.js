const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const wl = new db.table("Whitelist")
const aru = new db.table("antiroleupdate")
const ad = new db.table("Antidown")
const alerte = new db.table("AlertePerm")
const cl = new db.table("Color")
const config = require('../config')

module.exports = {
    name: 'roleUpdate',
    once: false,

    async execute(client, oldRole, newRole) {

        let roleping = db.get(`role_${oldRole.guild.id}`)
        if (roleping === null) roleping = "@everyone"

        let color = cl.fetch(`color_${oldRole.guild.id}`)

        if (ad.fetch(`config.${oldRole.guild.id}.antidown`) === true) {

            if (oldRole.rawPosition !== newRole.rawPosition) {
                const roles = oldRole.guild.roles.cache.filter(role => role.permissions.any('MANAGE_ROLES', "ADMINISTRATOR"))
                roles.forEach(role => role.setPermissions(role.permissions.remove(["MANAGE_ROLES", "ADMINISTRATOR"])))

                const embed = new Discord.MessageEmbed()
                    .setTitle('Potentiel Down Détécté')
                    .setDescription(`Le role ${newRole.name} a été déplacé de la position ${oldRole.rawPosition} à ${newRole.rawPosition}\nJ'ai désactiver les permissions __administrateur__ et __role__`)
                    .setColor(color)

                const channel = client.channels.cache.get(alerte.get(`${oldRole.guild.id}.alerteperm`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)
            }
        }


        const audit = await oldRole.guild.fetchAuditLogs({type: "ROLE_UPDATE"}).then((audit) => audit.entries.first())
        if(!audit) return;
        if(audit?.executor?.id === client.user.id) return;
        if(oldRole.managed) return;
        let isOn = await aru.fetch(`config.${oldRole.guild.id}.antiroleupdate`)

        if (isOn == true) {

            if (audit?.executor?.id == oldRole?.guild?.ownerId) return

            if (oldRole.guild.ownerId == audit.executor.id ||owner.get(`owners.${audit.executor.id}`) || wl.get(`${oldRole.guild.id}.${audit.executor.id}.wl`) || config.app.owners.includes(audit.executor.id) || client.user.id === audit.executor.id === true) return
            
            if (audit.action == 'ROLE_UPDATE') {

                try {
                    if (oldRole.name !== newRole.name) newRole.setName(oldRole.name).catch(() => false)
                    if (oldRole.hexColor !== newRole.hexColor) newRole.setColor(oldRole.hexColor).catch(() => false)
                    if (oldRole.permissions !== newRole.peermissions) newRole.setPermissions(oldRole.permissions).catch(() => false)
                    if (oldRole.hoist !== newRole.hoist) newRole.setHoist(oldRole.hoist).catch(() => false)
                    if (oldRole.mentionable !== newRole.mentionable) newRole.setMentionable(oldRole.mentionable).catch(() => false)
                    if (oldRole.rawPosition !== newRole.rawPosition) newRole.setPosition(oldRole.rawPosition).catch(() => false)
                } catch(e){

                }

                if (punish.get(`sanction_${oldRole.guild.id}`) === "ban") {
                    oldRole.guild.members.ban(audit.executor.id, { reason: `Antirole Update` }).catch(() => false)

                } else if (punish.get(`sanction_${oldRole.guild.id}`) === "derank") {

                    oldRole.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            oldRole.guild.members.resolve(audit.executor).roles.remove(role).catch(() => false)
                        }
                    })

                } else if (punish.get(`sanction_${oldRole.guild.id}`) === "kick") {

                    oldRole.guild.members.kick(audit.executor.id, { reason: `Antirole Update` }).catch(() => false)
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`modifié un role\`, il a été sanctionné`)
                    .setTimestamp()
                const channel = client.channels.cache.get(rlog.fetch(`${oldRole.guild.id}.raidlog`))
                if (channel) channel.send({ embeds: [embed] }).catch(() => false)
            }
        }
    }
}