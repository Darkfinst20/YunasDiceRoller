require('dotenv').config()

const { registerCommands } = require('./register-commands.js')
const db = require('./database.js')
const commandExecuter = require('./commandExecuter.js')
const { Client, IntentsBitField, InteractionType } = require('discord.js')
const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
]})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    registerCommands()
})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) {
        return
    }

    commandExecuter.execCommand(interaction)
})

client.login(process.env.BOT_TOKEN)