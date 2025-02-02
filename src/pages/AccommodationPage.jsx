import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccommodations } from "../util/apiCalls";
import {
  customModalStyles,
  renderReadableDate,
  getDatesInRange,
  sumArrayNumbers,
} from "../util/utils";
import { v4 as uuidv4 } from "uuid";
import Filters from "../components/Filter/Filter";
import Modal from "react-modal";
import Pill from "../components/Pills/Pill";
import PriceRange from "../components/Prices/PriceRange";
import BookingInfo from "../components/Prices/BookingInfo";

export default function AccommodationPage() {
  const [accommodation, setAccommodation] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selDates, setSelDates] = useState(false);
  const [selGuestCount, setSelGuestCount] = useState(1);
  const [isModalOn, setIsModalOn] = useState(false);
  const navigate = useNavigate();

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
      const datesInRange = getDatesInRange(selDates[0], selDates[1]);
      const pricesArray = [];
      for (const date of datesInRange) {
        const d = date.toISOString().split("T")[0];
        const matchingObj = a.pricelistInEuros.find((obj) => {
          if (d >= obj.intervalStart && d < obj.intervalEnd) {
            return true;
          }
        });
        pricesArray.push(matchingObj.pricePerNight);
      }
      pricesArray.pop(); // remove the last price of the interval - since it is a departure date 
      computedTotalPrice = sumArrayNumbers(pricesArray);
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

  const saveBooking = () => {
    const bookingData = {};
    bookingData["id"] = uuidv4();
    bookingData["accommodationId"] = accommodation.id;
    bookingData["accommodationTitle"] = accommodation.title;
    bookingData["guestCount"] = selGuestCount;
    bookingData["selDates"] = accommodation.selDates;
    bookingData["selDates"] = [
      renderReadableDate(selDates[0]),
      renderReadableDate(selDates[1]),
    ]; // convert date object to string for JSON below
    bookingData["totalPrice"] = accommodation.computedTotalPrice;
    bookingData["bookingStatus"] = "submitted";
    console.log("bookingData: ", bookingData);
    localStorage.setItem("booking", JSON.stringify(bookingData)); // simulate db store
    navigate("/booking/" + bookingData["id"]);
  };

  return (
    <>
      <Filters
        accommodations={accommodations}
        onSetFilteredAccommodations={(fa) => setFilteredAccommodations(fa)}
        onDatesSave={(dates) => setSelDates(dates)}
        onSetSelGuestCount={(selCapacity) => setSelGuestCount(selCapacity)}
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
                    <h1 className="text-xl text-gray-700 font-semibold uppercase mx-1">
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
                    <BookingInfo
                      selDates={selDates}
                      accommodation={accommodation}
                    />

                    <div className="pt-10 flex justify-between gap-2">
                      <button
                        className="px-3 py-1 hover:cursor-pointer uppercase text-sm py-2"
                        onClick={() => setIsModalOn(false)}
                      >
                        {`< Nazad`}
                      </button>
                      <button
                        className="bg-zinc-800 hover:bg-zinc-950 transition-all text-white px-4 py-2 border-1 hover:cursor-pointer uppercase text-sm"
                        onClick={saveBooking}
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
