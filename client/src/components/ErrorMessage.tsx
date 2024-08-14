const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-center text-red-500">{message}</p>;
};

export default ErrorMessage;
