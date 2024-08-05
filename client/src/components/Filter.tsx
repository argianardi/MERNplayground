import { Form, Link, useLoaderData } from 'react-router-dom';
import FormInput from './form/FormInput';
import FormSelect from './form/FormSelect';

const Filter = () => {
  const categories = ['Sepatu', 'Baju', 'Celana'];
  const { params } = useLoaderData() as { params: { [key: string]: string } };
  const { name, category } = params;
  return (
    <Form
      method="get"
      className="grid grid-cols-2 px-8 py-4 rounded-md bg-base-200 gap-x-4 gap-y-3"
    >
      <FormInput
        label="Search Product"
        name="name"
        type="search"
        defaultValue={name}
      />
      <FormSelect
        label="Select category"
        name="category"
        list={categories}
        defultValue={category}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
      <Link to={'/products'} className="btn btn-accent">
        Reset
      </Link>
    </Form>
  );
};

export default Filter;
