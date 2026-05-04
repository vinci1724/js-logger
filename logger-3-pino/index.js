// Загрузка переменных окружения из .env
import "dotenv/config";
import express from "express";
import pino from "pino";
import pinoHttp from "pino-http";

// Основной логгер: вывод в stdout JSON-формат
const logger = pino({ level: process.env.LOG_LEVEL || "info" });

// HTTP middleware для автоматического логирования запросов
const expressLogger = pinoHttp({ logger });

const PORT = process.env.PORT || 3000;
const app = express();

// Логирует каждый запрос: method, url, status, responseTime
app.use(expressLogger);

app.get("/", (req, res) => {
  logger.debug("Calling res.send");
  res.send("Hello World");
});

const server = app.listen(PORT, () => {
  logger.info("Server running on port %d", PORT);
});

server.on("listening", () => logger.info("Listening"));
server.on("close", () => logger.info("Server closed"));
