const {Client, Collection, Intents} = require('discord.js');
const {readdirSync } = require('fs')
const client = new Client({ intents: 32767 })
const keep_alive = require ('./keep_alive.js')

const mySecret = process.env['TOKEN']
client.login(mySecret);

client.commands = new Collection();



const commandFiles = readdirSync('./command').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./command/${file}`);
	client.commands.set(command.name, command);
	}



const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute( client, ...args));
	}
}
