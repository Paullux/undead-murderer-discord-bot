const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Stop extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_stop')
  }
  static action (message) {
    let voiceChannel = message.guild.channels
      .filter(function (channel) { return channel.type === 'voice' })
      .first();

    voiceChannel.join();
    voiceChannel.leave();
    accessDispatcher.playlist = null;

    return message.reply("⏹️ Musique Arrêtée à votre demande ⏹️");
  }
}
module.exports = Stop;
