var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  readProducts();
});

function readProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    promptUser();
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the product ID of the item you want?",
        name: "productID"
      },
      {
        type: "input",
        message: "How many of them do you want?",
        name: "productQuantity"
      }
    ])
    .then(function(inquirerResponse) {
      var productID = parseInt(inquirerResponse.productID);
      var productQuantity = parseInt(inquirerResponse.productQuantity);
      connection.query(
        `SELECT * FROM products WHERE ${productID} = item_id`,
        function(err, res) {
          if (err) throw err;
          var dbQuantity = res[0].stock_quantity;
          var dbPrice = res[0].price;
          if (productQuantity <= dbQuantity) {
            dbQuantity = dbQuantity - productQuantity;
            var totalPrice = productQuantity * dbPrice;
            console.log(`Total cost: $${totalPrice}`);
            updateProduct(dbQuantity, productID);
          } else {
            console.log("Insufficient quantity!");
            connection.end();
          }
        }
      );
    });
}

function updateProduct(newQuantity, itemID) {
  connection.query(
    `update products set stock_quantity = ${newQuantity} WHERE item_id = ${itemID}`,
    function(err, res) {
      if (err) throw err;
      console.log("Stock Updated");
      connection.end();
    }
  );
}
