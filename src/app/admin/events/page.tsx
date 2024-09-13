import PageTitle from "@/components/PageTitle";
import { EventType } from "@/interfaces/events";
import EventModel from "@/models/event-model";
import Link from "next/link";
import EventsTable from "./_components/events-table";
import { connectMongoDB } from "@/config/dbConfig";

connectMongoDB();

async function EventPage() {
  const events: EventType[] = (await EventModel.find().sort({
    createdAt: -1,
  })) as any;

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Events" />
        <Link
          href="/admin/events/new-event"
          className="rounded-md p-2 text-sm tracking-widest text-center items-center bg-gradient-to-tr from-violet-500 to-blue-300 text-white shadow-lg"
        >
          Create Event
        </Link>
      </div>

      <EventsTable events={JSON.parse(JSON.stringify(events))} />
    </div>
  );
}
export default EventPage;
