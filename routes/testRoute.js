const router = require("express").Router();

router.get("/", (req, res) => {

    res.send("testing route is working.")
})

module.exports = router