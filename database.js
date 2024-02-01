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

module.exports = {getCharacters, getCharacter, createCharacter, editCharacter}