import React, { useState, useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  createSearchParams,
  useSearchParams,
  Navigate,
} from 'react-router-dom';
import styles from './FilterForm.module.scss';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { formattedDate } from '../../utils';
import dayjs from 'dayjs';
import { FaFilter, FaRegCalendar, FaAngleDown } from 'react-icons/fa';
import cx from 'classnames';

import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <div className={styles.customDateInput}>
      <label onClick={props.onClick} ref={ref}>
        {props.value || (
          <span className={styles.placeholder}>{props.placeholder}</span>
        )}
      </label>
      <FaRegCalendar onClick={props.onClick} />
    </div>
  );
});

const FilterForm = ({
  formData,
  setFormData,
  params,
  setParams,
  openFilterForm,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOptions, setDropdownOptions] = useState(null);
  const [resetUrl, setResetUrl] = useState(null);

  const { name, phone, email, company, country, date } = formData;

  useEffect(() => {
    if (resetUrl) {
      window.location.href = resetUrl;
    }
  }, [resetUrl]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const q = Object.fromEntries(
      Object.entries(formData)
        .filter(([_, v]) => v !== null)
        .map(([key, value]) => {
          if (key === 'country') {
            return [key, value.value];
          }
          if (key === 'date') {
            return [key, dayjs(value).format('DD-MM-YYYY')];
          }
          if (key === 'name') {
            return ['user_name', value];
          }
          if (key === 'phone') {
            return ['user_phone', value];
          }
          return [key, value];
        })
    );

    setParams(q);

    console.log(q, 'submit');

    navigate({
      pathname: '/heroes',
      search: `?${createSearchParams(q)}`,
    });
  };

  const handleReset = () => {
    let url = new URL(`${window.origin}${location.pathname}${location.search}`);
    Object.keys(params).forEach((key) => {
      url.searchParams.delete(key);
    });

    setResetUrl(url.href);
  };

  useEffect(() => {
    const getDropdownOptions = async () => {
      const res = await fetch(
        `https://countriesnow.space/api/v0.1/countries/iso`
      );

      const data = await res.json();
      setDropdownOptions(data?.data);
    };

    getDropdownOptions();
  }, []);

  const getCountryOptions = () => {
    const countryOptions = dropdownOptions?.map((op) => {
      return { label: op.name, value: op.name };
    });

    return countryOptions;
  };

  return (
    <div
      className={cx(styles.filterform, { [styles.sidebar]: !openFilterForm })}
    >
      <h1>Filters</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          name='email'
          value={email ?? ''}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Phone'
          name='phone'
          value={phone ?? ''}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name ?? ''}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Company'
          name='company'
          value={company ?? ''}
          onChange={handleChange}
        />

        <DatePicker
          placeholderText='Date'
          selected={date}
          onChange={(date) => setFormData({ ...formData, date })}
          dateFormat='dd-MM-yyyy'
          customInput={<CustomInput />}
        />

        <Select
          value={country}
          onChange={(selected) => {
            setFormData({ ...formData, country: selected });
          }}
          options={getCountryOptions()}
        />

        <button className={styles.filterform__btn} onClick={handleSubmit}>
          <FaFilter />
          <span>Filter</span>
        </button>

        <button
          className={cx(styles.filterform__btn, styles.filterform__resetbtn)}
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default FilterForm;
