const { Router } = require('express');
const router = new Router();
const passport = require('passport');

// Регистрация
router.post('/signup', async (req, res) => {
  const service = req.app.get('ioc_container').get('USERS_SERVICE');
  const user = await service.create(req.body);
  res.json(user);
});

// Аутентификация
// router.post(
//   '/signin',
//   passport.authenticate('local', {}),
//   async (req, res) => {
//       console.log(req.body, req.user)
//   },
// );

module.exports = router;
