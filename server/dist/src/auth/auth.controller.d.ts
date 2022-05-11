import { AuthService } from './auth.service';
import SigninDto from './dto/signin.dto';
import SignupDto from './dto/signup.dto';
import { GoogleDto } from './dto/google.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<{
        access_token: string;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: string;
    }>;
    googleAuth(dto: GoogleDto): Promise<{
        access_token: string;
    }>;
}
