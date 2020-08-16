import React from 'react';

function CardList({ data }) {
  return (
    <div className='list'>
      {data?.map((item) => (
        <li key={item.id}>
          <div>
            {item?.eng}
            <code>{item?.vn}</code>
            <code>{item?.pin}</code>
          </div>
        </li>
      ))}
    </div>
  );
}

export default CardList;
