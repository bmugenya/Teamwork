-- createdb Teamwork
-- createdb teamwork_tdd

CREATE TABLE Employee (
  employee_id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  jobRole VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  is_admin BOOLEAN NOT NULL
);


CREATE TABLE Article (
  article_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  article TEXT NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(employee_id) NOT NULL
);

CREATE TABLE Gifs (
  gif_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(employee_id) NOT NULL
);

CREATE TABLE CommentArticle (
  ID SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(employee_id),
  article_id INT REFERENCES Article(article_id)
);

CREATE TABLE CommentGif (
  ID SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(employee_id),
  gif_id INT REFERENCES Gifs(gif_id)
);


CREATE TABLE Flagged (
  ID SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  type VARCHAR(255) NOT NULL,
  flag TEXT NOT NULL,
  flag_title VARCHAR(255) NOT NULL,
  type_id INT NOT NULL,
  employee_id INT REFERENCES Employee(employee_id)
);
