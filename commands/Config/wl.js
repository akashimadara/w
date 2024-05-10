const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const wl = new db.table("Whitelist")
const wlcount = new db.table("Wlcount")
const cl = new db.table("Color")



module.exports = {
    name: 'wl',
    usage: 'wl',
    category: "owner",
    description: `Permet de gérer la wl du bot.`,
     async execute(client, message, args,config,emote,footer,color) {

        if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            
          
            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                if (wl.get(`${message.guild.id}.${member.id}.wl`) === member.id) {
                    return message.channel.send({ content: `__${member.username}__ est déjà whitelist` })
                } else {
                    wl.set(`${message.guild.id}.${member.id}.wl`, member.id)
                    message.channel.send({ content: `__${member.username}__ est désormais whitelist` })
                }


            } else if (!args[0]) {

                let list = [...message.guild.members.cache.filter(u => wl.get(`${message.guild.id}.${u.id}.wl`) === u.id).values()]
                if(list.length > 10) {
                    let msg =await  message.channel.send(await paginateAdmins(1,list,color))
                    const filter = (interaction) => interaction.user.id === message.author.id
                const collector = msg.createMessageComponentCollector({ filter, time: 60000 })
                collector.on("collect", async (interaction) => {
                    if (interaction.customId === "previous") {
                        await interaction.deferUpdate()
                        await msg.edit(await paginateAdmins(parseInt(interaction.message.components[0].components[1].label.split("/")[0])- 1,list,color))
                    } else if (interaction.customId === "next") {
                        await interaction.deferUpdate()
                        await msg.edit(await paginateAdmins(parseInt(interaction.message.components[0].components[1].label.split("/")[0])+ 1,list,color))
                    }
                })
                collector.on("end", async () => {
                   let disabledComponents = msg.components[0].components.map(component => {
                        component.disabled = true
                        return component
                    })
                    msg.edit({
                        embeds: msg.embeds,
                        components: [{
                            type: 1,
                            components: disabledComponents
                        }]
                    })
                })


                return;
            }


                const embed = new Discord.MessageEmbed()
                    .setTitle("Liste des whitelist")
                    .setDescription(list.join("\n"))
                    .setColor(color)
                    .setFooter({ text: `${footer}` })
                message.channel.send({ embeds: [embed] })

            }
        }
    }

}



async function paginateAdmins(currentPage,data,color) {
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
            title: `Liste des Whitelist`,
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