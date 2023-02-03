const express = require('express')

const { sequelize, User, Post } = require('./models')

const app = express()
app.use(express.json())
app.use(function(req,res,next){
  res.header('Access-COntrol-Allow-Origin',"*");
  res.header('Access-COntrol-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-COntrol-Allow-Headers','Content-Type');
  next();
})
app.post('/users', async (req, res) => {
  const { name, email, role ,password} = req.body

  try {
    const user = await User.create({ name, email, role ,password})

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})
// ====================================================
// get users data
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
// ====================================================
// getb data of users by  name
app.get('/users/:name', async (req, res) => {
  const name = req.params.name
  console.log("console at name")
  try {
    
    const user = await User.findAll({
      where: { name },
      
      // include: 'posts',
    })

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
// =====================================================
// get using id
app.get('/usersById/:id', async (req, res) => {
  const id = req.params.id
  console.log("logggg chk",req.params)
  try {
    
    const res1 = await User.findOne({
      where: { id :id},
      // include: 'posts',
    })
    console.log("res check", res1);

    return res.json(res1)
  } catch (err) {
    console.log(err)
    console.log("logggg",id)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
// ==========================================================
// delete user by name
app.delete('/users/:name', async (req, res) => {
  const name = req.params.name
  try {
    console.log("delete console log")
    const user = await User.findOne({ where: { name } })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
// ====================================
// delete user by name
app.delete('/usersById/:id', async (req, res) => {
  const id = req.params.id
  try {
    console.log("delete console log")
    const user = await User.findOne({ where: { id} })

    await user.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
// ===============================
// put (change) the information of user by name
app.put('/users/:name', async (req, res) => {
  const name = req.params.name
  const {  email, role,password } = req.body
  try {
    const user = await User.findOne({ where: { name } })

    user.name = name
    user.email = email
    user.role = role
    user.password=password

    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
// ======================================================
// put (change) the information of user by id
app.put('/usersById/:id', async (req, res) => {
  const id = req.params.id
  const { name, email, role,password } = req.body
  try {
    const user = await User.findOne({ where: { id } })

    user.name = name
    user.email = email
    user.role = role
    user.password=password

    await user.save()

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
// =========================================
app.listen({ port: 3000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()                    //tells whether the connection get succesfully connected
  console.log('Database Connected!')
})