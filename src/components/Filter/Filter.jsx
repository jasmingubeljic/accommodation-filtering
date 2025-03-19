import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFiltering from "../../hooks/useFiltering";

export default function Filters(props) {
  const { startDate, endDate, onFilteringHandler } = useFiltering(props);

  return (
    <>
      <form onChange={onFilteringHandler} className="my-10 shadow-sm bg-indigo-50 rounded-md md:px-4 md:py-2">
        <div className="p-1 m-1 mb-3 w-auto inline-block rounded-md">
          <label htmlFor="Capacity">Arrival and Departure:</label>
          <br></br>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(event) => {
              onFilteringHandler(event);
            }}
            minDate={new Date()}
            isClearable={true}
            placeholderText="📅 Select dates"
            dateFormat="yyyy/MM/dd"
            className="my-1 max-w-3xs w-100 bg-white px-2 py-1 border-1 border-indigo-200"
          />
        </div>
        <br></br>

        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-1 rounded-md">
          <div className="flex gap-2 px-2 py-1 items-center rounded-md">
            <input type="number" name="capacity" className="border-1 border-gray-400 w-11 bg-gray-50" min="1" defaultValue="1" />
            <label htmlFor="Capacity" className="text-sm md:text-base">
              Guests
            </label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="airConditioning" className="w-4 h-4" />
            <label className="mb-1 whitespace-nowrap">
              <span className="hidden md:block text-sm md:text-base">Air Conditioning</span>
              <span className="md:hidden text-sm md:text-base">AC</span>
            </label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="parkingSpace" className="w-4 h-4" />
            <label className="mb-1 whitespace-nowrap text-sm md:text-base">Parking</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="pets" className="w-4 h-4" />
            <label className="mb-1 whitespace-nowrap text-sm md:text-base">Pets</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="pool" className="w-4 h-4" />
            <label className="mb-1 whitespace-nowrap text-sm md:text-base">Pool</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="wifi" className="w-4 h-4" />
            <label className="mb-1 whitespace-nowrap text-sm md:text-base">Wifi</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="checkbox" name="tv" className="w-4 h-4" />
            <label className="mb-1 whitespace-nowrap text-sm md:text-base">TV</label>
          </div>

          <div className="flex gap-2 px-2 py-1 rounded-md items-center">
            <input type="number" name="maxPrice" className="border-1 border-gray-400 w-11 bg-gray-50" step="10" min="0" defaultValue="" />
            <label htmlFor="maxPrice" className="whitespace-nowrap text-sm md:text-base">
              Max Price
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
