module.exports.run = async (client, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Couldn't find user.");
    args.shift();
    let breason = args.join(" ");
    if (message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You don't have the authority to command me");
    if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked");

    let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#be6800")
        .addField("Kicked User", `${kUser} with ID ${bUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("reason", breason);

    let banChannel = message.guild.channels.find(`name`, "everything");
    if (!banChannel) return message.channel.send("Can't find correct channel.");

    message.guild.member(bUser).ban(breason);
    banChannel.send(banEmbed);
}
module.exports.help = {
    name: "ban"
}