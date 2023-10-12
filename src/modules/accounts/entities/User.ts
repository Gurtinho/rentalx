import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    id?: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    isAdmin: boolean

    @Column()
    driver_licence: string

    @CreateDateColumn()
    created_at: string

    @CreateDateColumn()
    updated_at: string

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User }