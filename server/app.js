const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("client-sessions");
const bodyParser = require("body-parser");

//const indexRouter = require("./routes/index");
//const dashboardRouter = require("./routes/dashboard");

// api routes
//const prisonersRoute = require("./routes/prisoners");

// Mysql Database
//const database = require("./config/dbconfig");

// connect
// database.createConnection().getConnection((err, connection) => {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`);
//     return;
//   }
//   //database.keepAlive(connection);
//   console.log(`> MySQl DB Connected `);
//   setInterval(() => {
//     database.getConnection().query("SELECT 1", (err, prisoners) => {
//       console.log(">>> ___Connection Keep-Alive___ <<<")
//       return;
//     });
//   }, 90000)
// });

// // create table
// database.createTable();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // client sessions
// app.use(
//   session({
//     cookieName: "session",
//     secret: "jsfanboy",
//     duration: 30,
//     activeDuration: 5 * 60 * 1000
//   })
// );

// api routes
// app.use("/api/v1", prisonersRoute);

// api routes
app.get("/api/v1/posts", (req, res) => {
  const posts = [
    {
      title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, ipsum",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem ullam, beatae quidem tempore quos harum placeat ipsam dignissimos, eius rem in sunt! In itaque magnam exercitationem porro maxime fugiat! Asperiores?"
    },
    {
      title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, ipsum",
      body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem ullam, beatae quidem tempore quos harum placeat ipsam dignissimos, eius rem in sunt! In itaque magnam exercitationem porro maxime fugiat! Asperiores?"
    }
  ]
  res.status(200).json({ status: "ok", posts })
});

// forward to index.html handler
app.get("*", (req, res) => {
  res.sendFile(path.join("../public", "index.html"));
});

app.listen(3001, () => console.log("> Server started on port 3001"));
