import PageTitle from "@/components/PageTitle";
import { connectMongoDB } from "@/config/dbConfig";
import EventModel from "@/models/event-model";
import EventsTableForReports from "./_components/ReportsForEventsTable";

connectMongoDB();

async function ReportsPage() {
  const events = await EventModel.find({});
  return (
    <>
      <PageTitle title="Reports" />
      <EventsTableForReports events={JSON.parse(JSON.stringify(events))} />
    </>
  );
}
export default ReportsPage;
