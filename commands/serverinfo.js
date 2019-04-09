module.exports.run = async (client, message, args) => {
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

module.exports.help = {
    name: "serverinfo"
}