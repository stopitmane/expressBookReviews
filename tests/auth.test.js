const request = require('supertest');
const app = require('../index');
const authModule = require('../router/auth_users');

beforeEach(() => { authModule.users.length = 0; }); // reset users between tests

const USER = { username: 'ajayitest', password: 'secure123' };

async function loginAgent() {
  const agent = request.agent(app);
  await agent.post('/customer/register').send(USER);
  await agent.post('/customer/login').send(USER);
  return agent;
}

describe('POST /customer/register', () => {
  it('registers successfully', async () => {
    const r = await request(app).post('/customer/register').send(USER);
    expect(r.status).toBe(201);
    expect(r.body.message).toMatch(/registered/i);
  });
  it('rejects duplicate username', async () => {
    await request(app).post('/customer/register').send(USER);
    const r = await request(app).post('/customer/register').send(USER);
    expect(r.status).toBe(400);
    expect(r.body.message).toMatch(/already taken/i);
  });
  it('rejects short username', async () => {
    const r = await request(app).post('/customer/register').send({username:'ab',password:'pass123'});
    expect(r.status).toBe(400);
    expect(r.body.message).toMatch(/3 characters/i);
  });
  it('rejects short password', async () => {
    const r = await request(app).post('/customer/register').send({username:'valid',password:'abc'});
    expect(r.status).toBe(400);
    expect(r.body.message).toMatch(/6 characters/i);
  });
  it('rejects missing fields', async () => {
    expect((await request(app).post('/customer/register').send({username:'x'})).status).toBe(400);
    expect((await request(app).post('/customer/register').send({password:'x'})).status).toBe(400);
  });
});

describe('POST /customer/login', () => {
  it('logs in and returns token', async () => {
    await request(app).post('/customer/register').send(USER);
    const r = await request.agent(app).post('/customer/login').send(USER);
    expect(r.status).toBe(200);
    expect(r.body.token).toBeDefined();
    expect(r.body.message).toMatch(/successful/i);
  });
  it('rejects wrong password', async () => {
    await request(app).post('/customer/register').send(USER);
    const r = await request.agent(app).post('/customer/login').send({...USER, password:'wrong'});
    expect(r.status).toBe(401);
  });
  it('rejects unknown user', async () => {
    const r = await request(app).post('/customer/login').send({username:'nobody',password:'pass'});
    expect(r.status).toBe(401);
  });
  it('rejects missing credentials', async () => {
    const r = await request(app).post('/customer/login').send({});
    expect(r.status).toBe(400);
  });
});

describe('PUT /customer/auth/review/:isbn', () => {
  it('adds review when authenticated', async () => {
    const agent = await loginAgent();
    const r = await agent.put('/customer/auth/review/9780553418026').query({review:'Great book!'});
    expect(r.status).toBe(200);
    expect(r.body.message).toMatch(/saved|added|updated/i);
  });
  it('rejects without auth', async () => {
    const r = await request(app).put('/customer/auth/review/9780553418026').query({review:'x'});
    expect(r.status).toBe(403);
  });
  it('rejects empty review', async () => {
    const agent = await loginAgent();
    const r = await agent.put('/customer/auth/review/9780553418026').query({review:''});
    expect(r.status).toBe(400);
  });
  it('returns 404 for unknown ISBN', async () => {
    const agent = await loginAgent();
    const r = await agent.put('/customer/auth/review/0000000000000').query({review:'x'});
    expect(r.status).toBe(404);
  });
  it('updates existing review', async () => {
    const agent = await loginAgent();
    await agent.put('/customer/auth/review/9780143126560').query({review:'First'});
    const r = await agent.put('/customer/auth/review/9780143126560').query({review:'Updated'});
    expect(r.status).toBe(200);
    expect(Object.values(r.body.reviews)).toContain('Updated');
  });
});

describe('DELETE /customer/auth/review/:isbn', () => {
  it('deletes own review', async () => {
    const agent = await loginAgent();
    await agent.put('/customer/auth/review/9780553418026').query({review:'To delete'});
    const r = await agent.delete('/customer/auth/review/9780553418026');
    expect(r.status).toBe(200);
    expect(r.body.message).toMatch(/deleted/i);
  });
  it('rejects without auth', async () => {
    const r = await request(app).delete('/customer/auth/review/9780553418026');
    expect(r.status).toBe(403);
  });
  it('returns 404 when review does not exist', async () => {
    const agent = await loginAgent();
    const r = await agent.delete('/customer/auth/review/9780735224292');
    expect(r.status).toBe(404);
  });
});
