import { renderReadableDate } from "../../util/utils"

export default function BookingInfo({ selDates, accommodation }) {
  if (selDates[0] && selDates[1]) {
    return (
      <div className="mt-3 p-2">
        <p>
          Dates:{" "}
          <b>
            {renderReadableDate(selDates[0])} to{" "}
            {renderReadableDate(selDates[1])}
          </b>
        </p>
        <p>
          Total Price: <b>€{accommodation?.computedTotalPrice}</b>
        </p>
      </div>
    );
  }
}
