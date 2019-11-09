CREATE TABLE Admin (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO Admin (email, password)
VALUES  ('mugenya@email.com', '12345');
