let express = require('express')
let app = express()
let port = process.env.PORT || 3000
let bodyParser = require('body-parser')

let todoRoutes = require('./routes/todos')

app.get('/', (request, response) => response.send("Hello from the root route") )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/todos', todoRoutes) // prefixing this route to all routes in todoRoutes

// to start the server
app.listen(port, () => console.log("App is running on port " + port) )