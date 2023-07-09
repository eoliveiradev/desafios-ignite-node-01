import request from 'supertest'
import { app } from '../../app'
import { TestDB } from '../utils/database'

const db = new TestDB()

describe('/users', () => {
  beforeEach(db.init, 1000)
  afterEach(db.end)

  it('[POST] - should create a new user', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'John Doe',
        email: 'email@email.com',
        password: 'password'
      })
      .expect(201)
  })
})
