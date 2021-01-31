const Discord = require("discord.js");

const config = require("./config.json");
const RustPlus = require('@liamcottle/rustplus.js');
const rustplus = new RustPlus(config.RUST_SERVER_IP, config.RUST_SERVER_PORT, config.RUST_PLAYER_ID, config.RUST_PLAYER_TOKEN);

const client = new Discord.Client();

var discordConnected = false;
var rustConnected = false;
client.login(config.BOT_TOKEN);

client.once('ready', () => {
    client.user.setActivity('Rust+');
    const channel = client.channels.cache.get(config.DISCORD_CHANNEL_ID);
    channel.send('Rust+ connected...');
    discordConnected = true;
});

client.on("message", message => {
    if (message.channel == client.channels.cache.get(config.DISCORD_CHANNEL_ID) && !message.author.bot && discordConnected) {
        rustplus.sendTeamMessage("[BOT]" + message.author.username + ": " + message.content);
    } 
});

//RUST
rustplus.on('connected', () => {
   rustplus.sendTeamMessage('[BOT]Rust+ connected.');
   rustConnected = true;
});


rustplus.on('message', (message) => {
try{
    if (discordConnected) {
        if (message.broadcast) {
            if (message.broadcast.teamMessage.message.name){
				const channel = client.channels.cache.get(config.DISCORD_CHANNEL_ID);
				var msgText = message.broadcast.teamMessage.message.message;
					if (!msgText.includes("[BOT]") && !msgText.includes("!bot")) {
						channel.send(message.broadcast.teamMessage.message.name + ": " + message.broadcast.teamMessage.message.message);
					}
            } 
        }
    }
}catch(e){
         }
});
