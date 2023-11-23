import request from "supertest";
import { app } from "@shared/infra/http/app";
import { dataConnection } from "@shared/infra/typeorm/data-source";
import { hash } from "bcryptjs";
import { v4 as uuid } from 'uuid';

let testConnection: any

describe('Create Category Controller', () => {

  beforeAll(async () => {
    const id = uuid()
    const passwordHash = await hash('1234', 8)

    testConnection = await dataConnection.initialize()
    await testConnection.driver.connect()
    await testConnection.runMigrations()

    await testConnection.query(
			`INSERT INTO USERS(id, name, email, password, "is_admin", driver_licence, created_at) VALUES(
				'${id}', 'admin', 'admin@rentalx.com', '${passwordHash}', true, 'XXXXXX', 'now()'
			)`
		)
  })

  afterAll(async () => {
    await testConnection.dropDatabase()
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com',
      password: '1234'
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories').send({
      name: 'category supertest',
      description: 'aaaaaaaaaaa'
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })
    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com',
      password: '1234'
    })

    const { refresh_token } = responseToken.body

    const response = await request(app).post('/categories').send({
      name: 'category supertest',
      description: 'aaaaaaaaaaa'
    }).set({
      Authorization: `Bearer ${refresh_token}`
    })
    expect(response.status).toBe(400)
  })
})