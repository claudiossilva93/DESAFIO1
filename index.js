const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const checkIdadeMiddleWare = (req, res, next) => {
  const { age } = req.query

  if (age) {
    return next()
  }

  return res.redirect('/')
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('create')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', checkIdadeMiddleWare, (req, res) => {
  return res.render('major', {
    age: req.query.age
  })
})

app.get('/minor', checkIdadeMiddleWare, (req, res) => {
  return res.render('minor', {
    age: req.query.age
  })
})

app.listen(3000)
