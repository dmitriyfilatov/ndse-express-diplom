const { Container, decorate, injectable } = require('inversify');
const { UsersService } = require('../modules/users/users.service');
const {
  AdvertisementsService,
} = require('../modules/advertisements/advertisements.service');

const container = new Container();

decorate(injectable(), UsersService);
container.bind('USERS_SERVICE').to(UsersService).inSingletonScope();

decorate(injectable(), AdvertisementsService);
container
  .bind('ADVERTISEMENTS_SERVICE')
  .to(AdvertisementsService)
  .inSingletonScope();

module.exports = { container };
