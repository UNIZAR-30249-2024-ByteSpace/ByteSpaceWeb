import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpUserRepo, UserCredentials } from '../../infraestructure/http/UserRepo';
import { useAuth, AuthContextType } from '../components/AuthContext'; // Ajusta la ruta según la ubicación de tu AuthContext

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useAuth(); // Obtén el contexto de autenticación en tu componente de función
  const userRepo = new HttpUserRepo(authContext); // Pasa el contexto de autenticación al constructor de HttpUserRepo
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const credentials: UserCredentials = { username, password };
      const user = await userRepo.login(credentials);
      console.log('Inicio de sesión exitoso', user);

      // Redirigir al usuario a la página principal
      navigate('/home')
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: 'url(/src/assets/Fondo.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='bg-secondary bg-opacity-80 p-8 rounded-lg w-96 h-80 flex flex-col justify-center items-center'>
        <h1 className="text-3xl text-center font-semibold mb-4 text-primary text-xxxl">ByteSpace</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block text-primary text-xl">Correo electrónico</label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-bold text-primary text-xl">Contraseña</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-primary text-bold py-2 rounded-md hover:bg-blue-600 transition-colors text-xl"
          onClick={handleLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
