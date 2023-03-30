import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsFieldDuplicateDto, SignInDto, SignUpDto, UserCredI } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @desc Function to sign up user
  // @path /auth/signup
  // @access public
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // @desc An endpoint to be hit during sign up form filling to determine if a field value is duplicate or not
  // @path /auth/isFieldDuplicate
  // @access public
  @Post('isFieldDuplicate')
  isFieldDuplicate(@Body() isFieldDuplicateDto: IsFieldDuplicateDto) {
    const { field, fieldValue } = isFieldDuplicateDto;

    return this.authService.isFieldDuplicate(field, fieldValue);
  }

  // @desc Function to sign in user
  // @path /auth/signin
  // @access public
  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    const { username, email, phoneNumber, password } = signInDto;

    // Checking if any userCred was passed
    if (!username && !email && !phoneNumber) {
      throw new BadRequestException(
        'No username / email / phoneNumber was provided',
      );
    }

    // Setting userCred
    let userCred: UserCredI;
    if (username) userCred = { username };
    else if (email) userCred = { email };
    else if (phoneNumber) userCred = { phoneNumber };

    return this.authService.signIn(userCred, password);
  }
}
