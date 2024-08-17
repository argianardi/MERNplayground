import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

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
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  logout: () => void;
  errors: ErrorsType;
  isLoading: boolean;
  formData: FormDataType;
}

interface FormDataType {
  name: string;
  email: string;
  password: string;
}

interface ErrorsType {
  name?: string;
  email?: string;
  password?: string;
  apiError?: string;
}

const useAuth = (isRegister: boolean): useAuthReturnType => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ErrorsType>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the field that is being modified
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const { name, email, password } = formData;
    const newErrors: ErrorsType = {};

    if (isRegister && !name) {
      newErrors.name = 'Name is required';
    } else if (name.length < 3 && isRegister) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters long.';
    }
    setErrors(newErrors);

    // If there are no errors, return true, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent, fields: FormDataType) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const isValid = validateForm();

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const url = isRegister ? '/auth/register' : '/auth/login';
      await authService(url, fields);

      if (isRegister) {
        navigate('/login');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      setErrors({ ...errors, apiError: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService('/auth/logout', {});
      navigate('/login');
    } catch (error: any) {
      setErrors({ ...errors, apiError: error.message });
    }
  };

  return {
    handleSubmit,
    logout,
    handleChange,
    errors,
    isLoading,
    formData,
  };
};

export default useAuth;
