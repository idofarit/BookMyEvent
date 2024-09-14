"use client";

import { EventType } from "@/interfaces/events";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import PaymentModel from "./PaymentModel";
const stripePromise = loadStripe(
  "pk_test_51PyqwTSCeV407w3FjOMewpUZx0915BHV19ArXwSFWiiIieFmCCL7NBiwThG4IYJaAqu2kjwIlLq4V4e5sIxBITYi00w1eh9enZ"
);

interface TicketSelectionProp {
  event: EventType;
  eventBookings: any;
}

function TicketSelection({ event, eventBookings }: TicketSelectionProp) {
  const [ticketCount, setTicketCount] = useState(1);
  const [seletedTicketType, setSelectedTicketType] = useState(
    event.ticketTypes[0].name
  );
  const [clientSecret, setClientSecret] = useState("");

  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const ticketType = event.ticketTypes.find(
      (ticketType) => ticketType.name === seletedTicketType
    );

    if (ticketType) {
      setTotalAmount(ticketType.price * ticketCount);
    }
  }, [ticketCount, seletedTicketType]);

  const limits: any = {};

  event.ticketTypes.forEach((ticketType) => {
    let bookedTickets = 0;
    eventBookings.forEach((booking: any) => {
      if (booking.ticketType === ticketType.name) {
        bookedTickets += booking.ticketsCount;
      }
    });

    limits[ticketType.name] = ticketType.limit - bookedTickets;
  });

  const getClientSecret = async () => {
    try {
      // check if limit touched
      if (limits[seletedTicketType] === 0) {
        toast.error("Tickets limit reached");
        return;
      }
      if (limits[seletedTicketType] < ticketCount) {
        toast.error(`Only ${limits[seletedTicketType]} tickets left`);
        return;
      }

      setLoading(true);
      const response = await axios.post("/api/stripe/client-secret", {
        amount: totalAmount * 100,
      });
      setClientSecret(response.data.clientSecret);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showPaymentModal) getClientSecret();
  }, [showPaymentModal]);

  return (
    <div className="mt-7">
      <div>
        <h1 className="text-xl font-semibold">Select tickets</h1>
        <div className="grid grid-cols-4 gap-10 mt-3">
          {event.ticketTypes.map((ticketType) => (
            <div
              key={ticketType.name}
              className={`bg-gray-100 border p-3 rounded-sm cursor-pointer
              
                ${
                  seletedTicketType === ticketType.name
                    ? "border-blue-800"
                    : "border-gray-200 "
                }
                `}
              onClick={() => setSelectedTicketType(ticketType.name)}
            >
              <h1 className="font-semibold">{ticketType.name}</h1>
              <h1 className="text-gray-600 text-sm flex justify-between">
                ₹ {ticketType.price}{" "}
                <span>({limits[ticketType.name]} tickets left)</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-xl font-semibold">Select ticket count</h1>
        <div className="flex flex-wrap mt-2 gap-1">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`bg-gray-100 border h-12 w-14 rounded-sm flex justify-center items-center cursor-pointer
              ${
                ticketCount === index + 1
                  ? "border-blue-800"
                  : "border-gray-200 "
              }
             `}
              onClick={() => setTicketCount(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 bg-gray-300 rounded border-gray-400 p-3 flex justify-between items-center">
        <h1 className="font-semibold text-xl ">
          Total Amount: ₹ {totalAmount}
        </h1>
        <Button
          isLoading={loading}
          color="primary"
          onClick={() => setShowPaymentModal(!showPaymentModal)}
        >
          Book Now
        </Button>
      </div>

      {showPaymentModal && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentModel
            showPaymentModel={showPaymentModal}
            setShowPaymentModel={setShowPaymentModal}
            event={event}
            ticketType={seletedTicketType}
            ticketsCount={ticketCount}
            totalAmount={totalAmount}
          />
        </Elements>
      )}
    </div>
  );
}
export default TicketSelection;
