const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")

const cl = new db.table("Color")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")

module.exports = {
    name: 'rlist',
    usage: 'rlist',
    description: `Permet d'afficher la liste des membres ayant un rôle dangereux `,
     async execute(client, message, args,config,emote,footer,color) {

        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
    
            var str_filtrer = [...message.guild.members.cache.filter(member => member.permissions.has("MANAGE_ROLES") && !member.user.bot ).values()]
            if(str_filtrer.length > 10) {
                const msg = await message.channel.send(await paginateRoles(1,str_filtrer,color))
                const filter = (interaction) => interaction.user.id === message.author.id
                const collector = msg.createMessageComponentCollector({ filter, time: 60000 })
                collector.on("collect", async (interaction) => {
                    if (interaction.customId === "previous") {
                        await interaction.deferUpdate()
                        await msg.edit(await paginateRoles(parseInt(interaction.message.components[0].components[1].label.split("/")[0])- 1,str_filtrer,color))
                    }
                    if (interaction.customId === "next") {
                        await interaction.deferUpdate()
                        await msg.edit(await paginateRoles(parseInt(interaction.message.components[0].components[1].label.split("/")[0])+1,str_filtrer,color))
                    }
                })
            } else {


            const embed = new Discord.MessageEmbed()
                    .setTitle(`Liste des membres ayant un rôle dangereux`)
                    .setDescription(`${str_filtrer.map(member => (`${member.user.tag} (ID: ${member.id})`)).join("\n")}`)
                    .setFooter({ text: `Total: ${str_filtrer.length}` })
                    .setColor(color)
                message.channel.send({ embeds: [embed] })
        }
    }
    }
}


function paginateRoles(currentPage,data,color) {
    let admins = data

    let maxPage = Math.ceil(admins.length / 10)
    if (currentPage > maxPage) currentPage = maxPage
    if (currentPage < 1) currentPage = 1
    let index = (currentPage - 1) * 10
    let pages = admins.slice(index, index + 10)
    let str = pages.map(member => (`${member.user.tag} (ID: ${member.id})`)).join("\n")


    return {
        content : null,
        embeds: [{
            title: `Liste des membres ayant un rôle dangereux`,
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