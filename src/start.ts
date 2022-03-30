import bot from './bot'
import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())

bot()

app.listen(process.env.PORT, (r) =>
  console.log(`API subiu na porta ${process.env.PORT}`)
);