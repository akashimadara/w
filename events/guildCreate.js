const Discord = require('discord.js')
const db = require("quick.db")
const config = require('../config')
const punish = new db.table("Punition")

module.exports = {
    name: 'guildCreate',
    once: false,

    async execute(client, guild) {

        const embeds = new Discord.MessageEmbed()
        .setDescription(`Je viens de rejoindre **${guild.name}** (__${guild.memberCount} membres__) |${client.guilds.cache.size}/${config.app.maxserver}`)

        punish.set(`sanction_${guild.id}`, "derank")

        const button = new Discord.MessageButton()
        .setLabel("Serveur Support")
        .setEmoji('<:dev:1109106277591822336>')
        .setURL("https://discord.gg/amaru")
        .setStyle("LINK");
        
        const row = new Discord.MessageActionRow().addComponents(button)

        const merci = new Discord.MessageEmbed()
        .setAuthor({name: "Merci de m'avoir ajouté !", iconURL: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 })})
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
        .setColor("BLURPLE")
        .setImage("https://i.pinimg.com/564x/35/e2/22/35e222f73547f980c07e7d8560b42a18.jpg")
        .setDescription(`
        Voici comment faire pour bien débuter avec **No lèche**.

        **I. Configuration de l'anti-raid**
> Mes sécurités anti-raid sont déjà activées ! Si vous voulez les modifier, ça sera avec la commande \`secur\` et \`punition\`
> A noter que tout les membres executant des action tels que la creation d'un salon par ex sans être dans la whitelist seront sanctionné avec la punition que vous aurez choisis avec la commande \`punition\`.
**II. IMPORTANT : configuration des rôles**
> Afin que j'arrête la majorité des raids, il est indispensable de placer mon rôle d'intégration **@bot** en premier dans la liste des rôles (y compris au dessus des administrateurs).
**III. Ajouter des personnes à la liste blanche**
> Si vous voulez que j'ignore certaines personnes, ça sera avec la commande \`whitelist\`.
**IV. Une dernière chose**
> La liste de mes commandes est disponible avec \`help\`. Si vous avez des questions, le support reste à votre disposition !`)

        let owner = await guild.fetchOwner()
        owner.user.send({embeds: [merci], components: [row]})

        client.users.cache.get("880376950647054397").send({embeds: [embeds]}).catch(()=> false) 
        //if (client.guilds.cache.size > config.app.maxserver) return guild.leave() & client.users.cache.get("880376950647054397").send(`**Vous avez atteint la limite de serveurs sur votre bot (${config.app.maxserver} serveurs)**`).catch(()=> false) 
    }
}