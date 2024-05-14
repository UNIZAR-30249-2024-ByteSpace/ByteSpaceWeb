import axios from 'axios';

export type UserCredentials = {
  username: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  token: string;
};

export class HttpUserRepo {
  async login(credentials: UserCredentials): Promise<User> {
    interface UserDTO {
      _id: string;
      username: string;
      email: string;
      token: string;
    }

    try {
      const response = await axios.post<UserDTO>('http://localhost:3000/api/users/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('No se pudo iniciar sesión');
      }

      const userDto = response.data;
      const user: User = {
        id: userDto._id,
        username: userDto.username,
        email: userDto.email,
        token: userDto.token,
      };

      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}
