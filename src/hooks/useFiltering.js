import { useState, useEffect, useCallback } from "react";
import { renderReadableDate } from "../util/utils";

export default function useFiltering(props) {
  const [filters, setFilters] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    /* Filtering logic */
    const fa = props.accommodations.filter((a) => {
      let conditionsMatchingArray = [];
      if (filters.selIntervalStart && filters.selIntervalEnd) {
        const matchesAvailableDates = [];
        for (const obj of a.availableDates) {
          if (renderReadableDate(filters.selIntervalStart) >= obj.intervalStart && renderReadableDate(filters.selIntervalEnd) <= obj.intervalEnd) {
            matchesAvailableDates.push(true);
          }
        }
        conditionsMatchingArray.push(matchesAvailableDates.some((value) => value === true));
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
            if (filters.selIntervalStart >= new Date(obj.intervalStart) && filters.selIntervalEnd <= new Date(obj.intervalEnd)) {
              for (const obj of a.pricelistInEuros) {
                withinPriceRangeArr.push(filters.maxPrice <= obj.pricePerNight);
              }
            }
          }
          conditionsMatchingArray.push(withinPriceRangeArr.some((value) => value === false));
        } else {
          // if date range is not selected, we check if condition meets at least one of the season prices
          const withinPriceRangeArr = [];
          for (const obj of a.pricelistInEuros) {
            withinPriceRangeArr.push(filters.maxPrice <= obj.pricePerNight);
          }
          conditionsMatchingArray.push(withinPriceRangeArr.some((value) => value === false));
        }
      }

      return conditionsMatchingArray.every((val) => val === true);
    }); // ---- end of the .filter() method ----

    props.onSetFilteredAccommodations(fa);
  }, [filters, props]);

  const onFilteringHandler = useCallback(
    (event) => {
      // handle range picker
      if (!event.target) {
        const [start, end] = event;
        setStartDate(start);
        setEndDate(end);
        if (start == null && end == null) {
          props.onDatesSave(false);
        } else {
          props.onDatesSave(event);
        }
        if (event.length > 1) {
          return setFilters((prevState) => {
            return {
              ...prevState,
              selIntervalStart: start,
              selIntervalEnd: end,
            };
          });
        }
      }

      // handle remaining filters
      const name = event.target.name;

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
        if (event.target.name == "capacity") {
          props.onSetSelGuestCount(event.target.value);
        }
        setFilters((prevState) => {
          return {
            ...prevState,
            [name]: +event.target.value,
          };
        });
      }
    },
    [props]
  );

  return {
    startDate,
    endDate,
    onFilteringHandler,
  };
}
