import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

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

interface UseAuthReturnType {
  handleSubmit: (event: FormEvent) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: ErrorsType;
  isLoading: boolean;
  formData: FormDataType;
}

const useAuthWithoutCookies = (isRegister: boolean): UseAuthReturnType => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorsType>({});
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error for the modified field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Validate form data and set error messages
  const validateForm = (): boolean => {
    const { name, email, password } = formData;
    const newErrors: ErrorsType = {};

    if (isRegister && !name) {
      newErrors.name = 'Name is required';
    } else if (name?.length < 3 && isRegister) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password?.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const url = isRegister
        ? '/auth/register-without-cookie'
        : '/auth/login-without-cookie';
      const response = await authService(url, formData);
      console.log(response);

      if (response?.data?.token) {
        localStorage.setItem('jwt', response?.data?.token);
        navigate(isRegister ? '/login' : '/');
      }
    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, apiError: error?.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    handleChange,
    errors,
    isLoading,
    formData,
  };
};

export default useAuthWithoutCookies;
