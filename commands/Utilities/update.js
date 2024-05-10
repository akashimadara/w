

module.exports = {
    name: 'update',
    usage: 'uc',
    description: `Permet d'afficher le derniers message supprimé sur le serveur`,
     async execute(oldClient, message) {
        oldClient.destroy()
        client.login(config.app.token)
    }
}
