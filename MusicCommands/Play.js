const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Play extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_play')
  }
  static action (message) {
      accessDispatcher (message);
  }
}

module.exports = Play;
