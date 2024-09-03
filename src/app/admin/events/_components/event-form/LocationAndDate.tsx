import { Button, Input } from "@nextui-org/react";
import { EventFormStepProp } from "./General";

function LocationAndDate({
  event,
  setEvent,
  activeStep,
  setActiveStep,
}: EventFormStepProp) {
  return (
    <div className=" flex flex-col gap-5">
      <Input
        placeholder="Location"
        value={event?.location}
        onChange={(e) => setEvent({ ...event, location: e.target.value })}
        isRequired
      />
      <div className="flex gap-5">
        <Input
          placeholder="Date"
          isRequired
          value={event?.date}
          type="date"
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
        />
        <Input
          placeholder="Time"
          isRequired
          value={event?.time}
          type="time"
          onChange={(e) => setEvent({ ...event, time: e.target.value })}
        />
      </div>
      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveStep(activeStep - 1)}>back</Button>
        <Button
          isDisabled={!event?.time || !event.date || !event.location}
          onClick={() => setActiveStep(activeStep + 1)}
          color="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default LocationAndDate;
