module.exports.run = async (client, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!kUser) return message.channel.send("Couldn't find user.");
    args.shift();
    let kreason = args.join(" ");
    if (message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You don't have the authority to command me");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked");

    let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56800")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("reason", kreason);

    let kickChannel = message.guild.channels.find(`name`, "everything");
    if (!kickChannel) return message.channel.send("Can't find correct channel.");

    message.guild.member(kUser).kick(kreason);
    kickChannel.send(kickEmbed);
}

module.exports.help = {
    name: "kick"
}