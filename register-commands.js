require('dotenv').config()
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js')

const commands = [
    
];

const rest = new REST({ version: '10'}).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log('registering Slash commands...')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Slash commands registered')
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();