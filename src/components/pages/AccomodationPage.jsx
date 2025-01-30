import { useEffect, useState, useCallback } from "react";
import { getAccomodations } from "../../util/apiCalls";
import { Link } from "react-router-dom";
import Filters from "../Filter/Filter";

export default function AccomodationPage() {
  const [accomodations, setAccomodations] = useState([]);
  const [filters, setFilters] = useState({})
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

  useEffect( () => {
    const fa = accomodations.filter((a) => {
      let isAllTrue = []
      if(filters.capacity) {
        isAllTrue.push(filters.capacity <= a.capacity)
      }
      if(filters.airConditioning) {
        isAllTrue.push(a.amenities.airConditioning)
      }
      if(filters.parkingSpace) {
        isAllTrue.push(a.amenities.airConditioning)
      }
      if(filters.pets) {
        isAllTrue.push(a.amenities.pets)
      }
      if(filters.pool) {
        isAllTrue.push(a.amenities.pool)
      }
      if(filters.wifi) {
        isAllTrue.push(a.amenities.wifi)
      }
      if(filters.tv) {
        isAllTrue.push(a.amenities.tv)
      }
      return !isAllTrue.includes(false)
    });

    setFilteredAccomodations(fa)

  
  }, [filters, accomodations])

  const onFilteringHandler = useCallback(
    (event) => {
      const name = event.target.name;

      if(event.target.type == 'checkbox' && event.target.checked) {
        setFilters(prevState => {
          return {
          ...prevState,
          [name]: event.target.checked
        }
        })
      } else {
        setFilters(prevState => {
          const obj = {...prevState}
          delete obj[name]
          return obj
        })
      }

      if(event.target.type == 'number') {
        setFilters(prevState => {
          return {
            ...prevState,
            [name]: +event.target.value
          }
        })
      }
    },
    []
  );

  // const includesData = (obj1, obj2) => {
  //   return Object.keys(obj2).every(key => obj1[key] === obj2[key]);
  // }

  return (
    <>
      <Filters onFiltering={onFilteringHandler} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {filteredAccomodations.map((a) => {
          return (
            <Link key={a.id} to={`/accomodation/${a.id}`}>
              <div className="rounded-t-md shadow-sm overflow-hidden hover:shadow-md">
                <img src={a.image} className="w-100 aspect-9/5 object-cover" />
                <div className="p-3">
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
