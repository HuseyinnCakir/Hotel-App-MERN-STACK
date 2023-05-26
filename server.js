import 'express-async-errors'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import dotenv from 'dotenv'

import connectDB from './db/connect.js'
import authRouter from './routes/authRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import uploadImage from './middleware/lib/upload.js'
import morgan from 'morgan'
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
/* MİDDLEWARE */
import notFoundMiddleware from './middleware/not-found.js'
import errorHandleMiddleware from './middleware/error-handler.js'

import bodyParser from 'body-parser'
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
if ((process.env.NODE_ENV = !'production')) {
  app.use(morgan('dev'))
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
//app.use(uploadImage)
/*app.post('/api/v1/admin/postHomeImage', (req, res, next) => {
  try {
    uploadImage(req, res, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.json(req.images).status(200)
      }
    })
  } catch (error) {
    console.log('hata olustu')
  }
})*/
app.use(uploadImage)
//app.use(cookieParser())

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/admin', adminRouter)
app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
