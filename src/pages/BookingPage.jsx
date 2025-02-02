import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../util/utils";

export default function BookingPage() {
  const [booking, setBooking] = useState();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    setBooking(JSON.parse(localStorage.getItem("booking")));
  }, []);

  if (booking && booking.id != params.id) {
    return navigate("/");
  }

  return (
    <div className="mt-10 p-3 rounded-md shadow-md bg-indigo-50">
      <h1 className="text-2xl font-bold text-gray-800">
        Uspješno ste rezervirali smještaj{" "}
        <span className="uppercase">{booking?.accommodationTitle}</span>
      </h1>
      <div className="mt-10 text-md">
        <div className="mt-5 text-gray-800">
          <p className="uppercase text-sm tracking-wide">Termin boravka</p>
          <p className="font-bold">
            od {booking?.selDates[0]} do {booking?.selDates[1]}
          </p>
        </div>
        <div className="mt-5 text-gray-800">
          <p className="uppercase text-sm tracking-wide">Broj osoba</p>
          <p className="font-bold">{booking?.guestCount}</p>
        </div>
        <div className="mt-5 text-gray-800">
          <p className="uppercase text-sm tracking-wide">Ukupna cijena</p>
          <p className="font-bold">{formatPrice(booking?.totalPrice)}</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-zinc-800 hover:bg-zinc-950 transition-all text-white px-4 py-2 border-1 hover:cursor-pointer uppercase text-sm mt-10"
      >
        Accommodations
      </button>
    </div>
  );
}
