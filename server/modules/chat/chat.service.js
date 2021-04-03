const { Chat } = require('./chat.model');

class ChatService {
  constructor() {}

  async getChat(users) {
    try {
      const chat = await Chat.find(users);
      return { status: 'ok', data: chat };
    } catch (error) {
      return { status: 'error', message: 'something went wrong' };
    }
  }
}

module.exports = { ChatService };
