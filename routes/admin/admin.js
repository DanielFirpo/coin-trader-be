var express = require("express");
var router = express.Router();

var adminRestricted = require("../../middleware/adminRestricted");

var db = require("../../mysqlConfig");

const multer = require("multer");

const fs = require("fs");
const path = require("path");

router.post(
  "/add",
  adminRestricted,
  //   multer().array("images", 2),
  multer().fields([
    {
      name: "front",
      maxCount: 1,
    },
    {
      name: "back",
      maxCount: 1,
    },
  ]),
  (req, res) => {

    if (!req.body) {
      console.log("no body");
      return res.status(400).send({
        message:
          "Something went wrong. Make sure you filled out every form field.",
        errors: ["no data sent"],
      });
    }
    console.log(req.body);
    if (
      !req.body.name ||
      !req.body.year ||
      !req.body.price ||
      !req.body.status ||
      !req.body.rating ||
      !req.body.manufacturer
    ) {
      console.log(
        req.body.name +
          " " +
          !req.body.year +
          " " +
          !req.body.price +
          " " +
          !req.body.status +
          " " +
          !req.body.rating +
          " " +
          !req.body.manufacturer
      );
      return res.status(400).send({
        message:
          "Something went wrong. Make sure you filled out every form field.",
        errors: ["data sent but missing an item"],
      });
    }
    if (req.body.status != 0 && req.body.status != 1 && req.body.status != 2) {
      req.body.status = 0;
    }

    let imageName = Math.floor(Math.random() * 900000) + 100000 + "-";
    let frontFilename = "no-image";
    let backFilename = "no-image";

    if(req.files.front?.[0]) {
        frontFilename = imageName + "front";
        fs.writeFileSync(path.join(path.dirname(__filename), "..", "..", "public", "images", "products", frontFilename + ".png"), req.files.front[0].buffer);
    }
    if(req.files.back?.[0]) {
        backFilename = imageName + "back";
        fs.writeFileSync(path.join(path.dirname(__filename), "..", "..", "public", "images", "products", backFilename + ".png"), req.files.back[0].buffer);
    }

    db.query(
      `INSERT INTO coins (name, front_image_name, back_image_name, year, price, description, status, rating, manufacturer) VALUES ('${
        req.body.name
      }', '${frontFilename}', '${backFilename}', ${req.body.year}, ${
        req.body.price * 100
      }, '${req.body.description}', ${parseInt(req.body.status)}, ${parseInt(
        req.body.rating
      )}, ${parseInt(req.body.manufacturer)})`,
      (err, rows) => {
        if (err) {
          console.log("SQL Error", err);
          return res.status(400).send({
            message: "Something went wrong. Please try again.",
            errors: err,
          });
        }

        return res.status(200).send({ message: "Added product successfully." });
      }
    );
  }
);

router.post("/edit", adminRestricted, multer().single("front"),(req, res) => {

    console.log(" file", req.body);
  if (!req.body || !req.body.status) {
    return res.status(400).send({
      message:
        "Something went wrong. Make sure you filled out every form field.",
      errors: ["no data sent"],
    });
  }
  if (!req.body.id) {
    return res.status(400).send({
      message: "Something went wrong. Please try again.",
      errors: ["no id to edit sent"],
    });
  }
  if (req.body.status != 0 && req.body.status != 1 && req.body.status != 2) {
    req.body.status = 0;
  }
  // if(!req.data.name || !req.data.image_name || !req.data.year || !req.data.price || !req.data.description){
  //     return res.status(400).send({ message: "Something went wrong. Make sure you filled out every form field.", errors: ["data sent but missing an item"] })
  // }    let filename = "no-image.png"
  let valuesToUpdate = "";
  if (req.body.name) {
    valuesToUpdate += `name = '${req.body.name}'`;
  }
//   if (req.file) {
//     valuesToUpdate += `, image_name = '${req.file.location}'`;
//   }
  if (req.body.year) {
    valuesToUpdate += `, year = '${req.body.year}'`;
  }
  if (req.body.price) {
    valuesToUpdate += `, price = '${req.body.price * 100}'`;
  }
  if (req.body.description) {
    valuesToUpdate += `, description = '${req.body.description}'`;
  } else {
    valuesToUpdate += `, description = ''`;
  }
  valuesToUpdate += `, status = ${req.body.status}`;
  valuesToUpdate += `, rating = ${req.body.rating}`;
  valuesToUpdate += `, manufacturer = ${req.body.manufacturer}`;

  db.query(
    `UPDATE coins SET ${valuesToUpdate} WHERE id = ${req.body.id}`,
    (err, results, fields) => {
      if (err) {
        console.log("SQL ERROR " + err, "values to update: " + valuesToUpdate);
        return res.status(400).send({
          message: "Something went wrong. Please try again.",
          errors: err,
        });
      }
      console.log("worked", req.file)
      if (req.file) {
      fs.writeFileSync(path.join(path.dirname(__filename), "..", "..", "public", "images", "products", req.body.front_image_name + ".png"), req.file.buffer);
      }
      return res.status(200).send({ message: "Edited product successfully." });
    }
  );
});

router.delete("/delete", adminRestricted, (req, res) => {
    console.log("req", req.query, req.body)
  if (!req.query.id) {
    return res.status(400).send({
      message: "Something went wrong. Please try again.",
      error: "no id provided",
    });
  }
  id = req.query.id;

  db.query(`SELECT * FROM coins WHERE id = ${id}`, (err, rows, res) => {
    if (err) {
      console.log("SQL error", err);
      return res.status(400).send({
        message: "Something went wrong. Please try again.",
        errors: err,
      });
    }

    fs.unlinkSync(path.join(path.dirname(__filename), "..", "..", "public", "images", "products", rows[0].front_image_name + ".png"));
    fs.unlinkSync(path.join(path.dirname(__filename), "..", "..", "public", "images", "products", rows[0].back_image_name + ".png"));
    
  });

  db.query(`DELETE FROM coins WHERE id = ${id}`, (err, rows) => {
    if (err) {
      console.log("SQL error", err);
      return res.status(400).send({
        message: "Something went wrong. Please try again.",
        errors: err,
      });
    }
    console.log("rows", rows)
    return res.status(200).send({ message: "Deleted product successfully." });
  });
});

// get orders, filtered by status (defaults to 0, "placed") and by optional searchTerm
router.get("/orders", adminRestricted, (req, res) => {
  //req.query.status
  //req.query.searchTerm
  if (req.query.status != 0 && req.query.status != 1 && req.query.status != 2) {
    req.query.status = 0;
  }
  db.query(
    `SELECT * FROM orders WHERE status = ${req.query.status}`,
    (err, rows) => {
      if (err) {
        console.log("SQL error", err);
        return res.status(400).send({
          message: "Something went wrong. Please try again.",
          errors: err,
        });
      }
      console.log(rows);
      return res
        .status(200)
        .send({ message: "Orders delivered successfully.", orders: rows });
    }
  );
});

// get order
router.get("/order", adminRestricted, (req, res) => {
  let order;

  db.query(`SELECT * FROM orders WHERE id = ${req.query.id}`, (err, rows) => {
    if (err) {
      return res.status(400).send({
        message: "Something went wrong. Please try again.",
        errors: err,
      });
    }
    order = rows[0];
    db.query(
      `SELECT order_items.coinid FROM orders INNER JOIN order_items ON 
        orders.id=order_items.orderid WHERE orders.id = ${req.query.id}`,
      (err, rows2) => {
        let coinsQuery = "";

        rows2.forEach((coin) => {
          console.log(coin.coinid);
          coinsQuery += " OR id = " + coin.coinid;
        });

        //remove first OR
        coinsQuery = coinsQuery.substring(4);

        console.log(`SELECT * FROM coins WHERE ${coinsQuery}`);
        db.query(`SELECT * FROM coins WHERE ${coinsQuery}`, (err, rows3) => {
          console.log(rows3);
          order.items = rows3;
          return res
            .status(200)
            .send({ message: "Order delivered successfully.", order: order });
        });
      }
    );
  });
});

router.get("/searchorders", adminRestricted, (req, res) => {
  //req.query.status
  //req.query.searchTerm
  if (req.query.status != 0 && req.query.status != 1 && req.query.status != 2) {
    req.query.status = 0;
  }
  db.query(
    `SELECT * FROM orders WHERE status = ${req.query.status} AND first_name LIKE '%${req.query.searchTerm}%' 
    OR last_name LIKE '%${req.query.searchTerm}%' OR address LIKE '%${req.query.searchTerm}%' OR address_2 LIKE '%${req.query.searchTerm}%' 
    OR city LIKE '%${req.query.searchTerm}%' OR state LIKE '%${req.query.searchTerm}%' OR zip LIKE '%${req.query.searchTerm}%' 
    OR phone LIKE '%${req.query.searchTerm}%' OR email LIKE '%${req.query.searchTerm}%'`,
    (err, rows) => {
      if (err) {
        console.log("SQL error", err);
        return res.status(400).send({
          message: "Something went wrong. Please try again.",
          errors: err,
        });
      }
      console.log(rows);
      return res
        .status(200)
        .send({ message: "Orders delivered successfully.", orders: rows });
    }
  );
});

router.put("/orderstatus", adminRestricted, (req, res) => {
  //req.body.status
  //req.query.id

  if (
    (req.body.status != 0 && req.body.status != 1 && req.body.status != 2) ||
    !req.query.id
  ) {
    return res.status(400).send({
      message: "Something went wrong. Please try again.",
      errors: "Invalid status sent, or no id param",
    });
  }
  db.query(
    `UPDATE orders SET status = ${req.body.status} WHERE id = ${req.query.id}`,
    (err, rows) => {
      if (err) {
        console.log("SQL error", err);
        return res.status(400).send({
          message: "Something went wrong. Please try again.",
          errors: err,
        });
      }
      console.log(rows);
      return res
        .status(200)
        .send({ message: "Orders delivered successfully.", orders: rows });
    }
  );
});

router.post("/storesettings", adminRestricted, (req, res) => {
  let query = "";

  if (req.body.tax_rate) {
    query +=
      "tax_rate = " + req.body.tax_rate + (req.body.shipping_fee ? ", " : "");
  }

  if (req.body.shipping_fee) {
    query += "shipping_fee = " + req.body.shipping_fee;
  }

  if (!req.body.tax_rate && !req.body.shipping_fee) {
    console.log("here");
    return res
      .status(400)
      .send({ message: "Something went wrong. Please try again." });
  }

  console.log(`UPDATE store_settings SET ${query}`);
  db.query(`UPDATE store_settings SET ${query}`, (err, rows) => {
    if (err) {
      console.log("sql");
      return res.status(400).send({
        message: "Something went wrong. Please try again.",
        errors: err,
      });
    }
    return res
      .status(200)
      .send({ message: "Successfully updated store settings." });
  });
});

router.get("/storesettings", (req, res) => {
  db.query("SELECT * FROM store_settings", (err, rows) => {
    if (err) {
      return res.status(400).send({
        message: "Something went wrong. Please try again.",
        errors: err,
      });
    }
    return res.status(200).send({ ...rows[0] });
  });
});

module.exports = router;
