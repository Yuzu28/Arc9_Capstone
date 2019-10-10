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
  const username = req.body.activeName
  const password = req.body.activePass
    console.log('username ', username )
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
          console.log(password, dbPassword, isCorrectPassword)
          res.json(userData)
        }else{
          res.json({
            msg: 'password incorrect'
          })
        }
    }
  )

})

router.post('/favorites', (req, res, next)=>{
  console.log(req.body)
  const gameId = req.body.gameId
  const userId = req.body.userId
  const title = req.body.title
  const pathname = req.body.pathname
  const photo = req.body.photo

  db.one(`
  insert into favorites 
  (user_id, game_id, title, pathname, photo)
  values
  ($1,$2,$3,$4)
  returning *
  `, [userId, gameId, title, pathname, photo])
  .then(
    (favData)=>{
      console.log(favData)
      res.json(favData)
    }
    )
})


router.get('/favorites/:userID', (req, res, next)=>{
   const userID = req.params.userID
   return db.any(
     `
     select * from favorites where user_id = $1
     `, [userID]
   )
   .then(
     (results)=>{
       res.json(results)

     }
   )
})

router.get('/favorites/:photo', (req, res, next)=>{
  const photo = req.params.photo
  return db.any(
    `
    select * from favorites where user_id = $1
    `, [photo]
  )
  .then(
    (results)=>{
      console.log(`.get:/photo 
      ${results}`)
      res.json(results)
    }
  )
})



module.exports = router;
