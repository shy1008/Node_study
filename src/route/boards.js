const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_example","root","1234",{host:"localhost", dialect:"mysql"});

const check_sequlize_auth = async () => {
    try{
        await sequelize.authenticate();
        console.log("연결 성공");
    }catch(err){
        console.log("연결 실패: ", err);
    }
};

const Board = sequelize.define("board",{
    title:{
        type:Sequelize.STRING,
        allowNull: false
    },
    content:{
        type:Sequelize.TEXT,
        allowNull: false
    },
    viewcount:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
});
Board.sync({force:true }).then(()=>{
    return Board.create({
        title:"게시판1",
        content:"안녕하세요1",
        viewcount:"1"
    });
}).then(()=>{
    return Board.create({
        title:"게시판2",
        content:"안녕하세요2",
        viewcount:"2"
    });
});

check_sequlize_auth();
 
// 수정해야함 0916

router.get("/", async(req,res) => {
    let result = await Board.findAll();
    res.send(result);
    // res.send("get all");
});
router.get("/:id", async(req,res) => {
    let result = await User.findOne({
        where: {
            id:req.params.id
        }
    });
    res.send(result);
    // res.send("get id");
});

router.post("/", async(req,res) => {
    let result = false;
    try{
        await User.create({ title:req.body.title, content:req.body.content});
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
    // res.send("post");
});

router.put("/:id", async(req,res) => {
    let result = false;
    try{
        result = await Board.update({ title:req.body.title, content:req.body.content},{
            where:{
                id: req.params.id
            }
        }).then(result =>{
            return Boolean(result[0]);
        });
    }catch(err){
        console.error(err);
    }
    // res.send("post");
});

router.delete("/:id", async(req,res) => {
    let result = false;
    try{
        await User.destory({
           where:{
               id:req.params.id
           }
        });
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
    // res.send("delete");
});

module.exports = router;
