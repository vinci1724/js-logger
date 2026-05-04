import "dotenv/config";
import pino from "pino";

const levels = {
  notice: 35, // Подойдёт любое число между 30 (info) и 40 (warn)
};

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  customLevels: levels, // Настройка уровней логирования
  formatters: {
    // Изменение встроенных полей лога
    bindings: (bindings) => {
      return {
        pid_1: bindings.pid,
        host_2: bindings.hostname,
        node_version: process.version, // Добавили новое поле
      };
    },
    // Использование строковых названий уровней логирования
    level: (label) => {
      return { severity: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime, // Настройка формата временной метки
});

logger.info("Hello world");

logger.fatal("fatal");
logger.error("error");
logger.warn("warn");
logger.notice("NOTICE");
logger.info("info");
logger.debug("debug");
logger.trace("trace");

// Добавление контекстуальных данных
logger.error(
  { transaction_id: "12343_ff", user_id: "ivanov" },
  "Транзакция провалилась",
);

// Добавление контекстуальных данных во все логи
logger.info("Запуск программы");

function getUser(userID) {
  const childLogger = logger.child({ userID });
  childLogger.trace("getUser запущен");

  // получить данные пользователя и вернуть их из функции

  childLogger.trace("getUser завершён");
}

getUser("petrov");

logger.info("Завершение программы");
