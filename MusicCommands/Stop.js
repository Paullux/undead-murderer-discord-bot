const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Stop extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_stop')
  }
  static action (message) {
    accessDispatcher(message);
    return message.reply("⏹️ Musique Arrêtée à votre demande ⏹️");
  }
}
module.exports = Stop;
