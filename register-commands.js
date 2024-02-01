require('dotenv').config()
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js')

const commands = [
    {
        name: 'getcharacter',
        description: 'Get all or a certain characters stats',
        options: [
            {
                name: 'name',
                description: 'Character Name',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ]
    },
    {
        name: 'createcharacter',
        description: 'Creates a new Charcter',
        options: [
            {
                name: 'name',
                description: 'Character Name',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'con',
                description: 'Constitution',
                type: ApplicationCommandOptionType.Integer,
            },
            {
                name: 'str',
                description: 'Strength',
                type: ApplicationCommandOptionType.Integer,
            },
            {
                name: 'agi',
                description: 'Agility',
                type: ApplicationCommandOptionType.Integer,
            },
            {
                name: 'int',
                description: 'Intelligence',
                type: ApplicationCommandOptionType.Integer,
            },
            {
                name: 'wis',
                description: 'Wisdom',
                type: ApplicationCommandOptionType.Integer
            },
        ]
    },
    {
        name: 'editcharacter',
        description: 'Changes a stat of selected Character',
        options: [
            {
                name: 'name',
                description: 'Character Name',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'stat',
                description: 'Stat to edit',
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'con', value: 'constitution' },
                    { name: 'str', value: 'strength' },
                    { name: 'agi', value: 'agility' },
                    { name: 'int', value: 'intelligence' },
                    { name: 'wis', value: 'wisdom' },
                ]
            },
            {
                name: 'value',
                description: 'New Value for Stat',
                type: ApplicationCommandOptionType.Integer,
            },
        ]
    }
];

const rest = new REST({ version: '10'}).setToken(process.env.BOT_TOKEN);

async function registerCommands() {
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
};

module.exports = {registerCommands}