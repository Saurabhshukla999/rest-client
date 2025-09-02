const { EntitySchema } = require("@mikro-orm/core");

const RequestHistory = new EntitySchema({
  name: 'RequestHistory',
  properties: {
    id: { type: 'string', primary: true },
    method: { type: 'string' },
    url: { type: 'string' },
    body: { type: 'string', nullable: true },
    headers: { type: 'string', nullable: true },
    status: { type: 'number' },
    responseBody: { type: 'string' },
    createdAt: { type: 'Date' }
  }
});

module.exports = { RequestHistory };
