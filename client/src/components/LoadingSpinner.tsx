const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center my-9">
      <div
        className="inline-block w-8 h-8 border-4 rounded-full spinner-border animate-spin"
        role="status"
      />
    </div>
  );
};

export default LoadingSpinner;
