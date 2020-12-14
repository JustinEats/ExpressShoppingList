process.env.NODE_ENV = 'test';

const request = require("supertest")
const app = require('./app')
const items = require('./fakeDb')

let popsicle = {name:"popsicle", price:1.45}

beforeEach(()=>{
    items.push(popsicle)
})

afterEach(()=>{
    items.length = 0;
})

describe('/GET /items', ()=>{
    test('Get all items in shopping list', async()=>{
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([popsicle]) //checking the values inside and if it equals that. Must include where it's stored.
    })
})

describe('/POST /items', ()=>{
    test('creating items', async ()=>{
        const res = await request(app).post('/items').send({name: "strawberry", price: 1.45})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({added:{name: "strawberry", price: 1.45}})
    })
    test('respond with 404 if missing input,', async()=>{
        const res = await request(app).post('/items').send({name: '', price: 1.45})
        expect(res.statusCode).toBe(400)
    })
})

describe('/GET /:name', ()=>{
    test('get items by name', async ()=>{
        const res = await request(app).get(`/items/popsicle`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({name:"popsicle", price:1.45})
    })
    test("responds with 404 if missing", async()=>{
        const res = await request(app).get(`/items/missing`)
        expect(res.statusCode).toBe(404)
    })
})

describe('/PATCH /:name', ()=>{
    test('update items', async ()=>{
        const res = await request(app).patch(`/items/${popsicle.name}`).send({name:"yolo", price:2})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated:{name:"yolo", price:2}})
    })
    test('Respond 404 if name is not found', async()=>{
        const res = await request(app).patch(`/items/error`).send({name:"yolo", price:2})
        expect(res.statusCode).toBe(404)
    })
})

describe('/DELETE /:name', ()=>{
    test('Will the item delete', async()=>{
        const res = await request(app).delete(`/items/${popsicle.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message:"Deleted"})
    })
    test('Respond 404 on undefined', async()=>{
        const res = await request(app).delete(`/items/somerandomname`)
        expect(res.statusCode).toBe(404)
    })
})