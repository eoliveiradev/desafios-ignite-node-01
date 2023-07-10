import { TestDB } from '../utils/database'
import { testUser } from '../utils/user'

const db = new TestDB()

describe('/users', () => {
  beforeAll(db.init, 1000)
  beforeEach(db.clear, 1000)
  afterAll(db.end, 1000)

  it('[POST] - should create a new user', async () => {
    await testUser.create()
  })
})
