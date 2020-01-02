const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Volume extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_volume')
  }
  static action (message) {
      accessDispatcher(message);
  }
}
module.exports = Volume;
