import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware: логирует каждый запрос
app.use((req, res, next) => {
  console.log("%0", req);
  next();
});

// Маршрут: возвращает "Hello World"
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log("Server running om port %d", PORT);
});
