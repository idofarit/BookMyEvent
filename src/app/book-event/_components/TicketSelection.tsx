"use client";

import { EventType } from "@/interfaces/events";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface TicketSelectionProp {
  event: EventType;
}

function TicketSelection({ event }: TicketSelectionProp) {
  const [ticketCount, setTicketCount] = useState(1);
  const [seletedTicketType, setSelectedTicketType] = useState(
    event.ticketTypes[0].name
  );

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const ticketType = event.ticketTypes.find(
      (ticketType) => ticketType.name === seletedTicketType
    );

    if (ticketType) {
      setTotalAmount(ticketType.price * ticketCount);
    }
  }, [ticketCount, seletedTicketType]);

  return (
    <div className="mt-7">
      <div>
        <h1 className="text-xl font-semibold">Select tickets</h1>
        <div className="grid grid-cols-4 gap-10 mt-3">
          {event.ticketTypes.map((ticketType) => (
            <div
              key={ticketType.name}
              className={`bg-gray-100 border border-gray-200 p-3 rounded cursor-pointer
                
                ${seletedTicketType === ticketType.name && `border-blue-950`}
                
                `}
              onClick={() => setSelectedTicketType(ticketType.name)}
            >
              <h1 className="font-semibold">{ticketType.name}</h1>
              <h1 className="text-gray-600 text-sm">₹ {ticketType.price}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-xl font-semibold">Select ticket count</h1>
        <div className="flex flex-wrap mt-2 gap-1">
          {[...Array(10)].map((_, index) => (
            <div
              className={`bg-gray-100 border border-gray-200 h-12 w-14 rounded flex justify-center items-center cursor-pointer
                
                ${ticketCount === index + 1 && `border-blue-950`}
                
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
        <Button color="primary">Book Now</Button>
      </div>
    </div>
  );
}
export default TicketSelection;
