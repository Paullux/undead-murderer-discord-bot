const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Queue extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_queue')
  }
  static action (message) {
      accessDispatcher (message);
  }
}

module.exports = Queue;
