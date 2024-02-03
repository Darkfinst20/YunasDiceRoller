const db = require('./database.js')
const rollHandler = require('./rollHandler.js')

async function performeAttack(name, weapons, [skills], addDamage) {
    const hitRoll = rollHandler.rollDice(20)
    if(hitRoll.value <= 5) {
        return {hitted: false, hitRoll: hitRoll}
    }

    const character = await db.getCharacter(name)
    let weaponData = []

    for(let i = 0; i < weapons.length; i++) {
        const data = await db.getWeapon(weapons[i])
        weaponData.push(data)
    }

    //demon unchained etc

    const damage = (character.strength - (character.strength % 10)) / 10 //replace with mag 
    
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

    attackData.totalDamage = totalDamage

    return attackData
}

module.exports = {performeAttack}