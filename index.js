const path = require("path");
const express = require('express');
process.env.PORT = 3000;
const port = process.env.PORT || 3000;

// Initializing express app
const app = express();

// Simulating Database
const contact = {};
let id = 0;

// Express configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.get("/", (req, res) => {
  res.status(200).render("resume");
});

app.post("/submit", (req, res) => {
  if(!contact[id]) {
    contact[id] = req.body;
  } else {
    id++;
    contact[id] = req.body;
  }
  console.log(contact);
  res.status(200).render("thankyou", req.body);
});

app.listen(port, () => console.log(`Now listening on port ${port}`));