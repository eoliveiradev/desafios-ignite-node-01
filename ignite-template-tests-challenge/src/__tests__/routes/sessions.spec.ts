import request from 'supertest'
import { TestDB } from "../utils/database"
import { app } from '../../app'

const db = new TestDB()

describe('/sessions', () => {
  beforeEach(db.init, 1000)
  afterEach(db.end)

  it('[POST] - should create a new session', async () => {
    const user = {
      name: 'John Doe',
      email: 'email@email.com',
      password: 'password'
    }
    await request(app)
      .post('/api/v1/users')
      .send(user)

    const session = await request(app)
      .post('/api/v1/sessions')
      .send({
        email: user.email,
        password: user.password
      }).expect(200)

    expect(session.body).toHaveProperty('token')
  })
})