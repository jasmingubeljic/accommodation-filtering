export default function Filters(props) {
  return (
    <>
      <form  onChange={props.onFiltering} className="mb-10">
        <div className="flex gap-2 p-1 m-1 bg-indigo-50 rounded-md items-center content-start">
          <input type="number" name="capacity" className="border-1" min="1" defaultValue="1" />
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
          <input type="number" name="max_price" className="border-1" step="10" min="0" defaultValue="0" />
          <label htmlFor="max_price">Maximum price</label>
        </div>
      </form>
    </>
  );
}
