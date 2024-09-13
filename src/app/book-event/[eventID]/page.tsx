import { connectMongoDB } from "@/config/dbConfig";
import { EventType } from "@/interfaces/events";
import BookingModel from "@/models/booking-model";
import EventModel from "@/models/event-model";
import Image from "next/image";

connectMongoDB();

interface Props {
  params: {
    eventID: string;
  };
}

async function BookEventPage({ params }: Props) {
  const event: EventType = (await EventModel.findById(params.eventID)) as any;

  const getEventProperty = (property: string) => {
    return (
      <div className="flex flex-col text-sm">
        <h1 className="font-semibold capitalize">{property}</h1>
        <h1 className="text-gray-600">{event[property as keyof EventType]}</h1>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-gray-700 p-5">
        <h1 className="text-3xl text-white font-semibold">{event.name}</h1>
        <div className="text-sm">
          <div className="text-sm flex gap-5 p-2">
            <h1 className="text-white">
              <i className="ri-map-pin-fill pr-3"></i>
              {event.location}
            </h1>
            <h1 className="text-white">
              <i className="ri-calendar-schedule-fill pr-3"></i>
              {event.date} at {event.time} hrs
            </h1>
          </div>
        </div>
      </div>
      <div className="flex gap-5 p-3 flex-wrap overflow-auto mt-5">
        {event.images.map((image) => (
          <img
            src={image}
            alt="Picture of event"
            height={330}
            width={350}
            className="rounded"
          />
        ))}
      </div>

      <p className="w-full mt-5 text-sm">{event.description}</p>

      <div className="mt-10  rounded-sm grid grid-cols-1 md:grid-cols-3 gap-5">
        {getEventProperty("organizer")}
        {getEventProperty("location")}
        {getEventProperty("date")}
        {getEventProperty("time")}

        <div className="flex flex-col text-sm">
          <h1 className="font-semibold capitalize">Chief Guests</h1>
          <h1 className="text-gray-600">{event.guests.join(", ")}</h1>
        </div>
      </div>
    </div>
  );
}
export default BookEventPage;
