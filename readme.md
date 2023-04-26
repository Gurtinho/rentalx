// app de aluguel de carros

// CRIAR UMA NOVA MIGRATION:
yarn typeorm migration:create src/database/migrations/migrationName

// PARA RODAR AS MIGRATIONS, VC PRECISA ESTAR DENTRO DO DOCKER
utilize esse comando para entrar no bash do docker:
docker-compose exec app bash

* Depois de rodar o comando pra entrar no bash do docker, ai sim pode rodar as migrations;

// RODAR AS MIGRATIONS:
yarn typeorm-run

// REVERTER MIGRATIONS:
yarn typeorm-revert

// ABRIR O BANCO DIRETO NO TERMINAL DENTRO DO DOCKER:
docker exec -it database psql -U postgres -d rentalx