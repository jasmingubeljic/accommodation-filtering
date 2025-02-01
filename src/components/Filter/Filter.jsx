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
    if (start == null && end == null) {
      props.onDatesSave(false);
    } else {
      props.onDatesSave(dates);
    }
  };

  const onFilteringHandler = useCallback((event) => {
    // handle range picker
    if (!event.target) {
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
      <form onChange={onFilteringHandler} className="my-10 shadow-sm bg-indigo-50 rounded-md">
        <div className="p-1 m-1 w-auto inline-block bg-gray-50 rounded-md">
          <label htmlFor="Capacity">Arrival and Departure:</label>
          <br></br>
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
            dateFormat="yyyy/MM/dd"
            className="max-w-3xs w-100"
          />
        </div>
        <br></br>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 rounded-md">
          <div className="flex gap-2 px-2 py-1 rounded-md">
            <input
              type="number"
              name="capacity"
              className="border-1 border-gray-400 w-11 bg-gray-50"
              min="1"
              defaultValue="1"
            />
            <label htmlFor="Capacity">Guests</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="airConditioning" className="w-4 h-4" />
            <label className="mb-1">Air Conditioning</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="parkingSpace"  className="w-4 h-4" />
            <label className="mb-1">Parking</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="pets"  className="w-4 h-4"/>
            <label className="mb-1">Pets</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="pool"  className="w-4 h-4"/>
            <label className="mb-1">Pool</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="wifi" className="w-4 h-4" />
            <label className="mb-1">Wifi</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="tv" className="w-4 h-4" />
            <label className="mb-1">TV</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input
              type="number"
              name="maxPrice"
              className="border-1 border-gray-400 w-11 bg-gray-50"
              step="10"
              min="0"
              defaultValue="0"
            />
            <label htmlFor="maxPrice">Max. price</label>
          </div>
        </div>
      </form>
    </>
  );
}
