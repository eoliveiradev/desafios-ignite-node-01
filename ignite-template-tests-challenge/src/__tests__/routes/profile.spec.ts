import request from 'supertest'
import { TestDB } from "../utils/database";
import { testUser } from "../utils/user";
import { app } from '../../app';

const db = new TestDB()

describe('/profile', () => {
  beforeAll(db.init, 1000)
  beforeEach(db.clear, 1000)
  afterAll(db.end, 1000)

  it('[GET] - should return the user profile', async () => {
    await testUser.create()
    const session = await testUser.initSession()

    const profile = await request(app)
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${session.body.token}`)
      .expect(200)

    expect(profile.body).toHaveProperty('id')
  })
})