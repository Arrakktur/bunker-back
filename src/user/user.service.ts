import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { compare, genSalt, hash } from "bcrypt";
import { createUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ){}

  /**
   * Поиск по параметрам
   * @param options
   */
  async findOne(options?: Object): Promise<UserDto> {
    return await this.userRepository.findOne(options);
  }

  /**
   * Поиск по логину и паролю
   * @param name
   * @param password
   */
  async findByLogin({ login, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ login: login });
    if (!user){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const areEqual = await compare(password, user.password);

    if(!areEqual){
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  /**
   * Поиск по имени
   * @param name
   */
  async findByPayload({name}: any): Promise<UserDto> {
    return await this.findOne({name});
  }

  /**
   * Создание нового пользователя
   * @param createUserDto
   */
  async create(createUserDto: createUserDto): Promise<UserDto>{
    const userInDb = this.userRepository.findOneBy({login: createUserDto.login});
    if (userInDb) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const salt = await genSalt(10);

    createUserDto.password = await hash(createUserDto.password, salt);

    return await this.userRepository.save(createUserDto);
  }
}
