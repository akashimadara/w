const { Snake } = require("discord-gamecord")
const Discord = require("discord.js")

const db = require('quick.db')


module.exports = {
    name: 'snake',
    usage: 'snake',
     async execute(client, message, args,config,emote,footer,color) {

       


        new Snake({
            message: message,
            embed: {
                title: 'Snake',
                color: color,
                OverTitle: "Fin",
            },
            snake: { head: '🟢', body: '🟩', tail: '🟢' },
            emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️',
                right: '➡️',
                down: '⬇️',
                left: '⬅️',
            },
            othersMessage: 'Vous ne pouvez pas appuyer sur ces boutons',
        }).startGame()
    }
}