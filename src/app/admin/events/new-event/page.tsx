import PageTitle from "@/components/PageTitle";
import EventForm from "../_components/event-form";

function NewEventPage() {
  return (
    <div>
      <PageTitle title="New Event" />

      <div className="mt-12">
        <EventForm />
      </div>
    </div>
  );
}
export default NewEventPage;
