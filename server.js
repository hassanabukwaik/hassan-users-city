const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const validator = require("validator");
//const User =require("./User")

const app = express();

// import routes
const usersRoute = require("./routes/users");
const cityRoute = require("./routes/city");

//Body parser
app.use(express.json());

// Mount routers
app.use("/api/user", usersRoute);
app.use("/api/city", cityRoute);

const PORT = process.env.PORT || 5000;
mongoose.connect(`mongodb+srv://admin:XMs2jSk4BjSBjds@cluster0.8jus6.mongodb.net/HASSAN-USERS-CITY?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection

  db.on('error',(err)=>{
      console.log(err)
  })
  db.once('open',()=>{
      console.log("connected with mongoDB")
  })

  const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


