import { Form, Link, useSearchParams } from 'react-router-dom';
import FormSelect from './form/FormSelect';
import FormInputWithoutState from './form/FormInputWithoutState';

const Filter = ({ resetLink }: { resetLink: string }) => {
  const categories = ['Sepatu', 'Baju', 'Celana'];
  const [searchParams] = useSearchParams();

  const name = searchParams?.get('name') || '';
  const category = searchParams?.get('category') || '';

  return (
    <Form
      method="get"
      className="bg-base-200 gap-x-4 gap-y-3 grid grid-cols-2 px-8 py-4 rounded-md"
    >
      <FormInputWithoutState
        label="Search Product"
        name="name"
        type="search"
        defaultValue={name}
      />
      <FormSelect
        label="Select category"
        name="category"
        list={categories}
        defaultValue={category}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <Link to={resetLink} className="btn btn-accent">
        Reset
      </Link>
    </Form>
  );
};

export default Filter;
