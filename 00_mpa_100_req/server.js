/*
 Incredibly simple Node.js and Express application server for serving static assets.
 Given as an example from the React Router documentation (along with examples
 using nginx and Apache):
 - https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#browserhistory
 */

const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();


app.use(express.static(__dirname + '/dist'));


app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
})
app.listen(port);
console.log("server started on port http://localhost:" + port);
