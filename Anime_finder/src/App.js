import { useState } from 'react';
import './App.css';

const url = "https://api.jikan.moe/v3/search/anime?q="

function App() {
  const [data, setData] = useState([]);
  return (
    <>
      <Header onbtnclick={setData} />
      <article>
        <h1>Search results ...</h1>
        {data.map((d) => {
          return (
            <Card className="card" key={d.mal_id} lisid={d.mal_id}
              name={d.title} rating={d.score} description={d.synopsis}
              img={d.image_url} data={data} setdata={setData} />
          );
        })
        }
      </article>
    </>
  );
}
const Header = (props) => {
  const [term, setTerm] = useState('');
  return (
    <header className="header">
      <h1>Anime Finder</h1>
      <div className="search">
        <input type="text" placeholder="Enter name ..." onChange={(e) => setTerm(e.target.value)} />
        <button onClick={async () => {
          if (term) {
            const searchres = await getresult(term);
            if (searchres) {
              props.onbtnclick(searchres)
            } else {
              alert("No results found for " + term)
            }
          } else {
            alert("Enter a name to search")
          }
        }}>🔍</button>
      </div>
    </header>
  );
}

const Card = (props) => {
  const [desc, setDesc] = useState(props.description.slice(0, 50));
  const [read, setRead] = useState('...Read More')
  return (
    <div className="card">
      <img src={props.img} alt="adasad" />
      <section>
        <div className="card-header">
          <h2>{props.name}</h2>
          <h4>{props.rating}</h4>
        </div>
        <p>
          {desc}
          <button className="readmore" onClick={() => {
            if (read === '...Read More') {
              setDesc(props.description);
              setRead(' Read less')
            } else {
              setDesc(props.description.slice(0, 50));
              setRead('...Read More')
            }
          }
          }>{read}</button>
        </p>
        <button className="close-btn" onClick={() => {
          const newData = props.data.filter((d) => d.mal_id !== props.lisid)
          props.setdata(newData);
        }}>Close</button>
      </section>
    </div>
  );
}

async function getresult(term) {
  const data = await fetch(url + term)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => console.log("Error occured" + error));
  return data;
}

export default App;
