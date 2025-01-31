import { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters(props) {
  const [filters, setFilters] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    /* Filtering logic */
    const fa = props.accomodations.filter((a) => {
      let conditionsMatchingArray = [];
      if (filters.selIntervalStart && filters.selIntervalEnd) {
        const matchesAvailableDates = [];
        for (const obj of a.availableDates) {
          if (
            filters.selIntervalStart >= new Date(obj.intervalStart) &&
            filters.selIntervalEnd <= new Date(obj.intervalEnd)
          ) {
            matchesAvailableDates.push(true);
          }
        }
        conditionsMatchingArray.push(
          matchesAvailableDates.some((value) => value === true)
        );
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
      if (filters.maxPrice) {
        if (filters.selIntervalStart && filters.selIntervalEnd) {
          // take dates into account and prices related to dates
          const withinPriceRangeArr = [];
          for (const obj of a.pricelistInEuros) {
            if (
              filters.selIntervalStart >= new Date(obj.intervalStart) &&
              filters.selIntervalEnd <= new Date(obj.intervalEnd)
            ) {
              for (const obj of a.pricelistInEuros) {
                withinPriceRangeArr.push(filters.maxPrice <= obj.pricePerNight);
              }
            }
          }
          conditionsMatchingArray.push(
            withinPriceRangeArr.some((value) => value === false)
          );
        } else {

          // if date range is not selected, we check if condition meets at least one of the season prices
          const withinPriceRangeArr = [];
          for (const obj of a.pricelistInEuros) {
            withinPriceRangeArr.push(filters.maxPrice <= obj.pricePerNight);
          }
          conditionsMatchingArray.push(
            withinPriceRangeArr.some((value) => value === false)
          );
        }
      }

      return conditionsMatchingArray.every((val) => val === true);
    }); // ---- end of the .filter() ----
    console.log("filters: ", filters);
    props.onSetFilteredAccomodations(fa);
  }, [filters, props.accomodations]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onFilteringHandler = useCallback((event) => {
    // handle range picker
    if (!event.target) {
      console.log("event: ", event);
      if (event.length > 1) {
        setFilters((prevState) => {
          return {
            ...prevState,
            selIntervalStart: event[0],
            selIntervalEnd: event[1],
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
      <form onChange={onFilteringHandler} className="mb-10">
        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <DatePicker
            selected={startDate}
            onChange={(event) => {
              onFilteringHandler(event);
              onChange(event);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            isClearable
            placeholderText="📅 Select dates"
            dateFormat="yyyy-MM-dd"
            // className="hover:cursor-pointer"
          />
          <label htmlFor="Capacity">Reservation dates</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input
            type="number"
            name="capacity"
            className="border-1"
            min="1"
            defaultValue="1"
          />
          <label htmlFor="Capacity">Number of Guests</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input type="checkbox" name="airConditioning" />
          <label>Air Conditioning</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input type="checkbox" name="parkingSpace" />
          <label>Parking</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input type="checkbox" name="pets" />
          <label>Pets</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input type="checkbox" name="pool" />
          <label>Pool</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input type="checkbox" name="wifi" />
          <label>Wifi</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input type="checkbox" name="tv" />
          <label>TV</label>
        </div>

        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input
            type="number"
            name="maxPrice"
            className="border-1"
            step="10"
            min="0"
            defaultValue="0"
          />
          <label htmlFor="maxPrice">Maximum price</label>
        </div>
      </form>
    </>
  );
}
