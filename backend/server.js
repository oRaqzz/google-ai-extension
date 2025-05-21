require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const { GoogleGenerativeAI } = require('@google/generative-ai')

// server static file
const staticPath = path.join(__dirname, '..', 'extension', 'public')
app.use(express.static(staticPath)) 

//middlewares
app.use(bodyParser.json())
app.use(cors())

// set up gemini key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// create routes
app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, '..', 'extension', 'public', 'popup.html')
    res.sendFile(htmlFilePath)
})

// api route
app.post('/home', async (req, res) => {
  try {
    const prompt = req.body.message

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    res.json({ response: text })
  } catch (err) {
    console.error('Gemini API Error:', err)
    res.status(500).json({ error: 'Failed to generate response' })
  }
})

// activate the server
const PORT = process.env.PORT || 4500
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})  