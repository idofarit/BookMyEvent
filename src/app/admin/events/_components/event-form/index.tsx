"use client";

import StepsPage from "@/components/Steps";
import General from "./General";
import LocationAndDate from "./LocationAndDate";
import Media from "./Media";
import Tickets from "./Tickets";
import { useState } from "react";

function EventForm() {
  const [activeStep = 0, setActiveStep] = useState<number>(0);

  const [event, setEvent] = useState<any>(null);

  function onSubmit(e: any) {
    e.preventDefault();
  }

  const commonProps = { event, setEvent, activeStep, setActiveStep };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <StepsPage
          stepName={["General", "Location & Date", "Media", "Tickets"]}
          stepsContent={[
            <General {...commonProps} />,
            <LocationAndDate {...commonProps} />,
            <Media {...commonProps} />,
            <Tickets {...commonProps} />,
          ]}
          activeStep={activeStep}
        />
      </form>
    </div>
  );
}
export default EventForm;
