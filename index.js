const express = require('express')
const app = express()
const port = process.env.PORT || 5000
var cors = require('cors')

app.use(express.json())
app.use(cors())

app.use(express.static(__dirname + '/public'));
app.use('/api', require('./router/route'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
