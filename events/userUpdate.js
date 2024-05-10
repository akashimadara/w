const db = require('quick.db')

module.exports = {
    name: 'userUpdate',
    once: false,

    async execute(client, oldUser, newUser) {

        if (oldUser.username !== newUser.username) {
            db.set(`prevname_${oldUser.id}_${parseInt(new Date() / 1000)}/${oldUser.tag}`, true);
            console.log(`${oldUser.tag} => ${newUser.tag}`);
        }
    }
}
