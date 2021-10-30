import { useState, useEffect } from 'react';
import logo from './logo.svg';
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

  const resetTable = () => {
    setData(usersData);
  };

  const onCriteriaChange = (column, value) => {
    const newCriteria = {
      ...criteria,
    };
    newCriteria[column] = value;
    setCriteria(newCriteria);
  };

  useEffect(() => {
    console.log(criteria);
    filterTable();
    return () => {};
  }, [criteria]);

  const filterTable = () => {
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
  };

  return (
    <div className='App'>
      <table>
        <thead>
          <tr>
            {columns.map((col) => {
              return (
                <th key={col.field}>
                  {col.label}
                  <input
                    type='text'
                    onChange={(e) =>
                      onCriteriaChange(col.field, e.target.value)
                    }
                  />
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
