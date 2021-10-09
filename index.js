const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (visits) {
      res.send(`Количество посещений: ${visits}`);
    } else {
      res.send(`Количество посещений: 0`);
      client.set("visits", 0);
    }
  });
});

app.get("/stat", (req, res) => {
  client.get("visits", (err, visits) => {
    if (visits) {
      res.send(`Счётчик посещений был увеличен: ${parseInt(visits) + 1}`);
      client.set("visits", parseInt(visits) + 1);
    } else {
      res.send(`Счётчик посещений был увеличен: 1`);
      client.set("visits", 1);
    }
  });
});

app.get("/about", (req, res) => {
  res.send(`Привет, меня зовут Катюшин Станислав и я студент группы P42071`);
});

//specifying the listening port
app.listen(8081, () => {
  console.log("Listening on port 8081");
});
