export default function ResponseView({ r }) {
    if (!r) return <div>No response yet</div>;
    if (r.error) return <pre>{JSON.stringify(r, null, 2)}</pre>;
  
    return (
      <div>
        <div>Status: {r.status}</div>
        <h4>Headers</h4>
        <pre>{JSON.stringify(r.headers, null, 2)}</pre>
        <h4>Body</h4>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {typeof r.body === "string" ? r.body : JSON.stringify(r.body, null, 2)}
        </pre>
        <div>Saved history ID: {r.historyId}</div>
      </div>
    );
  }
  