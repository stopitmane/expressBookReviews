const request = require('supertest');
const app = require('../index');

describe('GET / root', () => {
  it('returns API info', async () => {
    const r = await request(app).get('/');
    expect(r.status).toBe(200);
    expect(r.body.name).toBe('Express Book Reviews API');
    expect(r.body.author).toBe('Ajayi Taiwo John');
  });
});

describe('GET /books', () => {
  it('returns all books array', async () => {
    const r = await request(app).get('/books');
    expect(r.status).toBe(200);
    expect(typeof r.body).toBe('object');
    expect(Object.keys(r.body).length).toBeGreaterThanOrEqual(10);
  });
});

describe('GET /isbn/:isbn', () => {
  it('returns book by valid ISBN', async () => {
    const r = await request(app).get('/books/isbn/9780143126560');
    expect(r.status).toBe(200);
    expect(r.body.title).toBe('The Martian');
  });
  it('returns 404 for unknown ISBN', async () => {
    const r = await request(app).get('/isbn/0000000000000');
    expect(r.status).toBe(404);
  });
});

describe('GET /author/:author', () => {
  it('returns books by author (case-insensitive)', async () => {
    const r = await request(app).get('/books/author/andy%20weir');
    expect(r.status).toBe(200);
    expect(r.body.length).toBeGreaterThan(0);
    expect(r.body[0].author).toBe('Andy Weir');
  });
  it('returns 404 for unknown author', async () => {
    const r = await request(app).get('/author/Unknown%20Author');
    expect(r.status).toBe(404);
  });
});

describe('GET /title/:title', () => {
  it('returns books by exact title', async () => {
    const r = await request(app).get('/books/title/The%20Martian');
    expect(r.status).toBe(200);
    expect(r.body[0].title).toBe('The Martian');
  });
  it('supports partial title match', async () => {
    const r = await request(app).get('/title/Martian');
    expect(r.status).toBe(200);
    expect(r.body.length).toBeGreaterThan(0);
  });
  it('returns 404 for no match', async () => {
    const r = await request(app).get('/title/NoSuchBook123');
    expect(r.status).toBe(404);
  });
});

describe('GET /review/:isbn', () => {
  it('returns reviews for a book', async () => {
    const r = await request(app).get('/books/review/9780143126560');
    expect(r.status).toBe(200);
    expect(r.body.alice).toBeDefined();
  });
  it('returns empty object for book with no reviews', async () => {
    const r = await request(app).get('/review/9780553418026');
    expect(r.status).toBe(200);
    expect(Object.keys(r.body).length).toBe(0);
  });
  it('returns 404 for unknown ISBN', async () => {
    const r = await request(app).get('/review/0000000000000');
    expect(r.status).toBe(404);
  });
});

describe('Async routes', () => {
  it('GET /async/books returns books', async () => {
    const r = await request(app).get('/books/async/books');
    expect(r.status).toBe(200);
  });
  it('GET /async/isbn/:isbn returns book', async () => {
    const r = await request(app).get('/async/isbn/9780062316110');
    expect(r.status).toBe(200);
    expect(r.body.title).toBe('The Alchemist');
  });
  it('GET /async/author/:author returns books', async () => {
    const r = await request(app).get('/async/author/Paulo%20Coelho');
    expect(r.status).toBe(200);
    expect(r.body.length).toBeGreaterThan(0);
  });
  it('GET /async/title/:title returns books', async () => {
    const r = await request(app).get('/async/title/Alchemist');
    expect(r.status).toBe(200);
    expect(r.body.length).toBeGreaterThan(0);
  });
});
