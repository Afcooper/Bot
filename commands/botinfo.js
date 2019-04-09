module.exports.run = async (client, message, args) => {
    let botAvatar = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setDescription("Bot Info")
        .setColor('#ff0000')
        .addField("Bot Name", client.user.username)
        .setThumbnail(botAvatar)
        .addField("Created On", client.user.createdAt);
}

module.exports.help = {
    name:   "botinfo"
}