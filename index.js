const path = require("path");
const express = require('express');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const sendEmail = require("./utils/SendEmail");

// Initializing express app
const app = express();


// Express configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.get("/", (req, res) => {
  res.status(200).render("resume2");
});

app.post("/submit", async (req, res) => {
  try {
    const {email, message, subject, name} = req.body;
    
    await sendEmail(email, subject, message, name);
    
    res.status(200).render("thankyou", req.body);
  } catch (e) {
    console.log(e);
    res.status(200).render("thankyou", e);
  }
});

app.listen(port, () => console.log(`Now listening on port ${port}`));