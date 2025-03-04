import express from 'express';
// Import de library express
import 'dotenv/config';
import usersRouter from './routes/usersRouter.js';

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', usersRouter)

app.get('/', (req, res) => {
    res.send("Welcome to the Users API")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})