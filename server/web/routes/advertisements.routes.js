const { Router } = require('express');
const router = new Router();

router.post('/create', async (req, res) => {
  const service = req.app.get('ioc_container').get('ADVERTISEMENTS_SERVICE');
  const advertisement = await service.create(req.body);
  res.json(advertisement);
});

router.delete('/delete/:id', async (req, res) => {
  const service = req.app.get('ioc_container').get('ADVERTISEMENTS_SERVICE');
  const advertisement = await service.delete(req.params.id);
  res.json(advertisement)
});

router.get('/find', async (req, res) => {
    const service = req.app.get('ioc_container').get('ADVERTISEMENTS_SERVICE');
    const advertisement = await service.find(req.body);
    res.json(advertisement)
})

module.exports = router;
