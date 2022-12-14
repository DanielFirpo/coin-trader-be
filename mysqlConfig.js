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


//create required tables add some example data if not added
pool.query(
  "CREATE TABLE IF NOT EXISTS `coins` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(1000) DEFAULT 'Unamed Coin', `front_image_name` varchar(1000) NOT NULL DEFAULT 'noimage', `year` int DEFAULT NULL,`price` int DEFAULT NULL, `description` varchar(1000) DEFAULT NULL, `status` tinyint DEFAULT '0', `rating` tinyint DEFAULT '0' COMMENT '0 = poor\\n1 = average\\n2 = great\\n3 = exellent',`manufacturer` tinyint DEFAULT '0' COMMENT '0 = P\n1 = S\n2 = D',`back_image_name` varchar(1000) NOT NULL DEFAULT 'noimage.png',PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='status:\n0 = unlisted\n1 = listed\n2 = sold';",
  (err, rows) => {
    console.log("created coins", rows);

    pool.query(
      `SELECT * FROM coins WHERE back_image_name='1back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Fantastic Coin', '1front', '1back', '1997', '1299', 'An old coin in fantastic condition', '1', '3', '0')`
          );
        }
      }
    );

    pool.query(`SELECT * FROM coins WHERE back_image_name='2back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Golden Treasure', '2front', '2back', '1995', '999', 'A beautiful and rare coin from 1995', '1', '3', '1')`
        );
      }
    });
    
    pool.query(`SELECT * FROM coins WHERE back_image_name='3back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Mysterious Coin', '3front', '3back', '2000', '899', 'A unique and intriguing coin from 2000', '1', '2', '2')`
        );
      }
    });
    
    pool.query(`SELECT * FROM coins WHERE back_image_name='4back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Fabled Coin', '4front', '4back', '1990', '1499', 'A legendary coin with a rich history', '1', '2', '0')`
        );
      }
    });
    
    pool.query(`SELECT * FROM coins WHERE back_image_name='5back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Exquisite Coin', '5front', '5back', '1987', '999', 'A truly exquisite coin from 1987', '1', '3', '1')`
        );
      }
    });
    
    pool.query(`SELECT * FROM coins WHERE back_image_name='6back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Magnificent Coin', '6front', '6back', '1996', '1299', 'A magnificent coin from 1996', '1', '3', '2')`
        );
      }
    });
    
    pool.query(`SELECT * FROM coins WHERE back_image_name='7back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Stunning Coin', '7front', '7back', '2001', '799', 'A stunning coin from 2001', '1', '4', '1')`
        );
      }
    });
    
    pool.query(`SELECT * FROM coins WHERE back_image_name='8back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Rare Coin', '8front', '8back', '1991', '1199', 'A rare and valuable coin from 1991', '1', '3', '2')`
        );
      }
    });
    
    pool.query(`SELECT * FROM coins WHERE back_image_name='9back'`, (err, rows) => {
      console.log(rows);
      if (rows.length == 0) {
        pool.query(
          `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Beautiful Coin', '9front', '9back', '1998', '999', 'A beautiful and well-crafted coin from 1998', '1', '4', '0')`
        );
      }
    });
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='10back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Distinguished Coin', '10front', '10back', '1995', '1299', 'A distinguished coin with a rich history', '1', '3', '1')`
          );
        }
      }
    );
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='11back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Exclusive Coin', '11front', '11back', '1993', '999', 'A highly exclusive and limited edition coin', '1', '4', '2')`
          );
        }
      }
    );
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='12back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Cheap Coin', 'no-image', '12back', '2000', '99', 'A cheap and poorly-made coin from 2000', '1', '1', '1')`
          );
        }
      }
    );
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='13back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Common Coin', 'no-image', '13back', '1990', '199', 'A common and uninteresting coin from 1990', '1', '1', '2')`
          );
        }
      }
    );
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='14back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Worthless Coin', 'no-image', '14back', '1995', '49', 'A virtually worthless coin from 1995', '1', '0', '0')`
          );
        }
      }
    );
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='15back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Counterfeit Coin', 'no-image', '15back', '1985', '199', 'A fake and counterfeit coin from 1985', '1', '0', '1')`
          );
        }
      }
    );
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='16back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Damaged Coin', 'no-image', '16back', '1980', '99', 'A flawed and damaged coin from 1980', '1', '1', '2')`
          );
        }
      }
    );
    
    pool.query(
      `SELECT * FROM coins WHERE back_image_name='17back'`,
      (err, rows) => {
        console.log(rows);
        if (rows.length == 0) {
          pool.query(
            `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('Poorly-Made Coin', 'no-image', '17back', '1995', '69', 'A shoddy and poorly-made coin from 1995', '1', '0', '0')`
          );
        }
      }
    );
  }
);

pool.query(
  "CREATE TABLE IF NOT EXISTS `order_items` (`orderid` int NOT NULL, `itemid` int DEFAULT '-1', `coinid` int DEFAULT '-1') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
  (err, rows) => {
    console.log("created order items", rows);
  }
);

pool.query(
  "CREATE TABLE IF NOT EXISTS `orders` (`id` int NOT NULL AUTO_INCREMENT, `userid` int DEFAULT '-1' COMMENT 'The user who purchased the items, -1 if they weren''t logged in at time of purchase', `status` int NOT NULL DEFAULT '0', `date` datetime DEFAULT NULL, `total` int DEFAULT '0', `first_name` varchar(100) NOT NULL, `last_name` varchar(100) NOT NULL, `address` varchar(200) NOT NULL, `address_2` varchar(200) DEFAULT NULL, `city` varchar(45) NOT NULL, `state` varchar(45) NOT NULL, `zip` int NOT NULL, `phone` varchar(45) NOT NULL, `email` varchar(45) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='status: 0 = placed, 1 = shipped, 2 = delivered';",
  (err, rows) => {
    console.log("orders", rows);
  }
);

pool.query(
  "CREATE TABLE IF NOT EXISTS `store_settings` (`tax_rate` int DEFAULT '725' COMMENT 'Divide tax_rate by 1000 then multiply with subtotal.', `shipping_fee` int DEFAULT '500' COMMENT 'Divide shipping_fee by 100 then add to sub total.') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
  (err, rows) => {
    console.log("created store settings", rows);
  }
);

pool.query(
  "INSERT INTO `store_settings` (tax_rate, shipping_fee) VALUES(725, 525)",
  (err, rows) => {
    console.log("created store settings", rows);
  }
);

pool.query(
  "CREATE TABLE IF NOT EXISTS `users` (`id` int NOT NULL AUTO_INCREMENT, `passhash` varchar(1000) DEFAULT NULL, `email` varchar(45) DEFAULT NULL, `username` varchar(45) DEFAULT NULL, `first_name` varchar(100) DEFAULT NULL, `last_name` varchar(100) DEFAULT NULL, `address` varchar(200) DEFAULT NULL, `address_2` varchar(200) DEFAULT NULL, `city` varchar(45) DEFAULT NULL, `state` varchar(45) DEFAULT NULL, `zip` int DEFAULT NULL, `phone` varchar(45) DEFAULT NULL, `verify_hash` varchar(1000) DEFAULT NULL, `verified` tinyint(1) DEFAULT '0' COMMENT '0 = false\n1 = true', PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",
  (err, rows) => {
    console.log("created users", rows);
  }
);

pool.query(
  "INSERT IGNORE INTO users (passhash, email, username, verify_hash) VALUES('$2y$10$bkX20HI6GESVfJ1oIqjwS.ebpo9w5ZImnbioJnvTmaQY5bfHb.nGu', 'ADMIN', 'ADMIN', '0');",
  (err, rows) => {
    console.log("created users", rows);
  }
);

pool.query(
  "INSERT IGNORE INTO users (passhash, email, username, verify_hash) VALUES('$2y$10$ny2ER5P7H9jpKoBwnE/DCeOCy0eaxdrW3zwvnHyHK6bYTIqOZF3si', 'USER', 'USER', '0');",
  (err, rows) => {
    console.log("created users", rows);
  }
);

pool.on("connection", function (connection) {
  connection.on("error", function (err) {
    console.error(new Date(), "MySQL error", err.code);
  });
  connection.on("close", function (err) {
    console.error(new Date(), "MySQL close", err);
  });
});

module.exports = pool;
