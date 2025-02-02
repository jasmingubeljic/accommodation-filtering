export default function renderPriceRange ({minPrice, maxPrice, selDates}) {
    if (selDates) return;
    if (minPrice != maxPrice) {
      return (
        <div className="mt-3 p-2">
          <p>
            The pricing is <b>{`€${minPrice}–${maxPrice}`}</b> per day
          </p>
          <p className="text-gray-500 text-sm">
            (Select dates to view pricing for your booking)
          </p>
        </div>
      );
    } else {
      return (
        <div className="mt-3 p-2">
          <p>The pricing is <b>{`€${minPrice}`}</b> per day</p>
          <p className="text-gray-500 text-sm">
            <span className="text-orange-400">⚠</span> Select dates to view pricing for your booking
          </p>
        </div>
      );
    }
  };
