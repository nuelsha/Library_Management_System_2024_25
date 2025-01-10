export class CreateUserDto {
    username!: string;
    password!: string;
    roles!: string[];
    // Any other user fields you need to capture during registration
}