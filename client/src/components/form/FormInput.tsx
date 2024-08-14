// Tanpa state management
// interface FormInputType {
//   defaultValue?: string;
//   label: string;
//   type: string;
//   name: string;
// }

// const FormInput = ({ label, name, type, defaultValue }: FormInputType) => {
//   return (
//     <label className="form-control">
//       <label className="label">
//         <span className="capitalize label-text">{label}</span>
//       </label>
//       <input
//         type={type}
//         name={name}
//         defaultValue={defaultValue}
//         className="input input-bordered"
//       />
//     </label>
//   );
// };

// export default FormInput;

// Menggunakan state management
import { ChangeEvent } from 'react';

interface FormInputType {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
}: FormInputType) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="capitalize label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input input-bordered"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
