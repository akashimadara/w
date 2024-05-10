const Discord = require("discord.js")



module.exports = {
    name: 'gunfight',
    usage: 'gunfight',
    description: `jeux`,
     async execute(client, message, args,config,emote,footer,color) {

        const opponent = message.mentions.users.first();
        if(!opponent) return message.channel.send({ content: `Merci de mentionner la personne avec qui vous voulez jouer` })
        if(opponent.bot) return message.channel.send({ content: `Vous ne pouvez pas jouer avec un bot` })
        if(opponent.id === message.author.id) return message.channel.send({ content: `Vous ne pouvez pas jouer avec vous même` })
        let components = {
            type: 1,
            components: [
                {
                    type: 2,
                    label: 'Accepter',
                    custom_id: 'accept',
                    style: 'SUCCESS',
                },
                {
                    type: 2,
                    label: 'Refuser',
                    custom_id: 'deny',
                    style: 'DANGER',
                },
            ],

        }
        message.channel.send({ content: `${opponent}, voulez-vous jouer à un duel avec **${message.author.username}** ?`,components : [components] }).then(msg => {
            const filter = (button) => button.user.id === opponent.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 60000, max: 1 });
            collector.on('collect', async button => {
                if(button.customId === 'accept') {
                    button.deferUpdate();
                    msg.delete();
                    await gunfight(message, opponent);
                }
                if(button.customId === 'deny') {
                    button.deferUpdate();
                    msg.delete();
                    message.channel.send({ content: `**${opponent.username}** a refusé le duel` });
                }
            });
            collector.on('end', collected => {
                if(collected.size === 0) {
                    message.channel.send({ content: `**${opponent.username}** n'a pas répondu au duel` });
                }
            });
        });

      


}
}

async  function gunfight(message, opponent) {
            
    const positions = {
        three: '_ _        :levitate: :point_right:      **3**        :point_left: :levitate:',
        two: '_ _        :levitate: :point_right:      **2**        :point_left: :levitate:',
        one: '_ _        :levitate: :point_right:      **1**        :point_left: :levitate:',
        go: '_ _        :levitate: :point_right:      **GO!**        :point_left: :levitate:',
        ended1: '_ _     :levitate: :point_right:      **STOP!**        :skull_crossbones: :levitate:',
        ended2: '_ _     :levitate: :skull_crossbones:      **STOP!**        :point_left: :levitate:',
    };

    const componentsArray = [
        {
            type: 1,
            components: [
                {
                    type: 2,
                    label: 'Shoot!',
                    custom_id: 'shoot1',
                    style: 'PRIMARY',
                    disabled: true,
                },
                {
                    type: 2,
                    label: '\u200b',
                    custom_id: 'id lol useless',
                    style: 'SECONDARY',
                    disabled: true,
                },
                {
                    type: 2,
                    label: 'Shoot!',
                    custom_id: 'shoot2',
                    style: 'DANGER',
                    disabled: true,
                },
            ],
        },
    ];

    const msg = await message.channel.send({
        content: positions.three,
        components: componentsArray,
    });

    function countdown() {
        setTimeout(() => {
            msg.edit({
                content: positions.two,
                components: componentsArray,
            });
        }, 1000);
        setTimeout(() => {
            msg.edit({
                content: positions.one,
                components: componentsArray,
            });
        }, 2000);
        setTimeout(() => {
            componentsArray[0].components[0].disabled = false;
            componentsArray[0].components[2].disabled = false;
            msg.edit({
                content: positions.go,
                components: componentsArray,
            });
        }, 3000);
    }
    countdown();

    const filter = button => [message.author.id,opponent.id].includes(button.user.id);

    const button = await msg.createMessageComponentCollector({ filter: filter, componentType: 'BUTTON' });
      button.on('collect', async button => {
        
        
    componentsArray[0].components[0].disabled = true;
    componentsArray[0].components[2].disabled = true;
     
    if (button.customId === 'shoot1' && button.user.id == message.author.id) {
        msg.edit({
            content: positions.ended1,
            components: componentsArray,
        });
        return button.reply({ content: `<@${message.author.id}> a gagné !` });
    }
    else if (button.customId === 'shoot2' && button.user.id == opponent.id) {
        msg.edit({
            content: positions.ended1,
            components: componentsArray,
        });
        return button.reply({ content: `<@${opponent.id}> à gagné!` });
    }
})
}