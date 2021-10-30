import { useState } from 'react';
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
  const [data, setData] = useState(usersData);

  return (
    <div className='App'>
      <table>
        <thead>
          <tr>
            {columns.map((col) => {
              return <th>{col.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr>
                {columns.map((col) => {
                  return <td>{row[col.field]}</td>;
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
