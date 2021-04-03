const { Router } = require('express');
const router = new Router();

router.get('/get-by-email/:email', async (req, res) => {
  const service = req.app.get('ioc_container').get('USERS_SERVICE');
  const user = await service.getByEmail(req.params.email);
  res.json(user);
});

router.post('/create', async (req, res) => {
  const service = req.app.get('ioc_container').get('USERS_SERVICE');
  const user = await service.create(req.body);
  res.json(user);
});

module.exports = router;
