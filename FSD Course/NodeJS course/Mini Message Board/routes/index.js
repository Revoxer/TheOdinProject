const express = require("express");
const router = express.Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date("2024-01-10T09:15:00"),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date("2024-01-11T14:30:00"),
  },
  {
    id: 3,
    text: "Express + EJS is a great combo for learning server-side rendering!",
    user: "Sofia",
    added: new Date("2024-01-12T11:00:00"),
  },
];

let nextId = 4;

router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

router.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

router.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;

  if (messageText && messageUser) {
    messages.push({
      id: nextId++,
      text: messageText,
      user: messageUser,
      added: new Date(),
    });
  }

  res.redirect("/");
});

router.get("/messages/:id", (req, res) => {
  const message = messages.find((m) => m.id === parseInt(req.params.id));

  if (!message) {
    return res.status(404).render("404", { title: "404 — Not Found" });
  }

  res.render("message", { title: "Message Detail", message });
});

module.exports = router;
