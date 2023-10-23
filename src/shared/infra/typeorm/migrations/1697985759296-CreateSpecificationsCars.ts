import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSpecificationsCars1697985759296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'specifications_cars',
                columns: [
                    {
                        name: 'car_id',
                        type: 'uuid'
                    },
                    {
                        name: 'specification_id',
                        type: 'uuid'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )

        // criar foreign key para a tabela de specifications
        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FKSpecificationCar',
                referencedTableName: 'specifications',
                referencedColumnNames: ['id'],
                columnNames: ['specification_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL'
            })
        )

        // criar foreign key para a tabela de cars
        await queryRunner.createForeignKey(
            'specifications_cars',
            new TableForeignKey({
                name: 'FKCarSpecification',
                referencedTableName: 'cars',
                referencedColumnNames: ['id'],
                columnNames: ['car_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'specifications_cars', 'FKCarSpecification'
        )
        await queryRunner.dropForeignKey(
            'specifications_cars', 'FKspecificationCar'
        )
        await queryRunner.dropTable('specifications_cars')
    }

}
