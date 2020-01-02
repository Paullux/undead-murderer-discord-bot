const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Pause extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_pause')
  }
  static action (message) {
      accessDispatcher (message);
  }
}

module.exports = Pause;
