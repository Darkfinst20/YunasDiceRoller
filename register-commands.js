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
    },
    {
        name: 'getweapon',
        description: 'Get all or a certain Weapon',
        options: [
            {
                name: 'name',
                description: 'Weapon Name',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ]
    },
    {
        name: 'createweapon',
        description: 'creates a new Weapon',
        options: [
            {
                name: 'name',
                description: 'Weapon Name',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'dice',
                description: 'Type of dice to be rolled (input Number)',
                type: ApplicationCommandOptionType.Integer,
            },
            {
                name: 'amount',
                description: 'Amount of dice to roll (default 1)',
                type: ApplicationCommandOptionType.Integer,
                required: false,
            },
            {
                name: 'constant',
                description: 'Constant damage of Weapon (default 0)',
                type: ApplicationCommandOptionType.Integer,
                required: false,
            }
        ]
    },
    {
        name: 'editweapon',
        description: 'Changes property of selected Weapon',
        options: [
            {
                name: 'name',
                description: 'Weapon Name',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'property',
                description: 'property to Change',
                type: ApplicationCommandOptionType.String,
                choices: [
                    { name: 'Dice', value: 'dice' },
                    { name: 'Amount', value: 'amount'},
                    { name: 'Constant', value: 'constant' },
                ]
            },
            {
                name: 'value',
                description: 'New value of property',
                type: ApplicationCommandOptionType.Integer,
            }
        ]
    },
    {
        name: 'attack',
        description: 'performes an attack',
        options: [
            {
                name: 'name',
                description: 'Character Name',
                type: ApplicationCommandOptionType.String,
            },
            {
                name: 'weapon',
                description: 'Weapons to use, seperate multiple weapons with ,',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
            {
                name: 'adddamage',
                description: 'Value added to total Damage',
                type: ApplicationCommandOptionType.Integer,
                required: false,
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