INSERT INTO department(name)
VALUES ("CEO")
VALUES ("operations")
VALUES ("marketing")
VALUES ("technology")
VALUES ("administration")
VALUES ("sales")
VALUES ("finance")
VALUES ("product");

INSERT INTO role(title, salary, department_id)
VALUES
("ceo", 350000, 1),
("qa_specialist", 90000, 2),
("qa_director", 150000, 2),
("coo", 250000, 2),
("sr_content_writer", 120000, 3),
("content_specialist", 115000, 3),
("cmo", 200000, 3),
("software_engineer", 95000, 4),
("sr_developer", 130000, 4),
("cto", 220000, 4),
("executive_secretary", 220000, 5),
("sr_account_rep", 110000, 6),
("outbound_sales_rep", 110000, 6),
("svp_sales", 290000, 6),
("cfo", 295000, 7),
("ux_designer", 110000, 8),
("director_ux", 110000, 8),
("vp_product", 210000, 8),
("product_manager", 150000, 8);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
("Jane", "Doe", 22)