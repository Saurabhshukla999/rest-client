require("reflect-metadata");
const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const { MikroORM } = require("@mikro-orm/core");
const mikroConfig = require("./mikro-orm.config");
const { RequestHistory } = require("./entities/RequestHistory");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variable for port or default to 4000
const PORT = process.env.PORT || 4000;

let orm;

// Initialize MikroORM and start server
async function startServer() {
  try {
    orm = await MikroORM.init(mikroConfig);
    await orm.getSchemaGenerator().updateSchema();
    console.log("Database initialized successfully");
    
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

// Proxy endpoint
app.post("/proxy", async (req, res) => {
  const { url, method = "GET", headers = {}, body } = req.body;
  try {
    const options = { method, headers };
    if (body) options.body = typeof body === "string" ? body : JSON.stringify(body);

    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type") || "";
    let responseBody = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    const em = orm.em.fork();
    const hist = em.create(RequestHistory, {
      id: uuid(),
      method,
      url,
      body: options.body || null,
      headers: JSON.stringify(headers),
      status: response.status,
      responseBody: typeof responseBody === "string" ? responseBody : JSON.stringify(responseBody),
      createdAt: new Date(),
    });
    await em.persistAndFlush(hist);

    res.json({
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
      historyId: hist.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// History with pagination
app.get("/history", async (req, res) => {
  const limit = Math.min(20, parseInt(req.query.limit) || 10);
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const offset = (page - 1) * limit;

  const em = orm.em.fork();
  const [items, total] = await em.findAndCount(RequestHistory, {}, {
    orderBy: { createdAt: "DESC" },
    limit,
    offset
  });

  res.json({ items, total, page, limit });
});

startServer();
