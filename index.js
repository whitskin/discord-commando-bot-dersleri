const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
path = require('path'),
moment = require('moment'),
sqlite = require('sqlite');

const ayarlar = require('./ayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.PREFIX,
    unknownCommandResponse: false,
    owner: ayarlar.SAHIP,
    disableEveryone: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
		['sunucu', 'Sunucu Komutları'],
		['bot', 'Bot Komutları'],
		['ayarlar', 'Ayarlar'],
		['admin', 'Admin'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'komutlar'));

	sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});

client.on('ready', () => {
  client.user.setActivity("DISCORD COMMANDO BOT DERSLERI!", { type: "WATCHING"});       
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] LOG: Aktif, Komutlar yüklendi!`);
});

client.on('error', err => {
	console.log(err)
});

client.login(ayarlar.TOKEN);
