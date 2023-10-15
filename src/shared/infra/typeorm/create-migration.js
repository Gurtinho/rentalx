#!/usr/bin/env node

const yargs  = require('yargs')
const { execSync } =  require('child_process')

// Parse the command-line arguments
const {
	_: [name],
} = yargs.argv

// Construct the migration path
const migrationPath = `src/shared/infra/typeorm/migrations/${name}`

// Run the typeorm command
execSync(`typeorm-ts-node-commonjs migration:create ${migrationPath}`, { stdio: 'inherit' })
