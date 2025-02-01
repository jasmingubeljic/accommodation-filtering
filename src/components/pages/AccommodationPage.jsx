import { useEffect, useState } from "react";
import { getAccommodations } from "../../util/apiCalls";
import { customModalStyles } from "../../util/utils"
import Filters from "../Filter/Filter";
import Modal from "react-modal";
import Pill from "../Pills/Pill";
import PriceRange from "../Prices/PriceRange";
import BookingInfo from "../Prices/BookingInfo";

export default function AccommodationPage() {
  const [accommodation, setAccommodation] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selDates, setSelDates] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(() => {
    getAccommodations(
      (r) => {
        setAccommodations(r);
        setFilteredAccommodations(r);
      },
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (accommodation) {
      setIsModalOn(true);
    }
  }, [accommodation]);

  useEffect(() => {
    // calculate
    console.log("sel dates: ", selDates);
  }, [selDates]);

  const onAccommodationOpening = (a) => {
    let computedTotalPrice;
    let minAccommodationPrice;
    let maxAccommodationPrice;
    if (selDates) {
      /* compute total price */
      const matchingObj = a.pricelistInEuros.filter((obj) => {
        if (
          selDates[0].toISOString().split("T")[0] >= obj.intervalStart &&
          selDates[1].toISOString().split("T")[0] < obj.intervalEnd
        ) {
          return true;
        }
      });

      // multiply the price by days
      const diffInTime = selDates[1] - selDates[0]; // difference in milliseconds
      const diffInDays = diffInTime / (1000 * 3600 * 24); // convert milliseconds to days
      computedTotalPrice = matchingObj[0]["pricePerNight"] * diffInDays;
    } else {
      // compute min and max
      minAccommodationPrice = Math.min(
        ...a.pricelistInEuros.map((item) => item.pricePerNight)
      );
      maxAccommodationPrice = Math.max(
        ...a.pricelistInEuros.map((item) => item.pricePerNight)
      );
    }

    // attach prebooking data to accommodation
    const extendedAccommodationData = {
      ...a,
      minAccommodationPrice,
      maxAccommodationPrice,
    };
    if (selDates) {
      extendedAccommodationData["selDates"] = selDates;
      extendedAccommodationData["computedTotalPrice"] = computedTotalPrice;
    }
    setAccommodation(extendedAccommodationData);
  };



  return (
    <>
      <Filters
        accommodations={accommodations}
        onSetFilteredAccommodations={(fa) => setFilteredAccommodations(fa)}
        onDatesSave={(dates) => setSelDates(dates)}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {filteredAccommodations.map((a) => {
          return (
            <div key={a.id}>
              <div
                onClick={() => onAccommodationOpening(a)}
                className="rounded-t-md shadow-sm overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer"
              >
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
              <Modal
                isOpen={isModalOn}
                contentLabel="Example Modal"
                style={customModalStyles}
                ariaHideApp={false}
                // onRequestClose={() => setSelDates(false)}
              >
                <img src={accommodation.image} />
                <div className="px-3 pt-1 pb-2">
                  <div>
                    <h1 className="text-xl font-semibold uppercase">
                      {accommodation.title}
                    </h1>
                    <br></br>
                    <Pill title="Capacity" value={accommodation.capacity} />
                    <Pill
                      title="Beach Distance"
                      value={`${accommodation.beachDistanceInMeters}m`}
                    />
                    <Pill
                      title="Air Conditioning"
                      value={accommodation.amenities?.airConditioning}
                    />
                    <Pill
                      title="Parking"
                      value={accommodation.amenities?.parkingSpace}
                    />
                    <Pill title="Pets" value={accommodation.amenities?.pets} />
                    <Pill title="Pool" value={accommodation.amenities?.pool} />
                    <Pill title="Wifi" value={accommodation.amenities?.wifi} />
                    <Pill title="TV" value={accommodation.amenities?.tv} />

                    <PriceRange
                      minPrice={accommodation.minAccommodationPrice}
                      maxPrice={accommodation.maxAccommodationPrice}
                      selDates={selDates}
                    />
                    <BookingInfo selDates={selDates} accommodation={accommodation} />

                    <div className="pt-10 flex justify-between gap-2">
                      <button
                        className="px-3 py-1 hover:cursor-pointer uppercase text-sm py-2"
                        onClick={() => setIsModalOn(false)}
                      >
                        {`< Nazad`}
                      </button>
                      <button
                        className="bg-zinc-800 hover:bg-zinc-950 transition-all text-white px-4 py-2 border-1 hover:cursor-pointer uppercase text-sm"
                        onClick={() => console.log("Rezerviraj”")}
                        hidden={!selDates}
                      >
                        Rezerviraj
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          );
        })}
      </div>
    </>
  );
}
