let express = require('express')
let app = express()
let port = process.env.PORT || 3000

app.get('/', (request, response) => response.send({msg: "Hello from express"}) )

// to start the server
app.listen(port, () => console.log("App is running on port " + port) )