import { useState } from "react"

export default function Home() {
  const [keywords, setKeywords] = useState("")
  const [style, setStyle] = useState("搞笑")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const styles = ["搞笑", "夸张", "专业"]

  async function generateCopy() {
    setLoading(true)
    setResult("")
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords, style })
    })
    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "1rem" }}>小红书文案生成器</h1>
      <input
        type="text"
        value={keywords}
        placeholder="输入关键词，例如 CO Hair Nusa Bestari"
        onChange={(e) => setKeywords(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
      />
      <div style={{ marginBottom: "1rem" }}>
        {styles.map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            style={{
              padding: "0.5rem 1rem",
              marginRight: "0.5rem",
              backgroundColor: style === s ? "#f472b6" : "#eee"
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <button onClick={generateCopy} disabled={loading || !keywords} style={{ padding: "0.5rem 1rem" }}>
        {loading ? "生成中..." : "生成文案"}
      </button>
      {result && (
        <pre style={{ marginTop: "2rem", backgroundColor: "#f9f9f9", padding: "1rem" }}>
          {result}
        </pre>
      )}
    </main>
  )
}