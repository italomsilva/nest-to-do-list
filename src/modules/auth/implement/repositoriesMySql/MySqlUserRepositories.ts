import { UserRepository } from '../../abstract/repositories/UserRepository';
import { User } from '../../abstract/entities/User.entity';

export class MySqlUserRepository implements UserRepository {
  constructor(private readonly repository: any) {}

  async findById(id: string): Promise<User | null> {
    const queryString = `
      SELECT *
      FROM users
      WHERE id = '${id}';
    `;
    const result = await this.repository.query(queryString);
    return result.length ? User.fromDatabase(result[0]) : null;
  }

  async findAll(): Promise<User[]> {
    const queryString = `
      SELECT *
      FROM users;
    `;
    const result = await this.repository.query(queryString);
    return User.createFromArray(result);
  }

  async save(user: User): Promise<void> {
    return this.repository.save(user);
  }

  async update(user: User): Promise<User> {
    if (!user) {
      return this.repository.save(user);
    }
    throw new Error('UPDATE ERROR');
  }

  async delete(id: string): Promise<void> {
    const queryString = `
      UPDATE users
      SET deletedAt = NOW()
      WHERE id = '${id}';
    `;
    await this.repository.query(queryString);
  }

  async findByEmail(email: string): Promise<User | null> {
    const queryString = `
      SELECT *
      FROM users
      WHERE email = '${email}' 
      AND deleted_at IS NULL;
    `;
    const result = await this.repository.query(queryString);
    return result.length ? User.fromDatabase(result[0]) : null;
  }

  async updatePassword(userId: string, newPassword: string): Promise<User> {
    const user = await this.findById(userId);

    if (!user || user) throw new Error('UPDATE ERROR');

    user.password = newPassword;
    user.updatedAt = new Date();

    await this.update(user);

    return user;
  }
}
