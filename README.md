[![Build Status](https://travis-ci.com/bmugenya/Teamwork.svg?branch=develop)](https://travis-ci.com/bmugenya/Teamwork)          [![Coverage Status](https://coveralls.io/repos/github/bmugenya/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/bmugenya/Teamwork?branch=develop)

# Teamwork
Teamwork is an ​ internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.


### API End points
Method | Endpoint | Function |
| ------ | -------------| --------------- |
|ADMIN| . |   .   |
|POST| `/api/v1/admin/register` | sign up. |
|POST| `/api/v1/admin/login` | sign in. |
|POST| `/api/v1/admin/newemployee` | create employee account. |
|DELETE| `/api/v1/admin/article_id` | delete flaged article. |
|DELETE| `/api/v1/admin/gifs_id` | delete flaged gifs. |
|DELETE| `/api/v1/admin/comment_id` | delete flaged comment. |
|EMPLOYEE| . |   .   |
|POST| `/api/v1/articles` | create an article. |
|POST| `/api/v1/gifs` | create a gif. |
|PATCH| `/api/v1/articles/<articleId>` | Edit an article. |
|DELETE| `/api/v1/articles/<articleId>` | Delete an article. |
|DELETE| `/api/v1/gifs/<gifId>` | Delete a gif. |
|POST| `/api/v1/articles/<articleId>/comment` | comment on an article. |
|POST| `/api/v1/gifs/<gifId>/comment` | comment on a gif. |
|GET| `/api/v1/feed` | view all articles. |
|GET| `/api/v1/article/<articleId>` | view a specific article. |
|GET| `/api/v1/gif/<gifId>` | view a specific gif. |
|GET| `/api/v1/feed/search?category={category}` | view similar articles. |
|POST| `/api/v1/articles/<articleId>/flag` | Flag article as inappropriate. |
|POST| `/api/v1/gifs/<gifId>/flag` | Flag gif as inappropriate. |

