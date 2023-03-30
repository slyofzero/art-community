import {
  Injectable,
  Body,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto, UserCredI } from './dto';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserI } from 'src/interfaces';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly user: Model<UserI>) {}

  // ---------- Service to handle sign up as a new user ----------
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      // Hashing user password
      const hashedPassword = await argon.hash(signUpDto.password);

      // Storing password data in an object
      const userData: UserI = {
        ...signUpDto,
        password: hashedPassword,
      };

      // Pushing user to the database
      const user = await this.user.create(userData);
      console.log(user);

      return { message: user };
    } catch (error) {
      // Handling errors because of a duplicate value in a unique field
      if (error.name === 'MongoServerError' && error.code === 11000) {
        // Getting the field name and value
        let duplicateField = Object.keys(error.keyValue)[0];
        const duplicateFieldValue = error.keyValue[duplicateField];

        return this.isFieldDuplicate(duplicateField, duplicateFieldValue);
      }

      return error;
    }
  }

  // ---------- Service to check if a field has a duplicate value ----------
  async isFieldDuplicate(field: string, fieldValue: string) {
    const isDuplicateValue = await this.user.findOne({ [field]: fieldValue });

    // Converting field name from camel case to title case
    field = field.replace(/([A-Z])/g, ' $1');
    field = field.charAt(0).toUpperCase() + field.slice(1);

    if (isDuplicateValue) {
      // Throwing a 409 conflict error with a custom error message
      throw new ConflictException(`${field} ${fieldValue} already in use`, {
        cause: new Error(),
        description: 'Please use another value ',
      });
    } else {
      return { message: `${field} ${fieldValue} is available` };
    }
  }

  // ---------- Service to sign into your account ----------
  async signIn(userCred: UserCredI, password: string) {
    // Check if the username / email / phoneNumber entered exists
    const user = await this.user.findOne(userCred);

    if (!user) {
      const cred = Object.keys(userCred)[0];
      const credValue = userCred[cred];
      throw new NotFoundException(`No user with ${cred} ${credValue} found`);
    }

    // Check if password matches
    const passwordMatches = await argon.verify(user.password, password);
    console.log(passwordMatches);

    if (!passwordMatches)
      throw new UnauthorizedException("Password doesn't match");

    return user;
  }
}
