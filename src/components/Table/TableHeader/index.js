import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import './TableHeader.scss';

const TableHeader = ({ sortType, setSortType }) => {
  const headers = ['Name', 'Phone', 'Email', 'Date', 'Country', 'Company'];

  // asc arrow up
  // desc arrow down
  return (
    <>
      <thead>
        <tr>
          {headers?.map((item, index) => (
            <th key={index}>
              <span>{item}</span>
              {item === 'Name' &&
                (sortType === 'asc' ? (
                  <FaArrowDown onClick={() => setSortType(() => 'desc')} />
                ) : (
                  <FaArrowUp onClick={() => setSortType(() => 'asc')} />
                ))}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
