[![Build Status](https://travis-ci.com/bmugenya/Teamwork.svg?branch=develop)](https://travis-ci.com/bmugenya/Teamwork)          [![Coverage Status](https://coveralls.io/repos/github/bmugenya/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/bmugenya/Teamwork?branch=develop)

# Teamwork
Teamwork is an ​ internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.


### API End points
Method | Endpoint | Function |
| ------ | -------------| --------------- |
|ADMIN| . |   .   |
|POST| `/api/v1/auth/create-user` | Admin can create an employee user account. |
|POST| `/api/v1/auth/signin` | Admin/Employees can sign in. |
|GET| `/api/v1/flags` | Admin can view all reported post. |
|DELETE| `/api/v1/flag` | Admin can delete flaged post. |
|EMPLOYEE| . |   .   |
|POST| `/api/v1/articles` | Employees can write and post articles. |
|POST| `/api/v1/gifs` | Employees can post gifs. |
|PATCH| `/api/v1/articles/<articleId>` |Employees can edit their articles. |
|DELETE| `/api/v1/articles/<articleId>` | Employees can delete their articles. |
|DELETE| `/api/v1/gifs/<gifId>` | Employees can delete their gifs post. |
|POST| `/api/v1/articles/<articleId>/comment` |Employees can comment on other colleagues' article post. |
|POST| `/api/v1/gifs/<gifId>/comment` | Employees can comment on other colleagues' gif post. |
|GET| `/api/v1/feed` |  Employees can view all articles in descending order. |
|GET| `/api/v1/article/<articleId>` | Employees can view a specific article. |
|GET| `/api/v1/gif/<gifId>` | Employees can view a specific gif post. |
|GET| `/api/v1/feed/search?category={category}` |  Employees can view all articles that belong to a category (tag). |
|POST| `/api/v1/articles/<articleId>/flag` | Employees can flag an article as inappropriat |
|POST| `/api/v1/gifs/<gifId>/flag` | Employees can flag a gif as inappropriat |


## Testing

First, you will need to run postman
