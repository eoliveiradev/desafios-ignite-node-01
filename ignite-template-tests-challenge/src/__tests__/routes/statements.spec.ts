import request from 'supertest'
import { TestDB } from "../utils/database";
import { testUser } from "../utils/user";
import { app } from '../../app';

const db = new TestDB()

describe('/statements', () => {
  beforeAll(async () => {
    await db.init()
    await testUser.create()
  }, 1000)
  beforeEach(db.clear, 1000)
  afterAll(db.end, 1000)

  it('[GET] /balance - should return the user balance', async () => {
    const session = await testUser.initSession()

    const balance = await request(app)
      .get('/api/v1/statements/balance')
      .set('Authorization', `Bearer ${session.body.token}`)
      .expect(200)

    expect(balance.body).toHaveProperty('balance')
  }, 1000)

  it('[POST] /deposit - Should make a deposit', async () => {
    const session = await testUser.initSession()

    const deposit = await request(app)
      .post('/api/v1/statements/deposit')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        amount: 1,
        description: 'Deposit'
      })
      .expect(201)

    expect(deposit.body).toHaveProperty('id')
  }, 1000)

  it('[POST] /withdraw - Should make a withdraw', async () => {
    const session = await testUser.initSession()

    await request(app)
      .post('/api/v1/statements/deposit')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        amount: 1,
        description: 'Deposit'
      })

    const withdraw = await request(app)
      .post('/api/v1/statements/withdraw')
      .set('Authorization', `Bearer ${session.body.token}`)
      .send({
        amount: 1,
        description: 'Withdraw'
      })
      .expect(201)

    expect(withdraw.body).toHaveProperty('id')
  }, 1000)
});
