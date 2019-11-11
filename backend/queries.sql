CREATE TABLE Admin (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE Employee (
  ID SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL,
  jobRole VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL
);


CREATE TABLE Article (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  article VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(ID) NOT NULL
);

CREATE TABLE Gifs (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(ID) NOT NULL
);

CREATE TABLE CommentArticle (
  ID SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(ID),
  article_id INT REFERENCES Article(ID)
);

CREATE TABLE CommentGif (
  ID SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  employee_id INT REFERENCES Employee(ID),
  gif_id INT REFERENCES Gifs(ID)
);


CREATE TABLE Flagged (
  ID SERIAL PRIMARY KEY,
  comment VARCHAR(255) NOT NULL,
  createdOn DATE NOT NULL DEFAULT CURRENT_DATE,
  type VARCHAR(255) NOT NULL,
  type_id INT NOT NULL,
  employee_id INT REFERENCES Employee(ID)
);
