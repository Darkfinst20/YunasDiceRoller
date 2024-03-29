const db = require('./database.js')
const rollHandler = require('./rollHandler.js')

async function performeAttack(name, weapons, skills, addDamage) {
    const hitRoll = rollHandler.rollDice(20)
    if(hitRoll.value <= 6) {
        return {hitted: false, hitRoll: hitRoll}
    }

    const character = await db.getCharacter(name)
    let weaponData = []
    let skillData = []

    for(let i = 0; i < weapons.length; i++) {
        const data = await db.getWeapon(weapons[i])
        weaponData.push(data)
    }

    for(let i = 0; i < skills.length; i++) {
        const data = await db.getSkill(skills[i])
        skillData.push(data)
    }

    //unique Skills
    let damageStat = 0
    if(skills.includes('DMG Control')) {
        damageStat = character.intelligence
    } else {
        damageStat = character.strength
        if(skills.includes('Demon Unchained')) {
            damageStat = character.strength * 2
        }
    }

    const damage = (damageStat - (damageStat % 10)) / 10
    
    let totalDamage = 0
    totalDamage += damage

    let attackData = {hitted: true, hitRoll: hitRoll, name: character.Name, damage: damage, weapons: [], skills: [], addDamage: null, totalDamage: 0}

    if(addDamage != 0) {
        totalDamage += addDamage
        attackData.addDamage = addDamage
    }

    weaponData.forEach(weapon => {
        const weaponRoll = rollHandler.rollMultDice(weapon.dice, weapon.amount)
        const weaponDamage = weaponRoll.value + weapon.constant
        attackData.weapons.push({
            name: weapon.Name, text: weaponRoll.text + ' + ' + weapon.constant + ' | ' +  weaponDamage
        })
        totalDamage += weaponDamage
    })

    skillData.forEach(skill => {
        if(skill.type == 'damage') {
            totalDamage += skill.value
            attackData.skills.push({
                name: skill.Name, text: ' + ' + skill.value.toString()
            })
        } else if(skill.type == 'unique') {
            if(skill.Name != 'Blutrausch') {
                attackData.skills.push({
                    name: skill.Name, text: skill.text
                })
            }
        }
    })

    if(skills.includes('Blutrausch')) {
        const blutrausch = await db.getSkill('Blutrausch')
        const roll = rollHandler.rollDice(20)
        if(roll.value > 10) {
            totalDamage = totalDamage * 2
        }
        attackData.skills.push({
            name: blutrausch.Name, text: blutrausch.text + ' | ' + roll.text
        })
    }

    attackData.totalDamage = totalDamage

    return attackData
}

module.exports = {performeAttack}