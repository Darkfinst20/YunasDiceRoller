
/**
 * min and max included
 * @param {*} min 
 * @param {*} max 
 * @returns Random int
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function rollDice(dice) {
    const val = getRndInteger(1, dice)
    return {value: val, text: '['+val+'|'+dice+']'}
}

function rollMultDice(dice, amount) {
    let val = 0
    let text = '{ '
    for (let i = 0; i < amount + 1; i++) {
        const rolledDice = rollDice(dice)
        val += rolledDice.value
        text += rolledDice.text + ' '
    }
    text += '} ' + val
    return {value: val, text: text}
}

module.exports = {rollDice, rollMultDice}