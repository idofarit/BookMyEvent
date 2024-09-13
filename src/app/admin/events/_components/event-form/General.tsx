import { Button, Chip, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

export interface EventFormStepProp {
  event: any;
  setEvent: React.Dispatch<React.SetStateAction<any>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  newlySelectedImages: any[];
  setNewlySelectedImages: React.Dispatch<React.SetStateAction<any[]>>;
  alreadyUploadedImages: string[];
  setAlreadyUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
}

function General({
  event,
  activeStep,
  setActiveStep,
  setEvent,
}: EventFormStepProp) {
  const getCommonProps = (name: string) => {
    return {
      value: event?.[name],
      onChange: (e: any) => setEvent({ ...event, [name]: e.target.value }),
      isRequired: true,
    } as any;
  };

  const [guest, setGuest] = useState<string>("");

  const onGuestAdd = () => {
    const newGuest = [];

    const commaSeperatedGuest = guest.split(",");

    // if more than one guest then add multiple
    if (commaSeperatedGuest.length > 1) {
      newGuest.push(...commaSeperatedGuest);
    } else {
      // else add single guest
      newGuest.push(guest);
    }

    // if already guests are present
    if (event?.guests) {
      newGuest.push(...event.guests);
    }

    setEvent({ ...event, guests: newGuest });
    setGuest("");
  };

  const onGuestRemove = (guestToRemove: number) => {
    const newGuest = event?.guests?.filter(
      (_: string, index: number) => index !== guestToRemove
    );
    setEvent({ ...event, guests: newGuest });
  };

  return (
    <div className="flex flex-col gap-5 ">
      <Input placeholder="Event Name" {...getCommonProps("name")} />
      <Input
        placeholder="Enter Organizer name"
        {...getCommonProps("organizer")}
      />
      <Textarea
        placeholder="Enter the event description"
        {...getCommonProps("description")}
      />
      <div className="flex gap-5 items-end">
        <Input
          placeholder="Enter guests of events;  example: messi, ronaldo, virat..."
          value={guest}
          isRequired
          onChange={(e) => setGuest(e.target.value)}
        />
        <Button color="primary" size="sm" radius="md" onClick={onGuestAdd}>
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-5">
        {event?.guests?.map((item: string, id: number) => (
          <Chip key={id} onClose={() => onGuestRemove(id)}>
            {item}
          </Chip>
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => {}}>cancel</Button>
        <Button
          isDisabled={!event?.name || !event.organizer || !event.description}
          onClick={() => setActiveStep(activeStep + 1)}
          color="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default General;
