require('dotenv').config()

const { Client, IntentsBitField, InteractionType } = require('discord.js')
const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
]})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) {
        return
    }

    
})

client.login(process.env.BOT_TOKEN)