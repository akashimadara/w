const Discord = require("discord.js")
const db = require('quick.db')
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: 'prevname',
    usage: 'pv [user/stats]',
    description: `Permet d'afficher la liste des bots présent sur le serveur.`,
    async execute(client, message, args) {


        let templateEmbed = new MessageEmbed()

    if (args[0] == "clear") {
      let usernames = await db.get(`prevname_${message.author.id}`);
      if (!usernames) {
        templateEmbed.description = "`❌` Aucun ancien pseudo trouvé.";
        return message.reply({
          embeds: [templateEmbed]
        }).catch(err => {});
      }
      await db.delete(`prevname_${message.author.id}`);
      templateEmbed.setDescription(`\`✅\`${usernames.length} pseudo supprimés.`);
      return message.reply({
        embeds: [templateEmbed]
      }).catch(err => {})
    }

    if(args[0] == "stats") {

      let count = db.all().filter(data => data.ID.startsWith(`prevname_`)).length

      let pvembed = new Discord.MessageEmbed()
      .setTitle(`Stats prevnames de \`${client.user.username}\``)
      .setDescription(`\`${count}\` Utilisateurs enregistrés dans la db`)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
      .setColor("RANDOM")
      .setFooter({text: `${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 })})

      const button = new Discord.MessageButton()
                    .setLabel(`Inviter ${client.user.username}`)
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
                    .setEmoji('<:logs:1116440437855617074>')
                    .setStyle("LINK");
                    
                const row = new Discord.MessageActionRow().addComponents(button)

      return message.reply({embeds: [pvembed], components: [row]})
    }

        
            let membre = message.mentions.users.first() || client.users.cache.get(args[0]);
            if (!membre) try {
                membre = await client.users.fetch(args[0]);
            } catch (e) {
                membre = message.author;
            }
            const data = db.all().filter(data => data.ID.startsWith(`prevname_${membre.id}`)).sort((a, b) => b.data - a.data);
            const count = 15;
            let p0 = 0;
            let p1 = count;
            let page = 1;
    
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`Liste des anciens pseudo de ${membre.username}`)
                .setFooter({ text: `${page}/${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)}` })
                .setColor("#2f3136")
                .setDescription(data.slice(p0, p1).map((m, c) => `<t:${m.ID.split("_")[2]}>** - **${m.ID.split("/")[1]}`).join("\n") || "Aucune donnée trouvée");
            const msg = await message.reply({ content: `Chargement...`, allowedMentions: { repliedUser: false } });
    
            if (data.length > count) {
                const btn = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId(`prev1_${message.id}`)
                        .setLabel('◀')
                        .setStyle('PRIMARY'))
                    .addComponents(new Discord.MessageButton()
                        .setCustomId(`prev2_${message.id}`)
                        .setLabel('▶')
                        .setStyle('PRIMARY'));
                msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed], components: [btn] });
                setTimeout(() => {
                    message.delete();
                    return msg.delete();
                }, 60000 * 5);
    
                const collector = await msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 * 5 });
                collector.on("collect", async interaction => {
                    if (interaction.user.id !== message.author.id) return;
                    interaction.deferUpdate()
    
                    if (interaction.customId === `prev1_${message.id}`) {
                        if (p0 - count < 0) return;
                        if (p0 - count === undefined || p1 - count === undefined) return;
    
                        p0 = p0 - count;
                        p1 = p1 - count;
                        page = page - 1
    
                        embed.setFooter({ text: `${page} / ${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)}` }).setDescription(data.slice(p0, p1).map((m, c) => `**<t:${m.ID.split("_")[2]}>** - **${m.ID.split("_")[3]}**`).join("\n") || "Aucune donnée trouvée");
                        msg.edit({ embeds: [embed] });
                    }
                    if (interaction.customId === `prev2_${message.id}`) {
                        if (p1 + count > data.length + count) return;
                        if (p0 + count === undefined || p1 + count === undefined) return;
    
                        p0 = p0 + count;
                        p1 = p1 + count;
                        page++;
    
                        embed.setFooter({ text: `${page} / ${Math.ceil(data.length / count) === 0 ? 1 : Math.ceil(data.length / count)}` }).setDescription(data.slice(p0, p1).map((m, c) => `**<t:${m.ID.split("_")[2]}>** - **${m.ID.split("_")[3]}**`).join("\n") || "Aucune donnée trouvée");
                        msg.edit({ embeds: [embed] });
                    }
                })
            } else {
                msg.edit({ content: null, allowedMentions: { repliedUser: false }, embeds: [embed] })
        }
    }
}