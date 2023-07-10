import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    return this.repository.
      createQueryBuilder("users")
      .leftJoinAndSelect("users.games", "games")
      .where("users.id = :id", { id: user_id })
      .getOneOrFail();
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.
      createQueryBuilder("users")
      .orderBy("users.first_name", "ASC")
      .getMany();
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.
      createQueryBuilder("users")
      .where("users.first_name ILIKE :first_name", { first_name })
      .andWhere("users.last_name ILIKE :last_name", { last_name })
      .getMany();
  }
}
