import request from 'supertest'
import { app } from '../../app'

const user = {
  name: 'John Doe',
  email: 'email@email.com',
  password: 'password'
}

class TestUser {
  create() {
    return request(app)
      .post('/api/v1/users')
      .send(user).expect(201)
  }

  initSession() {
    return request(app)
      .post('/api/v1/sessions')
      .send({
        email: user.email,
        password: user.password
      }).expect(200)
  }
}

export const testUser = new TestUser()