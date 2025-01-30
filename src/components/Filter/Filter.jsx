import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Filters(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <form onChange={props.onFiltering} className="mb-10">
        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <DatePicker
            selected={startDate}
            onChange={(event) => {
              props.onFiltering(event);
              onChange(event);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()}
            isClearable
            placeholderText="Select dates"
            dateFormat="yyyy-MM-dd"
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
            name="max_price"
            className="border-1"
            step="10"
            min="0"
            defaultValue="0"
          />
          <label htmlFor="max_price">Maximum price</label>
        </div>
      </form>
    </>
  );
}
