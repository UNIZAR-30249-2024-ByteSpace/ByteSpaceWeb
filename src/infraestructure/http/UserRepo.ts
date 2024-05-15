import axios from 'axios';

// Definimos AuthContextType aquí o importamos desde AuthContext.tsx si es necesario
interface AuthContextType {
    saveUserId(id: string): unknown;
    user: { username: string } | null;
    login: (token: string) => void;
    logout: () => void;
}

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
  constructor(private readonly authContext: AuthContextType) {} // Recibe el contexto de autenticación como argumento

  async login(credentials: UserCredentials): Promise<User> {
    interface UserDTO {
      id: string;
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
        username: userDto.username,
        email: userDto.email,
        id: userDto.id,
        token: userDto.token,
      };

      // Guardar el token de usuario en el contexto de autenticación
      this.authContext.login(user.token); // Utiliza el contexto de autenticación pasado como argumento

      // Además, guarda el id del usuario en el contexto de autenticación
      this.authContext.saveUserId(user.id);

      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}
