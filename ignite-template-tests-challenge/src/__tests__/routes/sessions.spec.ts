import { TestDB } from "../utils/database"
import { testUser } from '../utils/user'

const db = new TestDB()

describe('/sessions', () => {
  beforeEach(db.init, 1000)
  afterEach(db.end)

  it('[POST] - should create a new session', async () => {
    await testUser.create()
    const session = await testUser.initSession()

    expect(session.body).toHaveProperty('token')
  })
})