import { useEffect, useState } from "react";
import { getAccomodations } from "../../util/apiCalls";
import { Link } from "react-router-dom";
import Filters from "../Filter/Filter";

export default function AccomodationPage() {
  const [accomodations, setAccomodations] = useState([]);
  const [filteredAccomodations, setFilteredAccomodations] = useState([]);

  useEffect(() => {
    getAccomodations(
      (r) => {
        setAccomodations(r);
        setFilteredAccomodations(r);
      },
      (err) => console.log(err)
    );
  }, []);

  
  return (
    <>
      <Filters
        accomodations={accomodations}
        onSetFilteredAccomodations={(fa) => setFilteredAccomodations(fa)}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {filteredAccomodations.map((a) => {
          return (
            <Link key={a.id} to={`/accomodation/${a.id}`}>
              <div className="rounded-t-md shadow-sm overflow-hidden hover:shadow-md">
                <img src={a.image} className="w-100 aspect-9/5 object-cover" />
                <div className="p-2 flex flex-col gap-1 h-25">
                  <p className="font-bold uppercase truncate opacity-75">
                    {a.title}
                  </p>
                  <p className="truncate">Capacity: {a.capacity}</p>
                  {a.beachDistanceInMeters && (
                    <p className="truncate">
                      Beach Distance: {a.beachDistanceInMeters}m
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
