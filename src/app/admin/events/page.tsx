import PageTitle from "@/components/PageTitle";
import Link from "next/link";

function EventPage() {
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
    </div>
  );
}
export default EventPage;
