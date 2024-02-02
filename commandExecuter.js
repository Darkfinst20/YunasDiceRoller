const discord = require('discord.js')
const db = require('./database.js')

async function execCommand(interaction) {
    switch (interaction.commandName) {
        case 'getcharacter':
            execGetCharacter(interaction)
            break;

        case 'createcharacter':
            execCreateCharacter(interaction)
            break;

        case 'editcharacter':
            execEditCharacter(interaction)
            break;

        case 'getweapon':
            execGetWeapon(interaction)
            break;

        case 'createweapon':
            execCreateWeapon(interaction)
            break;

        case 'editweapon':
            execEditWeapon(interaction)
            break;
    
        default:
            break;
    }
}

async function execGetCharacter(interaction) {
    if(interaction.options.get('name') != null) {
        const character = await db.getCharacter(interaction.options.get('name').value)
        
        const embed = new discord.EmbedBuilder()
            .setColor('DarkRed')
            .setTitle('Character')
            .addFields(
                { name: 'Name  [CON|STR|AGI|INT|WIS]', value: character.Name + '  [ ' + 
                character.constitution.toString() + ' | ' + character.strength.toString() + ' | ' +
                character.agility.toString() + ' | ' + character.intelligence.toString() + ' | ' +
                character.wisdom.toString() +' ]' },
            );
        
        interaction.deferReply()
        interaction.deleteReply()
        interaction.channel.send({embeds: [embed]})
        return
    }
    
    const rows = await db.getCharacters()
    const embed = new discord.EmbedBuilder()
        .setColor('DarkRed')
        .setTitle('Characters')
        .addFields({ name: 'Name [CON|STR|AGI|INT|WIS]', value: ' ' });

    rows.forEach(character => {
        embed.addFields(
            { name: ' ', value: character.Name + '  [ ' + 
            character.constitution.toString() + ' | ' + character.strength.toString() + ' | ' +
            character.agility.toString() + ' | ' + character.intelligence.toString() + ' | ' +
            character.wisdom.toString() +' ]' },
        );
    });

    
    interaction.deferReply()
    interaction.deleteReply()
    interaction.channel.send({embeds: [embed]})
}

async function execCreateCharacter(interaction) {

    const t = await db.createCharacter(interaction.options.get('name').value, interaction.options.get('con').value, interaction.options.get('str').value, 
    interaction.options.get('agi').value, interaction.options.get('int').value, interaction.options.get('wis').value);

    if(t) {
        interaction.reply('Character created')
    } else {
        interaction.reply('error')
    }
}

async function execEditCharacter(interaction) {
    const t = await db.editCharacter(interaction.options.get('name').value, interaction.options.get('stat').value, interaction.options.get('value').value)

    if(t) {
        interaction.reply('Value updated')
    } else {
        interaction.reply('Error')
    }
}

async function execGetWeapon(interaction) {
    if(interaction.options.get('name') != null) {
        const weapon = await db.getWeapon(interaction.options.get('name').value)

        const embed = new discord.EmbedBuilder()
            .setColor('DarkGrey')
            .setTitle('Weapon')
            .addFields(
                {name: 'Weapon  [Amount|Dice|+Const]', value: weapon.Name + '  [ ' + weapon.amount.toString() + ' | d' +
                weapon.dice.toString() + ' | +' + weapon.constant.toString() + ' ]'}
            );
        
        interaction.deferReply()
        interaction.deleteReply()
        interaction.channel.send({embeds: [embed]})
        return
    }

    const weapons = await db.getWeapons()
    const embed = new discord.EmbedBuilder()
        .setColor('DarkGrey')
        .setTitle('Weapons')
        .addFields({name: 'Weapon  [Amount|Dice|+Const]', value: ' '});

    weapons.forEach(weapon => {
        embed.addFields(
            { name: ' ', value: weapon.Name + '  [ ' + weapon.amount.toString() + ' | d' +
            weapon.dice.toString() + ' | +' + weapon.constant.toString() + ' ]'}
        );
    });

    interaction.deferReply()
    interaction.deleteReply()
    interaction.channel.send({embeds: [embed]})
}

async function execCreateWeapon(interaction) {
    let amount = 1
    let constant = 0
    if(interaction.options.get('amount') != null) {
        amount = interaction.options.get('amount').value
    }
    if(interaction.options.get('constant') != null) {
        constant = interaction.options.get('constant').value
    }

    const t = await db.createWeapon(interaction.options.get('name').value, interaction.options.get('dice').value, amount, constant);

    if(t) {
        interaction.reply('Weapon created')
    } else {
        interaction.reply('error')
    }
}

async function execEditWeapon(interaction) {
    const t = await db.editWeapon(interaction.options.get('name').value, interaction.options.get('property').value, interaction.options.get('value').value)

    if(t) {
        interaction.reply('Value updated')
    } else {
        interaction.reply('error')
    }
}

module.exports = {execCommand}