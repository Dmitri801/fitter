const fetch = require("node-fetch");

let workoutsController = {
  getSomeData() {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then(data => console.log(data));
  }
};

module.exports = workoutsController;
