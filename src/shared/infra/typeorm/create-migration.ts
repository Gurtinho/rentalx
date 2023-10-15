#!/usr/bin/env node

import yargs from 'yargs'
import { execSync } from 'child_process'

interface IMigration {
	_: (string | number)[]
}

// Parse the command-line arguments
const {
	_: [name],
} = yargs.argv as IMigration

// Construct the migration path
const migrationPath = `src/shared/infra/typeorm/migrations/${name}`

// Run the typeorm command
execSync(`typeorm-ts-node-commonjs migration:create ${migrationPath}`, { stdio: 'inherit' })
