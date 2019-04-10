const Discord = require("discord.js");


// ?addrole @user	Role
module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Your power level isn't high enough.");
    let rMember = message.guild.member(message.mentions.user.first() || message.guild.members.get(args[0]));
    if (!rMember) return message.reply("Please mention a valid user");
    args.shift();
    let role = args.join(" ");
    if (!role) return message.reply("Specify a role to add you noob");
    let gRole = message.guild.roles.find(x => x.name === "role");
    if (!gRole) return message.reply("Couldn't find that role.")

    if (rMember.roles.has(gRole.id));
    await (rMember.addRole(gRole.id));

    try {
        message.channel.send(`Congrats, you were added to ${gRole.name}`)
    } catch (e) {
        message.channel.send(`IDK what happened`)
    }
}

module.exports.help = {
	name:	"addrole"
}