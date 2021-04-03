const { Advertisement } = require('./advertisements.model');

class AdvertisementsService {
  constructor() {}

  async create(advertisementData) {
    const newAdvertisement = new Advertisement(advertisementData);
    try {
      await newAdvertisement.save();
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'advertisement not saved' };
    }

    return { status: 'ok', data: newAdvertisement };
  }

  async delete(id) {
    try {
      await Advertisement.findOneAndUpdate(id, { isDeleted: true });
    } catch (error) {
      return {
        status: 'error',
        message: `advertisement with id ${id} not deleted`,
      };
    }

    return { status: 'ok' };
  }

  async find(params) {
    const { shortText, description, userId, tags } = params;

    if (userId.length < 12 || userId.length > 24) {
      return { status: 'error', message: 'wrong userId' };
    }

    try {
      const advertisements = await Advertisement.find({
        shortText: { $regex: shortText, $options: 'gi' },
        description: { $regex: description, $options: 'gi' },
        userId,
        tags: { $in: tags },
      }).exec();

      return { status: 'ok', data: advertisements };
    } catch (error) {
      return { status: 'error', message: 'something went wrong' };
    }
  }
}

module.exports = { AdvertisementsService };
