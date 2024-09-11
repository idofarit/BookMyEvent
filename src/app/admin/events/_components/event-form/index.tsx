"use client";

import StepsPage from "@/components/Steps";
import General from "./General";
import LocationAndDate from "./LocationAndDate";
import Media from "./Media";
import Tickets from "./Tickets";
import { useState } from "react";
import { uploadImagesToFirebase } from "@/helpers/imageUpload";
import toast from "react-hot-toast";

function EventForm() {
  const [activeStep = 0, setActiveStep] = useState<number>(0);

  const [newlySelectedImages = [], setNewlySelectedImages] = useState<any[]>(
    []
  );

  const [event, setEvent] = useState<any>(null);

  async function onSubmit(e: any) {
    e.preventDefault();
    try {
      event.images = await uploadImagesToFirebase(
        newlySelectedImages.map((image: any) => image.file)
      );
      console.log(event);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const commonProps = {
    event,
    setEvent,
    activeStep,
    setActiveStep,
    newlySelectedImages,
    setNewlySelectedImages,
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <StepsPage
          stepName={["General", "Location & Date", "Media", "Tickets"]}
          stepsContent={[
            <General {...commonProps} />,
            <LocationAndDate {...commonProps} />,
            <Media
              {...commonProps}
              newlySelectedImages={newlySelectedImages}
              setNewlySelectedImages={setNewlySelectedImages}
            />,
            <Tickets {...commonProps} />,
          ]}
          activeStep={activeStep}
        />
      </form>
    </div>
  );
}
export default EventForm;
