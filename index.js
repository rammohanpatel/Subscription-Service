import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import workflowRoute from './routes/workflow.routes.js'
import subscriptionRoutes from './routes/subscription.routes.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'

const app = express();
dotenv.config()

// Setting the middlewares
// For allowing different domains of frontend
app.use(cors());
// For parsing the json data
app.use(express.json());
// For parsing the html form data
app.use(express.urlencoded({ extended: true }))

app.use(arcjetMiddleware)
app.use(errorMiddleware)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use(subscriptionRoutes)
app.use('/workflows',workflowRoute)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Database Connected')
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on : http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => console.error(error.message))
