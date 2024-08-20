// Tanpa state management
interface FormInputType {
  defaultValue?: string;
  label: string;
  type: string;
  name: string;
}

const FormInputWithoutState = ({
  label,
  name,
  type,
  defaultValue,
}: FormInputType) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered"
      />
    </label>
  );
};

export default FormInputWithoutState;
