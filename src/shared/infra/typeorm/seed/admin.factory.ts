import { dataConnection } from '../data-source'
import { v4 as uuid } from 'uuid'
import { hash } from 'bcryptjs'

export async function create() {
	const passwordHash = await hash('1234', 8)
  const id = uuid()

	await dataConnection.driver.connect()
	const user: [] = await dataConnection.query(
		`SELECT email FROM USERS WHERE email = 'admin@rentalx.com'`
	)
	if (user.length > 0) {
		console.log('admin user already exists')
	} else {
		await dataConnection.query(
			`INSERT INTO USERS(id, name, email, password, "is_admin", driver_licence, created_at) VALUES(
				'${id}', 'admin', 'admin@rentalx.com', '${passwordHash}', true, 'XXXXXX', 'now()'
			)`
		)
		console.log('admin user was been created')
	}
	await dataConnection.driver.disconnect()
}
create()
