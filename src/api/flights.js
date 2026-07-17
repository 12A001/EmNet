// src/api/flights.js
import axios from "axios";
import config from "@/config/api";

export async function searchFlights(form) {
  try {
    const res = await axios.post(`${config.BACKEND}/flights/search`, {
      origin: form.origin,
      destination: form.destination,
      departDate: form.departDate,
      returnDate: form.returnDate,
      tripType: form.tripType,
      currency: form.currency || "NGN",
    });
    return res.data;
  } catch (err) {
    console.error("Error searching flights:", err.message);
    throw err;
  }
}
