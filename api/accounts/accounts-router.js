const router = require('express').Router();

const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique
} = require('./accounts-middleware');

const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll(); 
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Account.getById(req.params.id); 
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body); 
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const updatedAccount = await Account.updateById(req.params.id, req.body); 
    if (!updatedAccount) {
      return res.status(404).json({ message: "account not found" });
    }
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Account.deleteById(req.params.id); 
    if (!deletedAccount) {
      return res.status(404).json({ message: "account not found" });
    }
    res.json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

module.exports = router;