const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: 'addword',
    description: 'Add a word to the word-list.',
    run: async (client, message, args) => {
        const guildicon = message.guild.iconURL();
        let anitswear = db.get(`anitbadwords_${message.guild.id}`);
        let word = args.slice(0).join(' ');
        if (!word) {
            let missingargs = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`**Invalid Usage\naddword(word)\nExample:\naddword fuck`)
                .setFooter(message.guild.name, guildicon);
            return message.channel.send(missingargs);
        }
        if (anitswear && anitswear.find((find) => find.swearword == word)) {
            let exist = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`${word} It's Already on Bot Database!`)
                .setFooter(message.guild.name, guildicon);
            return message.channel.send(exist);
        }
        let data = {
            swearword: word,
            author: message.author.tag,
        };
        db.push(`anitbadwords_${message.guild.id}`, data);
        let added = new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL()).setDescription(`**${word}** Has Been Added`).setFooter(message.guild.name, guildicon);
        return message.channel.send(added);
    },
};
