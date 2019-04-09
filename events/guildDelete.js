module.exports(client, member)  => {
    const defaultChannel = member.guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
    defaultChannel.send(`Cya Neva ${member.user}.`).catch(console.error);
}
