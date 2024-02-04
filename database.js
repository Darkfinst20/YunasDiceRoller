require('dotenv').config()
const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()

async function getCharacters() {
    const [rows] = await pool.query('SELECT * FROM characters')
    return rows
}

async function getCharacter(name) {
    const [rows] = await pool.query(`SELECT Name, constitution, strength, agility, intelligence, wisdom FROM characters WHERE name = ?`, [name])
    return rows[0]
}

async function createCharacter(name, con, str, agi, int, wis) {
    await pool.query(`INSERT INTO characters (Name, constitution, strength, agility, intelligence, wisdom) VALUES (?, ?, ?, ?, ?, ?)`, [name, con, str, agi, int, wis])
    return true
}

async function editCharacter(name, stat, value) {
    await pool.query(`UPDATE characters SET ${stat}=? WHERE Name = ?`, [value, name])
    return true
}

async function getWeapons() {
    const [rows] = await pool.query('SELECT * FROM weapons')
    return rows
}

async function getWeapon(name) {
    const [rows] = await pool.query(`SELECT * FROM weapons WHERE name=?`, [name])
    return rows[0]
}

async function createWeapon(name, dice, amount, constant) {
    await pool.query(`INSERT INTO weapons (Name, dice, amount, constant) VALUES (?, ?, ?, ?)`, [name, dice, amount, constant])
    return true
}

async function editWeapon(name, property, value) {
    await pool.query(`UPDATE weapons SET ${property}=? WHERE Name = ?`, [value, name])
    return true
}

async function getSkills() {
    const [rows] = await pool.query(`SELECT * FROM skills`)
    return rows
}

async function getSkill(name) {
    const [rows] = await pool.query(`SELECT * FROM skills WHERE Name = ?`, [name])
    return rows[0]
}

async function createSkill(name, type, value, text) {
    await pool.query(`INSERT INTO skills (Name, type, value, text) VALUES (?, ?, ?, ?)`, [name, type, value, text])
    return true
}

async function editSkill(name, value) {
    await pool.query(`UPDATE skills SET value = ? WHERE name = ?`, [value, name])
    return true
}

module.exports = {getCharacters, getCharacter, createCharacter, editCharacter, 
                    getWeapons, getWeapon, createWeapon, editWeapon,
                    getSkills, getSkill, createSkill, editSkill}