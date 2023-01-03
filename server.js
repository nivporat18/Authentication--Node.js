const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.URL_MONGODB, 
	{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,
	})
.then(()=>{
	console.log('Connected MongoDB');
	})
.catch((e)=>{
	console.log("Something went wrong", e);
	})



const authRoute = require('./routes/auth')
app.use('/api',authRoute)

app.use('/',(req,res)=>{
    res.send('Go to api/register OR api/login')
})


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})