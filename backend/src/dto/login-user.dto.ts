import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}