import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  const { keywords, style } = req.body

  const prompt = `请用「${style}」风格写一段关于「${keywords}」的小红书推荐文案，内容可以带表情符号，带点夸张但真实。`

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
    max_tokens: 300
  })

  res.status(200).json({ result: chat.choices[0].message.content })
}