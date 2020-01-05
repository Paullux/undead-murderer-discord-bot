const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Now extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_now')
  }
  static action (message) {
      accessDispatcher (message);
  }
}

module.exports = Now;