CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(10) AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(10,2),
  stock_quantity INTEGER(10)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("charger", "tech", 12, 48),
("camera", "tech", 149.50, 22),
("hat", "clothes", 19.99, 33),
("blender", "appliances", 49.99, 12),
("tent", "outdoors", 229.99, 7),
("phone case", "tech", 17.49, 47),
("wireless headphones", "tech", 199.99, 19),
("vacuum", "appliances", 89.99, 20),
("keyboard", "tech", 69.99, 7),
("purse", "clothes", 149.99, 4)
;
