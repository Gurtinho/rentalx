interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    driver_licence: string;
    id?: string;
    avatar?: string;
}

export { ICreateUserDTO };