const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Skip extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_skip')
  }
  static action (message) {
      accessDispatcher (message);
  }
}

module.exports = Skip;