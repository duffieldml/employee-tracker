DROP DATABASE IF EXISTS trackerDB;
CREATE database trackerDB;

USE trackerDB;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) ,
  PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT NOT NULL,
  title VARCHAR(30) ,
  salary DECIMAL(10,2) ,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;