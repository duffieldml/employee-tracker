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

CREATE TABLE manager (
  id INT NOT NULL,
  name VARCHAR(50),
  title VARCHAR(30),
  department VARCHAR(30),
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;
SELECT * FROM manager;

INSERT INTO manager (id, name, title, department) values (1, 'Mark Twain', 'Sales Manager', 'Sales');
INSERT INTO manager (id, name, title, department) values (2, 'Rex Captain', 'Engineering Manager', 'Engineering');
INSERT INTO manager (id, name, title, department) values (3, 'Spencer Burley', 'Legal Lead', 'Legal');
INSERT INTO manager (id, name, title, department) values (4, 'Jeff Flynn', 'Finance Manager', 'Finance');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (1, 'Jane', 'Austen', 1, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (2, 'Mark', 'Twain', 2, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (3, 'Lewis', 'Carroll', 3, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (4, 'Rex', 'Captain', 4, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (5, 'Matthew', 'Stanholm', 5, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (6, 'Miranda', 'Stanholm', 6, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (7, 'Spencer', 'Burley', 7, Null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (8, 'Jasper', 'Repsaj', 8, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (9, 'Grant', 'Botsford', 9, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (10, 'Jeff', 'Flynn', 10, NULL);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (11, 'Nick', 'Fergie', 11, 4);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) values (12, 'Fred', 'Betz', 12, 4);

INSERT INTO employee_role (id, title, salary, department_id) values (1, 'Outside Sales', 80000, 1);
INSERT INTO employee_role (id, title, salary, department_id) values (2, 'Sales Manager', 120000, 1);
INSERT INTO employee_role (id, title, salary, department_id) values (3, 'Outside Sales', 90000, 1);
INSERT INTO employee_role (id, title, salary, department_id) values (4, 'Engineering Manager', 125000, 2);
INSERT INTO employee_role (id, title, salary, department_id) values (5, 'Engineer', 100000, 2);
INSERT INTO employee_role (id, title, salary, department_id) values (6, 'Engineer', 105000, 2);
INSERT INTO employee_role (id, title, salary, department_id) values (7, 'Legal Lead', 200000, 3);
INSERT INTO employee_role (id, title, salary, department_id) values (8, 'Lawyer', 170000, 3);
INSERT INTO employee_role (id, title, salary, department_id) values (9, 'Paralegal', 150000, 3);
INSERT INTO employee_role (id, title, salary, department_id) values (10, 'Finance Manager', 100000, 4);
INSERT INTO employee_role (id, title, salary, department_id) values (11, 'Accountant', 70000, 4);
INSERT INTO employee_role (id, title, salary, department_id) values (12, 'Accountant', 65000, 4);


INSERT INTO department (id, name) values (1, 'Sales');
INSERT INTO department (id, name) values (2, 'Engineering');
INSERT INTO department (id, name) values (3, 'Legal');
INSERT INTO department (id, name) values (4, 'Finance');
