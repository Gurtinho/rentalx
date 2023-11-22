## Api de aluguel de carros

#### Criar migrations

*Dentro do package.json foi criado um arquivo .ts pra facilitar a criação de migrations*

```sh
yarn typeorm migration:create migrationName
```

#### Entre dentro do container docker

*utilize esse comando para entrar no bash do docker:*

```sh
docker exet -it rentalx-app /bin/sh
```

*Depois de rodar o comando pra entrar no bash do docker, ai sim pode rodar as migrations;*

#### Rodar as migrations

```sh
yarn typeorm-run
```

#### Reverter as migrations

*Deve estar dentro do container do docker*

yarn typeorm-revert

#### Abrir o banco de dados direto no terminal

```sh
docker exec -it rentalx-database psql -U postgres -d rentalx
```
