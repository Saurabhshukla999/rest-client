import { useState } from "react";
import { API_URL } from "../config";

export default function RequestForm({ onResponse }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("{}");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await fetch(`${API_URL}/proxy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          method,
          headers: JSON.parse(headers || "{}"),
          body: body || undefined,
        }),
      });
      const data = await resp.json();
      onResponse(data);
    } catch (err) {
      onResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
      <div>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://jsonplaceholder.typicode.com/posts/1"
          style={{ width: "70%" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
      <textarea
        placeholder="Headers JSON"
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        rows={3}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={6}
      />
    </form>
  );
}
