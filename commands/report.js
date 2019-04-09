const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
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

    let reportchannel = message.guild.channels.find(x => x.name === "everything");
    if (!reportchannel) return message.channel.send("Couldn't find the appropriate channel to report this user.");

    message.delete().catch(O_o => { });
   return reportchannel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}