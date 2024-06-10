import axios from 'axios';

// Definimos AuthContextType aquí o importamos desde AuthContext.tsx si es necesario
interface AuthContextType {
    saveUserId(id: string): unknown;
    saveUserRol(rol: string): unknown; // Método para guardar el rol del usuario
    saveUserDepartamento(departamento: string): unknown; // Método para guardar el rol del usuario
    user: { 
        username: string;
        rol: string; // Añade el atributo "rol" al usuario en AuthContextType
        departamento : string;
    } | null;
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
  rol: string; // Añade el atributo "rol" al usuario
  departamento : string;
  token: string;
};

export class HttpUserRepo {
  constructor(private readonly authContext: AuthContextType) {} // Recibe el contexto de autenticación como argumento
  

  async login(credentials: UserCredentials): Promise<User> {
    interface UserDTO {
      id: string;
      username: string;
      email: string;
      rol: string; // Actualiza el DTO para incluir "rol"
      departamento : string;
      token: string;
    }

    try {
      const response = await axios.post<UserDTO>('http://localhost:4000/api/users/login', credentials, {
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
        rol: userDto.rol, // Asigna el valor de "rol" del DTO al usuario
        departamento: userDto.departamento,
        id: userDto.id,
        token: userDto.token,
      };

      // Guardar el token de usuario en el contexto de autenticación
      this.authContext.login(user.token); // Utiliza el contexto de autenticación pasado como argumento

      // Además, guarda el id del usuario en el contexto de autenticación
      this.authContext.saveUserId(user.id);
      this.authContext.saveUserRol(user.rol);
      this.authContext.saveUserDepartamento(user.departamento);

      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}