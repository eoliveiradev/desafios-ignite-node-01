import { TestDB } from '../utils/database'
import { testUser } from '../utils/user'

const db = new TestDB()

describe('/users', () => {
  beforeEach(db.init, 1000)
  afterEach(db.end)

  it('[POST] - should create a new user', async () => {
    await testUser.create()
  })
})
