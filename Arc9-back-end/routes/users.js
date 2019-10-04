var express = require('express');
var router = express.Router();
const db = require('./db')
const bcrypt = require('bcryptjs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next)=>{
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
//   console.log(req.body)
// res.json({
//   msg: 'Youve reached the backend'
// })

  db.one(
    `insert into users
     (username, email, password) 
     values
     ($1,$2,$3)
     returning *
    `, [username, email, bcrypt.hashSync(password, 10)] //encodes password
  )
  .then((userData)=>{
    console.log(userData)
    res.json(userData)
    // res.send(`The id of the user you just created was ${userData.id}. The username was: ${userData.username}.`)
  })
  
  
})

router.post('/login', (req, res, next)=>{
  const username = req.body.username
  const password = req.body.password

  db.one(
    `select * from users where username = $1
    `,[username]
  ).then(
    (userData)=>{
      console.log(userData)
      const dbPassword = userData.password
      const isCorrectPassword = bcrypt.compareSync(password, dbPassword)//hash's first string and compares it to the hasshed string
        if (isCorrectPassword){
          console.log(userData)
          res.json(userData)
        }else{
          res.send('Fail')
        }
    }
  )

})

module.exports = router;
