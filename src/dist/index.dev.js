"use strict";

var express = require("express");

var app = express();
var port = process.env.PORT || 3006;

var userRouter = require("./routers/userRouter");

var taskRouter = require("./routers/taskRouter");

require("./db/mongoose");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(port, function () {
  console.log("Listening to port ", port);
});