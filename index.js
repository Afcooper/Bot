// Load up the discord.js library
const config = require("./config.json")
const Discord = require("discord.js");
//const Enmap = require("enmap");
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
// Here we load the config.json file that contains our token and our prefix values. 
//
//const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.


//const fs = require("fs");

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;


/*
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
*/

client.on("ready", async () => {
    console.log(`bot is on`);
    client.user.setActivity("Just being a bot");
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.splice(1);

    if (cmd === `${prefix}kick`) {
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) return message.channel.send("Couldn't find user.");
        args.shift();
        let kreason = args.join(" ");

        let kickEmbed = new Discord.RichEmbed()
            .setDescription("~Kick~")
            .setColor("#e56800")
            .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
            .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
    }
    /* Input for command: ?report @user reason
     * This command will write out an embeded message the "reports" the user.
     * It reports it in the report channel using message.guild.channels.find()
     * if there is no report channel to report it to it should send an error.
     * */
    if (cmd === `${prefix}report`) {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.send("Couldn't find user.");
        args.shift();
        let reason = args.join(" ");

        
        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Reports")
            .setColor("#00FF00")
            .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel", message.channel)
            .addField("Time of the Incident", message.createdAt)
            .addField("Reason for the report: ", reason)
            .addField("Notification", `The cops have been notified about ${rUser}'s bad actions`)

        let reportchannel = message.guild.channels.find(`name`, "everything");
        if (!reportchannel) return message.channel.send("Couldn't find the appropriate channel to report this user.");

        message.delete().catch(O_o => { });
        reportchannel.send(reportEmbed);
        }

    if (cmd === `${prefix}serverinfo`) {
        let botAvatar = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
            .setDescription("Server Info")
            .setColor("0000FF")
            .setThumbnail(botAvatar)
            .addField("Server Name", message.guild.name)
            .addField("Created On", message.guild.createdAt)
            .addField("You Joined", message.member.joinedAt)
            .addField("Total Members", message.guild.memberCount);

        return message.channel.send(serverembed);
        }

    if (cmd === `${prefix}botinfo`) {

        let botAvatar = client.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
            .setDescription("Bot Info")
            .setColor('#ff0000')
            .addField("Bot Name", client.user.username)
            .setThumbnail(botAvatar)
            .addField("Created On", client.user.createdAt);
        return message.channel.send(botembed);
    }

});

client.login(config.token);