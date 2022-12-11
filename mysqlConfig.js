const mysql = require("mysql2");

mysqlConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
  connectTimeout: 500000,
  port: process.env.MYSQL_PORT,
  // debug: true
};

console.log("connecting to db with config ", mysqlConfig);
var pool = mysql.createPool(mysqlConfig);

pool.query("CREATE TABLE IF NOT EXISTS `coins` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(1000) DEFAULT 'Unamed Coin', `front_image_name` varchar(1000) NOT NULL DEFAULT 'noimage.png', `year` int DEFAULT NULL,`price` int DEFAULT NULL, `description` varchar(1000) DEFAULT NULL, `status` tinyint DEFAULT '0', `rating` tinyint DEFAULT '0' COMMENT '0 = poor\\n1 = average\\n2 = great\\n3 = exellent',`manufacturer` tinyint DEFAULT '0' COMMENT '0 = P\n1 = S\n2 = D',`back_image_name` varchar(1000) NOT NULL DEFAULT 'noimage.png',PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='status:\n0 = unlisted\n1 = listed\n2 = sold';", (err, rows) => {
  console.log("created coins", rows);
});

pool.query("CREATE TABLE IF NOT EXISTS `order_items` (`orderid` int NOT NULL, `itemid` int DEFAULT '-1', `coinid` int DEFAULT '-1') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;", (err, rows) => {
  console.log("created order items", rows);
});

pool.query("CREATE TABLE IF NOT EXISTS `orders` (`id` int NOT NULL AUTO_INCREMENT, `userid` int DEFAULT '-1' COMMENT 'The user who purchased the items, -1 if they weren''t logged in at time of purchase', `status` int NOT NULL DEFAULT '0', `date` datetime DEFAULT NULL, `total` int DEFAULT '0', `first_name` varchar(100) NOT NULL, `last_name` varchar(100) NOT NULL, `address` varchar(200) NOT NULL, `address_2` varchar(200) DEFAULT NULL, `city` varchar(45) NOT NULL, `state` varchar(45) NOT NULL, `zip` int NOT NULL, `phone` varchar(45) NOT NULL, `email` varchar(45) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='status: 0 = placed, 1 = shipped, 2 = delivered';", (err, rows) => {
  console.log("orders", rows);
});

pool.query("CREATE TABLE IF NOT EXISTS `store_settings` (`tax_rate` int DEFAULT '725' COMMENT 'Divide tax_rate by 1000 then multiply with subtotal.', `shipping_fee` int DEFAULT '500' COMMENT 'Divide shipping_fee by 100 then add to sub total.') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;", (err, rows) => {
  console.log("created store settings", rows);
});

pool.query("INSERT INTO `store_settings` (tax_rate, shipping_fee) VALUES(725, 525)", (err, rows) => {
  console.log("created store settings", rows);
});

pool.query("CREATE TABLE IF NOT EXISTS `users` (`id` int NOT NULL AUTO_INCREMENT, `passhash` varchar(1000) DEFAULT NULL, `email` varchar(45) DEFAULT NULL, `username` varchar(45) DEFAULT NULL, `first_name` varchar(100) DEFAULT NULL, `last_name` varchar(100) DEFAULT NULL, `address` varchar(200) DEFAULT NULL, `address_2` varchar(200) DEFAULT NULL, `city` varchar(45) DEFAULT NULL, `state` varchar(45) DEFAULT NULL, `zip` int DEFAULT NULL, `phone` varchar(45) DEFAULT NULL, `verify_hash` varchar(1000) DEFAULT NULL, `verified` tinyint(1) DEFAULT '0' COMMENT '0 = false\n1 = true', PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;", (err, rows) => {
  console.log("created users", rows);
});

pool.query("INSERT IGNORE INTO users (passhash, email, username, verify_hash) VALUES('$2y$10$bkX20HI6GESVfJ1oIqjwS.ebpo9w5ZImnbioJnvTmaQY5bfHb.nGu', 'ADMIN', 'ADMIN', '0');", (err, rows) => {
  console.log("created users", rows);
});

pool.query("INSERT IGNORE INTO users (passhash, email, username, verify_hash) VALUES('$2y$10$ny2ER5P7H9jpKoBwnE/DCeOCy0eaxdrW3zwvnHyHK6bYTIqOZF3si', 'USER', 'USER', '0');", (err, rows) => {
  console.log("created users", rows);
});

pool.on("connection", function (connection) {

  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = pool;
