const Command = require("../modules/Command");

const accessDispatcher = require('../modules/AccessDispatcher');

class Resume extends Command {
  static match (message) {
    return message.content.toLowerCase().startsWith('_resume')
  }
  static action (message) {
      accessDispatcher (message);
  }
}

module.exports = Resume;
