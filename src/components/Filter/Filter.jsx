export default function Filters(props) {
  return (
    <>
      <form  onChange={props.onFiltering}>
        <div>
          <input type="number" name="capacity" className="border-1" />
          <label htmlFor="Capacity">Number of Guests</label>
        </div>

        <div>
          <input type="checkbox" name="airConditioning" />
          <label>Air Conditioning</label>
        </div>

        <div>
          <input type="checkbox" name="parkingSpace" />
          <label>Parking</label>
        </div>

        <div>
          <input type="checkbox" name="pets" />
          <label>Pets</label>
        </div>

        <div>
          <input type="checkbox" name="pool" />
          <label>Pool</label>
        </div>

        <div>
          <input type="checkbox" name="wifi" />
          <label>Wifi</label>
        </div>

        <div>
          <input type="checkbox" name="tv" />
          <label>TV</label>
        </div>

        <div>
          <input type="number" name="max_price" className="border-1" />
          <label htmlFor="max_price">Maximum price</label>
        </div>
      </form>
    </>
  );
}
