const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Task 10: Get the book list available in the shop using Promises
public_users.get('/', function (req, res) {
  const get_books = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({books}, null, 4)));
  });
  get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  new Promise((resolve, reject) => {
      if (books[isbn]) {
          resolve(res.send(JSON.stringify(books[isbn], null, 4)));
      } else {
          reject(res.status(404).json({message: "ISBN not found"}));
      }
  });
});
  
// Task 12: Get book details based on author using Promises
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  new Promise((resolve, reject) => {
    let results = Object.values(books).filter((book) => book.author === author);
    resolve(res.send(JSON.stringify(results, null, 4)));
  });
});

// Task 13: Get all books based on title using Promises
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  new Promise((resolve, reject) => {
    let results = Object.values(books).filter((book) => book.title === title);
    resolve(res.send(JSON.stringify(results, null, 4)));
  });
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
