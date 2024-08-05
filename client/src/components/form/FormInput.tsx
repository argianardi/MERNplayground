interface FormInputType {
  defaultValue?: string;
  label: string;
  type: string;
  name: string;
}

const FormInput = ({ label, name, type, defaultValue }: FormInputType) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
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

export default FormInput;
