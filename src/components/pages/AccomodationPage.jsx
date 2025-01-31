import { useEffect, useState } from "react";
import { getAccomodations } from "../../util/apiCalls";
import Filters from "../Filter/Filter";
import Modal from "react-modal";

export default function AccomodationPage() {
  const [accomodation, setAccomodation] = useState(false);
  const [accomodations, setAccomodations] = useState([]);
  const [filteredAccomodations, setFilteredAccomodations] = useState([]);
  const [selDates, setSelDates] = useState(false);
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(() => {
    getAccomodations(
      (r) => {
        setAccomodations(r);
        setFilteredAccomodations(r);
      },
      (err) => console.log(err)
    );
  }, []);

  useEffect(() => {
    if (accomodation) {
      setIsModalOn(true);
    }
  }, [accomodation]);

  useEffect(() => {
    // calculate
    console.log("sel dates: ", selDates);
  }, [selDates]);

  const onAccomodationOpening = (a) => {
    let computedTotalPrice;
    let minAccomodationPrice;
    let maxAccomodationPrice;
    if (selDates) {
      /* compute total price */
      const matchingObj = a.pricelistInEuros.filter((obj) => {
        if (
          selDates[0] >= new Date(obj.intervalStart) &&
          selDates[1] < new Date(obj.intervalEnd)
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
      minAccomodationPrice = Math.min(
        ...a.pricelistInEuros.map((item) => item.pricePerNight)
      );
      maxAccomodationPrice = Math.max(
        ...a.pricelistInEuros.map((item) => item.pricePerNight)
      );
    }

    // attach prebooking data to accomodation
    const extendedAccomodationData = {
      ...a,
      minAccomodationPrice,
      maxAccomodationPrice,
    };
    if (selDates) {
      extendedAccomodationData["selDates"] = selDates;
      extendedAccomodationData["computedTotalPrice"] = computedTotalPrice;
    }
    setAccomodation(extendedAccomodationData);
  };

  const customStyles = {
    content: {
      padding: "0",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "365px",
      boxShadow: "1px 1px 3px rgb(224, 224, 224)",
    },
  };

  return (
    <>
      <Filters
        accomodations={accomodations}
        onSetFilteredAccomodations={(fa) => setFilteredAccomodations(fa)}
        onDatesSave={(dates) => setSelDates(dates)}
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {filteredAccomodations.map((a) => {
          return (
            <div key={a.id}>
              <div
                onClick={() => onAccomodationOpening(a)}
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
                style={customStyles}
                ariaHideApp={false}
                // onRequestClose={() => setSelDates(false)}
              >
                <img src={accomodation.image} />
                <div className="px-3 pt-1 pb-2">
                  <div>
                    <h1 className="text-xl font-semibold uppercase">
                      {accomodation.title}
                    </h1>
                    <br></br>
                    <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                      <span>Capacity </span>
                      <span className="font-semibold text-green-700">
                        {accomodation.capacity}
                      </span>
                    </div>
                    {accomodation.beachDistanceInMeters && (
                      <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                        <span>Beach Distance </span>
                        <span className="font-semibold text-green-700">
                          {accomodation.beachDistanceInMeters}m
                        </span>
                      </div>
                    )}
                    <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                      Air Conditioning{" "}
                      {accomodation.amenitie?.airConditioning ? (
                        <span className="text-green-600">✔</span>
                      ) : (
                        <span className="text-gray-700 w-auto text-sm">✖</span>
                      )}
                    </div>
                    <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                      Parking{" "}
                      {accomodation.amenities?.parking ? (
                        <span className="text-green-600 w-auto">✔</span>
                      ) : (
                        <span className="text-gray-700 w-auto text-sm">✖</span>
                      )}
                    </div>
                    <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                      Pets{" "}
                      {accomodation.amenities?.pets ? (
                        <span className="text-green-600">✔</span>
                      ) : (
                        <span className="text-gray-700 w-auto text-sm">✖</span>
                      )}
                    </div>
                    <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                      Pool{" "}
                      {accomodation.amenities?.pool ? (
                        <span className="text-green-600">✔</span>
                      ) : (
                        <span className="text-gray-700 w-auto text-sm">✖</span>
                      )}
                    </div>
                    <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                      Wifi{" "}
                      {accomodation.amenities?.wifi ? (
                        <span className="text-green-500">✔</span>
                      ) : (
                        <span className="text-gray-700 w-auto text-sm">✖</span>
                      )}
                    </div>
                    <div className="inline-block px-4 py-1 m-1 border-1 border-gray-500 rounded-2xl w-auto whitespace-nowrap">
                      TV{" "}
                      {accomodation.amenities?.tv ? (
                        <span className="text-green-600 w-auto">✔</span>
                      ) : (
                        <span className="text-gray-700 w-auto text-sm">✖</span>
                      )}
                    </div>

                    {!selDates &&
                      accomodation.minAccomodationPrice &&
                      accomodation.maxAccomodationPrice && (
                        <div className="mt-3 p-2">
                          <p>
                            Pricing:{" "}
                            <b>
                              €{accomodation.minAccomodationPrice}–
                              {accomodation.maxAccomodationPrice}
                            </b>{" "}
                            (per day)
                          </p>
                          <p className="text-gray-500 text-sm">
                            (Select dates to view pricing for your booking)
                          </p>
                        </div>
                      )}

                    {selDates[0] && selDates[1] && (
                      <div className="mt-3 p-2">
                        <p>
                          Date:{" "}
                          <b>
                            {selDates[0]
                              .toISOString()
                              .split("T")[0]
                              .replace(/-/g, "/")}{" "}
                            -{" "}
                            {selDates[1]
                              .toISOString()
                              .split("T")[0]
                              .replace(/-/g, "/")}
                          </b>
                        </p>
                        <p>
                          Total Price:{" "}
                          <b>€{accomodation?.computedTotalPrice}</b>
                        </p>
                      </div>
                    )}

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
