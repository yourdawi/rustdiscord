This is a Discord Bot for the Game Rust.
The project is created using the [rustplus.js](https://github.com/liamcottle/rustplus.js) library.
You will need Node.JS
Download and run npm install and start with node index.js

Please edit the [config.js](https://github.com/yourdawi/rustdiscord/blob/main/config.json).

If you dont know how to get the Server IP, Port or Player ID/Token -> Check [this](https://github.com/liamcottle/rustplus.js#pairing) out.

Prebuild the Discord Bot will Sync the Ingame Teamchat and the Discord Channel Chat.

You can also add Smart Alarm or anything else to it.
Here are some examples:
(PS: You need the ID from every Device, same way as for PlayerID)

The Server must be Rust+ ready ofcourse.

This will trigger the Smart Alarm. Remember to edit SMART_ALARM_ID

If you want to mention a Role you have to add this to the text:
<@&ROLE_ID>

```javascript
rustplus.on('message', (message) => {
try{
    if (discordConnected) {
        if (message.broadcast) {
            if (message.broadcast.entityChanged.entityId == SMART_ALARM_ID && message.broadcast.entityChanged.payload.value){
				const channel = client.channels.cache.get(config.DISCORD_CHANNEL_ID);
					channel.send("Alarm at Base!");
					rustplus.sendTeamMessage('[BOT]Alarm at Base!');
            } 
        }
    }
}catch(e){
         }
});

```

You can also add ingame commands:
You have to change SMART_SWITCH_ID here, this will turn on (for example) all your lights in your base,
directly in the ingame chat with !bot light
```javascript
rustplus.on('message', (message) => {
try{
    if (message.broadcast) {
        if (message.broadcast.teamMessage.message.name){
			var msgText = message.broadcast.teamMessage.message.message;
			if (msgText.includes("!bot") && !msgText.includes("[BOT]")) {
				if (msgText.includes("light")) {
					rustplus.getEntityInfo(SMART_SWITCH_ID, (amessage) => {
						if (amessage.response.entityInfo.payload.value) {
							rustplus.turnSmartSwitchOff(SMART_SWITCH_ID, (message) => {
                                rustplus.sendTeamMessage('[BOT]Light off!');
							return true;
							})
						} else {
							rustplus.turnSmartSwitchOn(SMART_SWITCH_ID, (message) => {
                                rustplus.sendTeamMessage('[BOT]Light on!');
							return true;
							})
						}
					})
				} 
			}
		}
    }
}catch(e){
         }
});

```
