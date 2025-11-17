import express from 'express'
import cors from 'cors'
import location from './routes/location.routes.js'
import connectDB from './db/index.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5174/",
    credentials: true,
}))

//data comes to body
app.use(express.json())

app.use('/user/api/', location);


connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port : ${port}`)
    })
})
.catch((error) => {
    console.log(`Mongo DB connection Failed on server !!! ${error}`)
})

app.get('/', (req, res) => {
    res.send("hello world")
})

// app.listen(port, ()=> {
//     console.log("Example app listening on port", port); 
// })