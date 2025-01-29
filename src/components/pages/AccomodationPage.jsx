import { useEffect, useState } from "react";
import { getAccomodations } from "../../util/apiCalls";

export default function AccomodationPage() {
  const [accomodations, setAccomodations] = useState([]);

  useEffect(() => {
    getAccomodations(
      (r) => setAccomodations(r),
      (err) => console.log(err)
    );
  }, []);

  return (
    <>
      {accomodations.map((a) => {
        return (
          <div key={a.id}>
            <img src={a.image}></img>
            <p>{a.title}</p>
            <p>Capacity: {a.capacity}</p>
            {a.beachDistanceInMeters && (
              <p>Beach Distance: {a.beachDistanceInMeters}m</p>
            )}
          </div>
        );
      })}
    </>
  );
}
