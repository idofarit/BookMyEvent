import {
  getCurrentUserFromMongoDb,
  handleNewUserRegistration,
} from "@/actions/users";
import Filters from "@/components/Filters";
import { EventType } from "@/interfaces/events";
import EventModel from "@/models/event-model";
import Image from "next/image";
import Link from "next/link";

interface Props {
  searchParams: {
    name: string;
    date: string;
  };
}

export default async function Home({ searchParams }: Props) {
  await handleNewUserRegistration();

  await getCurrentUserFromMongoDb();

  let filters = {};
  if (searchParams.name) {
    filters = {
      name: {
        $regex: searchParams.name,
        $options: "i",
      },
    };
  }

  if (searchParams.date) {
    filters = {
      ...filters,
      date: searchParams.date,
    };
  }

  const events: EventType[] = (await EventModel.find(filters).sort({
    createdAt: -1,
  })) as any;

  return (
    <div>
      <Filters />
      <div className="flex flex-col gap-5">
        {events.map((event) => (
          <div
            key={event._id}
            className="grid grid-cols-3  rounded-sm gap-10 p-3"
          >
            <div className="col-span-1">
              <Image
                className="w-full object-contain rounded"
                height={130}
                width={250}
                src={event.images[0]}
                alt="Picture of event"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-3 justify-between p-3">
              <h1 className="font-semibold text-gray-800">{event.name}</h1>
              <p className="text-gray-500 w-full line-clamp-3">
                {event.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <h1>
                    <i className="ri-map-pin-fill pr-3"></i>
                    {event.location}
                  </h1>
                  <h1>
                    <i className="ri-calendar-schedule-fill pr-3"></i>
                    {event.date} at {event.time} hrs
                  </h1>
                </div>
                <Link
                  className="bg-gradient-to-tr from-violet-500 to-blue-300 text-white shadow-lg p-2 rounded"
                  href={`/book-event/${event._id}`}
                >
                  view event
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="w-full mt-100 flex justify-center">
          <h1 className="text-sm">No events found for your search</h1>
        </div>
      )}
    </div>
  );
}
