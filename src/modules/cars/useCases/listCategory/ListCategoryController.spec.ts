import request from "supertest";
import { app } from "@shared/infra/http/app";
import { dataConnection } from "@shared/infra/typeorm/data-source";
import { hash } from "bcryptjs";
import { v4 as uuid } from 'uuid';

describe('List Category Controller', () => {

  beforeAll(async () => {
    const id = uuid()
    const passwordHash = await hash('1234', 8)

    const testConnection = await dataConnection.initialize()
    await testConnection.driver.connect()
    await testConnection.runMigrations()

    await testConnection.query(
			`INSERT INTO USERS(id, name, email, password, "is_admin", driver_licence, created_at) VALUES(
				'${id}', 'admin', 'admin@rentalx.com', '${passwordHash}', true, 'XXXXXX', 'now()'
			)`
		)
  })

  afterAll(async () => {
    await dataConnection.driver.connect() 
  })

  it('should be able to list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentalx.com',
      password: '1234'
    })

    const { token } = responseToken.body

    await request(app).post('/categories').send({
      name: 'category supertest',
      description: 'aaaaaaaaaaa'
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get('/categories')

    expect(response.status).toBe(201)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('category supertest')
  })
})