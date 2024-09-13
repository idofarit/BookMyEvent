import PageTitle from "@/components/PageTitle";
import EventForm from "../../_components/event-form";
import EventModel from "@/models/event-model";
import { connectMongoDB } from "@/config/dbConfig";
import { useParams } from "next/navigation";

connectMongoDB();

interface Props {
  params: {
    eventID: string;
  };
}

async function EditEventPage({ params }: Props) {
  const eventID = params.eventID;

  const event = await EventModel.findById(eventID);

  return (
    <div>
      <PageTitle title="Edit Event" />

      <div className="p-5 mt-5">
        <EventForm
          initialData={JSON.parse(JSON.stringify(event))}
          type="edit"
        />
      </div>
    </div>
  );
}
export default EditEventPage;
