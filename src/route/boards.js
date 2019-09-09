
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.get("/", (req,res) => {
        res.send("get");
});
router.get("/:id", (req,res) => {
        res.send("get");
});

router.post("/", (req,res) => {
    res.send("post");
});

router.put("/:id", (req,res) => {
    res.send("put");
});

router.delete("/:id", (req,res) => {
    res.send("post");
});

module.exports = router;
