const { Container, decorate, injectable } = require('inversify');
const { UsersService } = require('../modules/users/users.service');
const {
  AdvertisementsService,
} = require('../modules/advertisements/advertisements.service');
const { ChatService } = require('../modules/chat/chat.service');

const container = new Container();

decorate(injectable(), UsersService);
container.bind('USERS_SERVICE').to(UsersService).inSingletonScope();

decorate(injectable(), AdvertisementsService);
container
  .bind('ADVERTISEMENTS_SERVICE')
  .to(AdvertisementsService)
  .inSingletonScope();

decorate(injectable(), ChatService);
container.bind('CHAT_SERVICE').to(ChatService).inSingletonScope();

module.exports = { container };
