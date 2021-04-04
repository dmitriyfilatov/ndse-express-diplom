const { Advertisement } = require('./advertisements.model');

class AdvertisementsService {
  constructor() {}

  async create(advertisementData) {
    const newAdvertisement = new Advertisement(advertisementData);
    try {
      await newAdvertisement.save();
      return await Advertisement.findOne(newAdvertisement._id)
        .populate({ path: 'user', select: 'id' })
        .populate({ path: 'user', select: 'name' });
    } catch (error) {
      console.log(error);
      return { status: 'error', message: 'advertisement not saved' };
    }
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
    const { shortText, description, user, tags } = params;

    if (user.length < 12 || user.length > 24) {
      return { status: 'error', message: 'wrong user ID' };
    }

    try {
      const advertisements = await Advertisement.find({
        shortText: { $regex: shortText, $options: 'gi' },
        description: { $regex: description, $options: 'gi' },
        user,
        tags: { $in: tags },
        idDeleted: false,
      })
        .populate({ path: 'user', select: 'id' })
        .populate({ path: 'user', select: 'name' })
        .exec();

      return { status: 'ok', data: advertisements };
    } catch (error) {
      return { status: 'error', message: 'something went wrong' };
    }
  }

  async findById(id) {
    try {
      const advertisement = await Advertisement.find({
        _id: id,
        idDeleted: false,
      })
        .populate('user')
        .populate({ path: 'user', select: 'id' })
        .populate({ path: 'user', select: 'name' });
      return { status: 'ok', data: advertisement };
    } catch (error) {
      return { status: 'error', message: 'something went wrong' };
    }
  }
}

module.exports = { AdvertisementsService };
