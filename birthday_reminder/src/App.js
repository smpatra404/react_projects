import './App.css';
import { useState } from 'react';
import data from './data';
import List from './list'

function App() {
  const curdate = new Date();
  const filterData = data.filter((d) => (parseInt(d.dob.split('/')[1]) === curdate.getMonth() + 1) && (parseInt(d.dob.split('/')[0]) === curdate.getDate()));
  const [ppl, setPpl] = useState(filterData);
  return (
    <>
      <div className="Container">
        <h3>{ppl.length} Birthdays today</h3>
        <List data={ppl} />
        <button className="btn" onClick={() => setPpl([])}>Clear All</button>
      </div>
    </>
  );
}

export default App;
