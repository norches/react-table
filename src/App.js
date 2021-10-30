import { useState, useEffect } from 'react';
import './App.css';

const usersData = require('./api/users.json');
const columns = [
  { field: 'name', label: 'Имя' },
  { field: 'age', label: 'Возраст' },
  { field: 'email', label: 'E-mail' },
  { field: 'phone', label: 'Номер телефона' },
];

function App() {
  const initialCriteria = columns.reduce(
    (acc, cur) => ({ ...acc, [cur.field]: '' }),
    {}
  );
  const [data, setData] = useState(usersData);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [sortBy, setSortBy] = useState({ field: null, sort: 'asc' });

  const onCriteriaChange = (column, value) => {
    const newCriteria = {
      ...criteria,
    };
    newCriteria[column] = value;
    setCriteria(newCriteria);
  };

  const onSortbySet = (field) => {
    setSortBy({
      field: field,
      sort: sortBy.sort === 'asc' ? 'desc' : 'asc',
    });
  };

  useEffect(() => {
    let newData = usersData.filter((row) => {
      let passes = [true, true];
      for (let field in criteria) {
        if (criteria[field].trim()) {
          passes.push(
            String(row[field])
              .toLowerCase()
              .includes(criteria[field].toLowerCase())
          );
        }
      }
      return !passes.includes(false);
    });
    setData(newData);
    return () => {};
  }, [criteria]);

  useEffect(() => {
    let sortedData = data.sort((a, b) =>
      a[sortBy.field] < b[sortBy.field] ? (sortBy.sort === 'asc' ? 1 : -2) : -1
    );
    setData(sortedData);
  }, [data, sortBy]);

  return (
    <div className='App'>
      <table>
        <thead>
          <tr>
            {columns.map((col) => {
              return (
                <th key={col.field} className='table-header'>
                  <div
                    className='table-header-label'
                    onClick={() => onSortbySet(col.field)}
                  >
                    <div>{col.label}</div>
                    <div className='table-header-sort'>
                      {sortBy.field === col.field && (
                        <span className='table-header-sort-icon'>
                          {sortBy.sort === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='table-header-input'>
                    <input
                      type='text'
                      onChange={(e) =>
                        onCriteriaChange(col.field, e.target.value)
                      }
                    />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.guid}>
                {columns.map((col, index) => {
                  return (
                    <td key={`row-${row.guid} cell-${index}`}>
                      {row[col.field]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {}
    </div>
  );
}

export default App;
