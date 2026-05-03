// stdout → файл hello.log (1> или просто >)
console.log("stdout");
// stderr → файл error.log (2>)
console.error("stderr");

// Запуск: node index.js > hello.log 2> error.log
