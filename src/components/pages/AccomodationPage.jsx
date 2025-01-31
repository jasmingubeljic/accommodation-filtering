import { useEffect, useState, useCallback } from "react";
import { getAccomodations } from "../../util/apiCalls";
import { Link } from "react-router-dom";
import Filters from "../Filter/Filter";

export default function AccomodationPage() {
  const [accomodations, setAccomodations] = useState([]);
  const [filters, setFilters] = useState({});
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

  useEffect(() => {
    
    /* Filtering logic */
    const fa = accomodations.filter((a) => {

      let conditionsMatchingArray = [];
      if(filters.selIntervalStart && filters.selIntervalEnd) {
        const matchesAvailableDates = []
        for (const obj of a.availableDates) {
          if(
            filters.selIntervalStart >= new Date(obj.intervalStart) &&
            filters.selIntervalEnd <= new Date(obj.intervalEnd)
          ) {
            matchesAvailableDates.push(true)
          }
        }
        conditionsMatchingArray.push(
          matchesAvailableDates.some(value => value === true)
        )
      }
      if (filters.capacity) {
        conditionsMatchingArray.push(filters.capacity <= a.capacity);
      }
      if (filters.airConditioning) {
        conditionsMatchingArray.push(a.amenities.airConditioning);
      }
      if (filters.parkingSpace) {
        conditionsMatchingArray.push(a.amenities.airConditioning);
      }
      if (filters.pets) {
        conditionsMatchingArray.push(a.amenities.pets);
      }
      if (filters.pool) {
        conditionsMatchingArray.push(a.amenities.pool);
      }
      if (filters.wifi) {
        conditionsMatchingArray.push(a.amenities.wifi);
      }
      if (filters.tv) {
        conditionsMatchingArray.push(a.amenities.tv);
      }
      if(filters.maxPrice) {
        if(filters.selIntervalStart && filters.selIntervalEnd) {
          // take dates into account and prices date related
          const withinPriceRangeArr = []
          for (const obj of a.pricelistInEuros) {
            if(
              filters.selIntervalStart >= new Date(obj.intervalStart) &&
              filters.selIntervalEnd <= new Date(obj.intervalEnd)
              
            ) {
              for (const obj of a.pricelistInEuros) {
                withinPriceRangeArr.push(filters.maxPrice <= obj.pricePerNight) 
              }
            }
          }
          conditionsMatchingArray.push(
            withinPriceRangeArr.some(value => value === true)
          )
        } else {    
          // if date range is not selected, we check if condition meets at least one of the season prices 
          const withinPriceRangeArr = []
          for (const obj of a.pricelistInEuros) {
            withinPriceRangeArr.push(filters.maxPrice >= obj.pricePerNight) 
          }
          conditionsMatchingArray.push(
            withinPriceRangeArr.some(value => value === true)
          )
        }
      }
      return conditionsMatchingArray.every(val => val === true)
    }); // end of the .filter()

    setFilteredAccomodations(fa);
  }, [filters, accomodations]);


  const onFilteringHandler = useCallback((event) => {

    // handle range picker
    if (!event.target) {
      console.log('event: ', event)
      if (event.length > 1) {
        setFilters((prevState) => {
          return {
            ...prevState,
            selIntervalStart: event[0],
            selIntervalEnd: event[1]
          };
        });
      }
      return;
    }

    // handle remaining filters
    const name = event.target.name;
    console.log("event:   ", event);

    if (event.target.type == "checkbox" && event.target.checked) {
      setFilters((prevState) => {
        return {
          ...prevState,
          [name]: event.target.checked,
        };
      });
    } else {
      setFilters((prevState) => {
        const obj = { ...prevState };
        delete obj[name];
        return obj;
      });
    }

    if (event.target.type == "number") {
      setFilters((prevState) => {
        return {
          ...prevState,
          [name]: +event.target.value,
        };
      });
    }
  }, []);


  return (
    <>
      <Filters onFiltering={onFilteringHandler} />
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
