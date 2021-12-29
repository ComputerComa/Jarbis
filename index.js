const fs = require('fs');

// Require the necessary discord.js classes
const Database = require("./config/Database");
const db = new Database();
db.connect();

const {Client, Intents, Collection} = require('discord.js');

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]
});


// Loading commands from the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Loading the token from .env file
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env['TOKEN'];
const DEV_TOKEN = process.env['DEV_TOKEN']
const TEST_GUILD_ID = process.env['TEST_GUILD_ID'];
const CLIENT_ID = process.env['CLIENT_ID']
const PRODUCTION = process.env['PRODUCTION']
const commands = [];

// Creating a collection for commands in client
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}

if (PRODUCTION == 'TRUE') {
client.login(TOKEN);
} else {
    client.login(DEV_TOKEN)
}
