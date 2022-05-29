import { useState } from 'react';
import FilterForm from '../../components/FilterForm';
import Table from '../../components/Table';

const HeroesTable = () => {
  const [params, setParams] = useState(null);
  const [openFilterForm, setOpenFilterForm] = useState(true);
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    email: null,
    company: null,
    country: null,
    date: null,
  });

  return (
    <main>
      <FilterForm
        formData={formData}
        setFormData={setFormData}
        params={params}
        setParams={setParams}
        openFilterForm={openFilterForm}
      />
      <Table
        formData={formData}
        params={params}
        setOpenFilterForm={setOpenFilterForm}
      />
    </main>
  );
};

export default HeroesTable;
