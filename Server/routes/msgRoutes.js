const express = require('express');
const { addMsg,getAllMsg  } = require('../controllers/messageController');
const router = express.Router();

router.post('/addMsg',addMsg);
router.post('/getAllMsg',getAllMsg);


module.exports = router;