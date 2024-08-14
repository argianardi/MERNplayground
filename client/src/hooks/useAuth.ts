import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// Tanpa state management dan validasi
// const useAuth = (isRegister: boolean) => {
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const formData = new FormData(event.target as HTMLFormElement);
//     const data = Object.fromEntries(formData.entries());
//     console.log(data);

//     const url = isRegister ? '/auth/register' : '/auth/login';

//     try {
//       const response = await authService(url, data);
//       console.log(response);

//       if (isRegister) {
//         navigate('/login');
//       } else {
//         navigate('/');
//       }
//     } catch (error: any) {
//       setError(error?.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { handleSubmit, error, isLoading };
// };

// export default useAuth;

// Menggunaakan state management dan validasi
interface useAuthReturnType {
  handleSubmit: (Event: FormEvent, fields: FormDataType) => void;
  error: string | null;
  isLoading: boolean;
  formData: FormDataType;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface FormDataType {
  name: string;
  email: string;
  password: string;
}

const useAuth = (isRegister: boolean): useAuthReturnType => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, password } = formData;

    if (!email || !password || (isRegister && !name)) {
      return 'Please fill in all required fields.';
    }

    if (name.length < 3 && isRegister) {
      return 'Name must be at least 3 characters long.';
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email address.';
    }

    if (password.length < 3) {
      return 'Password must be at least 3 characters long.';
    }

    return '';
  };

  const handleSubmit = async (event: FormEvent, fields: FormDataType) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      const url = isRegister ? '/auth/register' : '/auth/login';
      const response = await authService(url, fields);
      console.log(response);

      if (isRegister) {
        navigate('/login');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, error, isLoading, formData, handleChange };
};

export default useAuth;
