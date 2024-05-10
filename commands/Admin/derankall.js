const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const alerte = new db.table("AlertePerm")




module.exports = {
    name: 'derankall',
    usage: 'derankall',
    description: `Permet de derank toutes les personnes ayant des permissions dangereuses sur le serveur`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
            const embedarray = []
            const perms = [
                "ADMINISTRATOR",
                "MANAGE_GUILD",
                "MANAGE_ROLES",
                "MANAGE_CHANNELS",
                "BAN_MEMBERS",
                "KICK_MEMBERS",
                "MANAGE_WEBHOOKS",
            ];
            let value = false
            try {
                message.guild.members.cache.map((m) => {


                    m.roles.cache.map((r) => {
                        if (r.managed) return;
                        if (r.id === r.guild.id) return;
                        if(r.id == message.guild.ownerId) return;
                        if (m.id === client.user.id) return;
                        perms.forEach((p) => {
                            if (r.permissions.has(p)) {
                                m.roles.remove(r.id)
                                embedarray.push(m.id)
                            } 
                        });
                    });
                });
                value = true
            } catch {
                value = false
            }
            if(embedarray.length > 10) {
              let msg =   message.channel.send(await paginateDeranked(1,[...new Set(embedarray)],color))
                const filter = (interaction) => interaction.user.id === message.author.id
                const collector = msg.createMessageComponentCollector({filter, time : 60000})
                collector.on("collect", async (i) => {
                    if(i.customId === "previous") {
                        i.deferUpdate()
                        i.message.edit(await paginateDeranked(currentPage - 1,embedarray,color))
                    }
                    if(i.customId === "next") {
                        i.deferUpdate()
                        i.message.edit(await paginateDeranked(currentPage + 1,embedarray,color))
                    }
                }
                )
                collector.on("end", () => {
                    let disabledComponents = msg.components.map(c => c.components.map(b => (b.disabled = true)))
                    msg.edit({components: disabledComponents})
                })
                return
            }
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Voici les personnes qui ont été derank")
                .setDescription(value ? `${embedarray.map(e => (`${message.guild.members.cache.get(e)} (ID: ${e})`)).join("\n")}` : "0 membres derank")
            if (value = true) message.channel.send({ embeds: [embed] }).catch(() => false)

            const channellogs = alerte.get(`${message.guild.id}.alerteperm`)
            let roleping = db.get(`role_${message.guild.id}`)
            if (roleping === null) roleping = "@everyone"

            const alert = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`${message.author.tag} à effectué un derank all`)
                .setDescription(`${emote.owner.abus} Toutes les personnes possédant des permissions **Dangereuses** ont étaient derank\n Executeur : <@${message.author.id}>`)
                .setTimestamp()
                .setFooter({ text: `⚠️ ${footer}` })
            const logchannel = client.channels.cache.get(channellogs)
            if (logchannel) logchannel.send({ content: `${roleping}`, embeds: [alert] }).catch(() => false)
        }
    }
}


function paginateDeranked(currentPage,data,color) {
    let admins = data

    let maxPage = Math.ceil(admins.length / 10)
    if (currentPage > maxPage) currentPage = maxPage
    if (currentPage < 1) currentPage = 1
    let index = (currentPage - 1) * 10
    let pages = admins.slice(index, index + 10)
    let str = pages.map(member => (`<${member}> (ID: ${member})`)).join("\n")


    return {
        content : null,
        embeds: [{
            title: `Liste des Utilisateurs ayant été derank`,
            description: str,
            footer: {
                text: `Page ${currentPage}/${maxPage}`
            },
            color: color


        }],
        components: [{
            type: 1,
            components: [
                {
                    type: 2,
                   emoji : {
                    id : "1112797981419241522"
                   },
                    style: 1,
                    disabled: currentPage === 1,
                    custom_id: "previous"
                },
                {
                    type: 2,
                    label : `${currentPage}/${maxPage}`,
                    style: 2,
                    disabled: true,
                    custom_id : "page"
                },
                {
                    type: 2,
                    emoji : {
                        id : "1112797983008891042"
                    },
                    style: 1,
                    custom_id: "next",
                    disabled: currentPage === maxPage
                }
            ]
        }]
    }
    
}