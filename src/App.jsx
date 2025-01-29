import './App.css'
import { useEffect, useState } from "react";
import { getAccomodations } from "./util/apiCalls";

function App() {
  const [accomodations, setAccomodations] = useState([])

  useEffect(() => {
    getAccomodations(
      (r) => setAccomodations(r),
      (err) => console.log(err)
    );
  }, []);


  return (
    <>
      <h1>React with Vite</h1>
      {accomodations.map((a) => {
        return (
          <div key={a.id}>
            <img src={a.image}></img>
            <p>{a.title}</p>
            <p>Capacity: {a.capacity}</p>
            {a.beachDistanceInMeters && <p>Beach Distance: {a.beachDistanceInMeters}m</p>}

          </div>
        );
      })}
    </>
  )
}

export default App
