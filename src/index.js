const express = require("express");
const app = express();
const _ = require("lodash");


let users = [];
let user = null; 

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(3000);

app.get("/", (req,res) => {
    
    res.send("hi");
});

app.get("/users", (req,res) => {
    let msg = "유저가 존재하지 않습니다.";
    if(users.length > 0){
        msg = users.length+"명의 유저가 존재합니다.";
    }
        res.send({msg,result: users});
});
app.get("/users/:id", (req,res) => {
    let msg = "ID가"+req.params.id+"인 유저가 존재하지 않습니다.";
    let user = _.find(users, ["id",parseInt(req.params.id)]);

    if(user){
        msg = "성공적으로 조회하였습니다.";
    }
        res.send({msg,result: user});
});

app.post("/users", (req,res) => {
    const check_user = _.find(users, function(o) {return o.id == req.body.id});
    let msg = req.body.id+"아이디를 가진 유저가 이미 존재합니다.";
    let success = false;
    if(!check_user){
        users.push(req.body);
        msg = req.body.name+ "유저가 추가되었습니다.";
        success = true;
    }
    res.send({msg,success});
});

app.put("/users/:id", (req,res) => {
    let check_user = _.find(users, ["id",parseInt(req.params.id)]);
    let msg =req.params.id+"아이디를 가진 유저가 존재하지 않습니다.";

    if(check_user){
        users = users.map(entry => {
            if(entry.id === parseInt(req.params.id)){
                entry.name = req.body.name;
            }
            return entry;
        });
        msg = "성공적으로 수정되었습니다.";
    }
    res.send({msg});
});

app.delete("/users/:id", (req,res) => {
    let check_user = _.find(users, ["id",parseInt(req.params.id)]);
    let msg =req.params.id+"아이디를 가진 유저가 존재하지 않습니다.";

    if(check_user){
        
        msg = "성공적으로 삭제 되었습니다.";
        users = _.reject(users,["id",parseInt(req.params.id)]);
    }
    res.send({msg});
});
