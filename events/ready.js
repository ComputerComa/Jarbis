const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env['TOKEN'];


const TEST_GUILD_ID = process.env['TEST_GUILD_ID'];
//const CLIENT_ID = process.env['CLIENT_ID']
const PRODUCTION = process.env['PRODUCTION']
const DEV_TOKEN = process.env['DEV_TOKEN']
module.exports = {
    name: "ready",
    once: true,
    execute(client, commands) { // set the bot status
        client.user.setActivity("with the spotify mixtape", {type: "PLAYING"})
        console.log(`Logged in as ${
            client.user.id
        }`);
        let rest = null
        // Registering the commands in the client
        const CLIENT_ID = client.user.id;
        //console.log(CLIENT_ID)
        if (PRODUCTION == 'TRUE') {
         rest = new REST({version: '9'}).setToken(TOKEN);
        }else{
         rest = new REST({version: '9'}).setToken(DEV_TOKEN); 
        }
        (async () => {
            try {
                if (PRODUCTION == 'TRUE') {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: []
                    },);
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    },);
                    console.log('Successfully registered application commands globally');
                } else {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
                        body: []
                    },);
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
                        body: commands
                    },);

                    console.log('Successfully registered application commands for development guild');
                }
            } catch (error) {
                if (error) 
                    console.error(error);
            }
        })();

    }
}
