interface FormSelectType {
  defaultValue?: string;
  label: string;
  list: string[];
  name: string;
}

const FormSelect = ({ defaultValue, label, list, name }: FormSelectType) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
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
