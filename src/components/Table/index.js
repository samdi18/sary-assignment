import { useState, useEffect, useMemo } from 'react';
import TableHeader from './TableHeader';
import './Table.scss';
import jsonData from '../../db.json';
import { formattedDate, formattedNumber } from '../../utils';
import { FaStream, FaSearch } from 'react-icons/fa';

const Table = ({ params, setOpenFilterForm }) => {
  const [data, setData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [openInput, setOpenInput] = useState('');
  const [sortType, setSortType] = useState('asc');

  const filterByProps = () => {
    const res = data?.filter((data) => {
      return Object.keys(params).every((key) => {
        return data[key] === params[key]; // true,false => false
      });
    });

    setData(res);
  };

  const searchData = () => {
    const res = data?.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toLowerCase().includes(searchText)
      )
    );
    setData(res);
  };

  const getSortedData = (data) => {
    const res = data?.sort((a, b) => {
      let isReversed = sortType === 'asc' ? 1 : -1;
      return isReversed * a.user_name.localeCompare(b.user_name);
    });

    setData([...res]);
  };

  useEffect(() => {
    if (params) {
      filterByProps();
    }
  }, [params]);

  useEffect(() => {
    if (data && searchText !== '') {
      getSortedData(data);
      searchData();
    } else if (searchText === '' || !data) {
      const fetchedData = jsonData?.heroes.map((el) => el);
      getSortedData(fetchedData);
    }
  }, [searchText, sortType]);

  return (
    <div className='heroes-table'>
      <div className='table-header'>
        {openInput && (
          <input
            type='text'
            value={searchText}
            placeholder='Search....'
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}
        <FaSearch
          style={{ marginRight: '10' }}
          onClick={() => setOpenInput((p) => !p)}
        />
        <FaStream onClick={() => setOpenFilterForm((p) => !p)} />
      </div>

      <table>
        <TableHeader sortType={sortType} setSortType={setSortType} />
        <tbody>
          {data?.map((d, id) => {
            // console.log(new Date(d.date));
            return (
              <tr key={id}>
                <td>{d.user_name}</td>
                <td>{formattedNumber(d.user_phone)}</td>
                <td>{d.email}</td>
                <td>{formattedDate(d.date)}</td>
                <td>{d.country}</td>
                <td>{d.company}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
