import { useState } from "react";
import RequestForm from "./components/RequestForm";
import ResponseView from "./components/ResponseView";
import HistoryList from "./components/HistoryList";

export default function App() {
  const [resp, setResp] = useState(null);

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini REST Client</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <RequestForm onResponse={setResp} />
          <HistoryList />
        </div>
        <div style={{ flex: 1 }}>
          <ResponseView r={resp} />
        </div>
      </div>
    </div>
  );
}
