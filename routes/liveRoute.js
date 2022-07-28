const router = require("express").Router();
const live = require('../controllers/liveController');


//list all channels
router.get('/listChannels', live.listChannels);
//create channel
router.post('/createChannel', live.createChannel);
//modify channel
router.put('/modifyChannel/:channelId', live.modifyChannel);




module.exports = router