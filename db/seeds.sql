INSERT INTO department (name)
VALUES ("Engineering"),
    ("Finance"),
    ("Legal"),
    ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Account Manager", 160000, 2),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Wall", "Mart", 2, NULL),
    ("John", "Lennon", 3, NULL),
    ("Paul", "McCartney", 2, NULL),
    ("George", "Harrison", 4, NULL),
    ("Ringo", "Star", 1, NULL),
    ("Ice", "Cube", 3, NULL),
    ("Fifty", "Cent", 2, NULL),
    ("Jim", "Carrey", 3, NULL),
    ("Will", "Farrell", 1, NULL),
    ("Mark", "Wahlberg", 2, NULL),
    ("Chipper", "Jones", 3, NULL),
    ("Tim", "Hudson", 4, NULL),
    ("Kayne", "West", 1, NULL),
    ("Cold", "Play", 3, NULL),
    ("System", "Down", 2, NULL),
    ("Marshall", "Mathers", 3, NULL),
    ("Kali", "Uchis", 4, NULL);