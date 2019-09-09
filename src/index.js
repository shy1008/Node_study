const express = require("express");
const app = express();
// const _ = require("lodash");
const user_route = require("./route/users");
const user_router2 = require("./route/boards");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/users", user_route);
app.use("/boards", user_router2);

app.listen(3000);

app.get("/", (req,res) => {
    
    res.send("hi");
});
