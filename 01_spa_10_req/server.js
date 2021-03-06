/*
 Incredibly simple Node.js and Express application server for serving static assets.
 Given as an example from the React Router documentation (along with examples
 using nginx and Apache):
 - https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#browserhistory
 */

const express = require('express');
const path = require('path');
const port = process.env.PORT || 4222;
const app = express();
const cors = require('cors')
const router = express.Router();


app.use(express.static(__dirname + '/dist'));

router.get('*', function(req, res) {
  console.log(path.resolve(__dirname, 'dist/index.html'))
  console.log('get me')
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  res.location = req.originalUrl
});

// apply the routes to our application
app.use('/',router);



app.listen(port);
console.log("server started on port http://localhost:" + port);
