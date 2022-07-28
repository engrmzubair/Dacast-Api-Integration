const router = require("express").Router();
const live = require('../controllers/liveController');


//list Streams
router.get('/listStreams', live.listSteams);
//List Stream By Id
router.get('/listStream/:streamId', live.listStreamById);
//create Stream
router.post('/createStream', live.createStream);
//modify Stream
router.put('/modifyStream/:streamId', live.modifyStream);
//delete Stream
router.delete('/deleteStream/:streamId', live.deleteStream);




module.exports = router