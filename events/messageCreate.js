const db = require("quick.db")
const config = require('../config')
const emote = require("../emotes.json")
const footer = config.app.footer
const p = new db.table("Prefix")

module.exports = {
    name: "messageCreate",

    async execute(client, message) {

        if (message.author.bot) return
        if (message.channel.type == "DM") return

        let pf = p.fetch(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.app.px
        const color = db.get(`color_${message.guild.id}`) || config.app.color

        const args = message.content.slice(pf.length).trim().split(' ')
        const commandName = args.shift().toLowerCase()
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

        if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
            message.channel.send(`Mon prefix sur le serveur est : \`${pf}\``)

        if (!message.content.startsWith(pf) || message.author.bot) return;
        if (!command) return

        //if(message.content === badword)

        try {
            command.execute(client, message, args, config, emote, footer, color)

        } catch (error) {
            message.channel.send({ content: `Erreur dans l'exécution du code.` }).catch(() => false)
        }
    }
}