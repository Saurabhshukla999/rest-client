import { useEffect, useState } from "react";
import { API_URL } from "../config";

export default function HistoryList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  async function load(p = 1) {
    const res = await fetch(`${API_URL}/history?page=${p}&limit=5`);
    const data = await res.json();
    setItems(p === 1 ? data.items : [...items, ...data.items]);
    setHasMore(p * data.limit < data.total);
  }

  useEffect(() => { load(1); }, []);

  return (
    <div>
      <h3>History</h3>
      <ul>
        {items.map((it) => (
          <li key={it.id}>
            <b>{it.method}</b> {it.url} — {it.status} —{" "}
            {new Date(it.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => { const np = page + 1; setPage(np); load(np); }}>
          Load more
        </button>
      )}
    </div>
  );
}
