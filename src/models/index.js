const fs = require("fs");
const path = require("path");
const basename = path.basename(_filename);
const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize("node_example","root","1234",{host:"localhost", dialect:"mysql"});

sequelize.authenticate().then(() => {
    console.log("연결성공");
}).catch(err => {
    console.log("연결 실패",err);
});

fs.readdirSync(__dirname).filter(file => {
    return(file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
}).forEach(file => {
    let model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log(db);
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
