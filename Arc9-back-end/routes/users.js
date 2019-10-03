var express = require('express');
var router = express.Router();
const db = require('./db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next)=>{
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password



  db.any(
    `insert into users
     (username, email, password) 
     values
     ($1,$2,$3)
     returning id
    `, [username, email, password]
  )
  .then((userData)=>{
    console.log(userData)
    res.json(req.body)
  })
  
  
})

module.exports = router;
