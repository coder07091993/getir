var express = require("express");
var router = express.Router();
const {testControllerPost} = require("../Controllers/Test-Controller/post");

/* POST:Test API */
router.post("/",testControllerPost);

module.exports = router;
