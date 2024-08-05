interface FormSelectType {
  defultValue?: string;
  label: string;
  list: string[];
  name: string;
}

const FormSelect = ({ defultValue, label, list, name }: FormSelectType) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
      </label>
      <select
        name={name}
        defaultValue={defultValue}
        className="select select-bordered"
      >
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
