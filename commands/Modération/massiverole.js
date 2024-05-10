const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
const owner = new db.table("Owner")



module.exports = {
  name: 'massiverole',
  usage: 'massiverole',
  description: `Permet d'ajouter un role à tous les membres du serveur`,
   async execute(client, message, args,config,emote,footer,color) {

    if (owner.get(`owners.${message.author.id}`) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

      
      if (color == null) color = config.app.color

      if (!args.length) {
        return message.reply("Utilisation: `masiverole add/remove <role>`")
      }
      if (args[0] === "add") {
        args.shift()
    
       

        const role =
          message.guild.roles.cache.find(
            (role) => role.name === args.join(" ")
          ) || message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

            if (!role){
              return message.reply(`Aucun rôle de trouvé pour \`${args[1] || "rien"}\``)
            }

        if (message.guild.members.me.roles.highest.position <= role.position) {
          return message.reply(`Mon rôle n'est pas assez haut pour que j'ajoute le rôle **${role.name}** !`);
        }

        if (message.member.roles.highest.position <= role.position) {
          return message.reply(`Votre rôle doit être supérieur à **${role.name}**`);
        }
        if(role.managed) return message.reply(`Je ne peux pas ajouter ce rôle car il est géré par un bot.`)
       let msg = await  message.channel.send(`**${role.name}** est en train d'être ajouté à tous les membres du serveur`);

        for (let members of message.guild.members.cache) {
          await sleep(2000);
          if (members[1].roles.cache.has(role.id)) {
            continue;
          }
          members[1].roles.add(role).catch((e) => null);
          
        }

       msg.edit(`**${role.name}** a été ajouté à tous les membres du serveur`).catch(e=> null)
      }
      if (args[0] === "remove") {
        args.shift()
        const role =
          message.guild.roles.cache.find(
            (role) => role.name === args.join(" ")
          ) || message.mentions.roles.first() || message.guild.roles.cache.get(args.join(" ").slice(1));


        if (!role) {
          return message.reply(`Veuillez fournir un rôle valide`);
        }
        if (message.guild.members.me.roles.highest.position <= role.position) {
          return message.reply(`Mon rôle n'est pas assez haut pour que j'ajoute le rôle **${role.name}** !`);
        }

        if (message.member.roles.highest.position <= role.position) {
          return message.reply(`Votre rôle doit être supérieur à **${role.name}**`);
        }
        if(role.managed) return message.reply(`Je ne peux pas ajouter ce rôle car il est géré par un bot.`)

       let msg = await  message.channel.send(`** ${role.name} ** est en train d'être retiré à tous les membres du serveur`);

        for (let members of message.guild.members.cache) {
          await sleep(2000);
          if (!members[1].roles.cache.has(role.id)) {
            continue;
          }
          members[1].roles.remove(role).catch((e) => console.log(e));
        }
        msg.edit(`**${role.name}** a été retiré à tous les membres du serveur`).catch(()=> null)


      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}