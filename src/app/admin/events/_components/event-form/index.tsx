"use client";

import StepsPage from "@/components/Steps";
import General from "./General";
import LocationAndDate from "./LocationAndDate";
import Media from "./Media";
import Tickets from "./Tickets";
import { useEffect, useState } from "react";
import { uploadImagesToFirebase } from "@/helpers/imageUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  initialData?: any;
  type?: "edit" | "create";
}

function EventForm({ initialData, type = "create" }: Props) {
  const [alreadyUploadedImages = [], setAlreadyUploadedImages] = useState<
    string[]
  >([]);

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [activeStep = 0, setActiveStep] = useState<number>(0);

  const [newlySelectedImages = [], setNewlySelectedImages] = useState<any[]>(
    []
  );

  const router = useRouter();

  async function onSubmit(e: any) {
    try {
      setLoading(true);
      e.preventDefault();
      if (type === "create") {
        event.images = await uploadImagesToFirebase(
          newlySelectedImages.map((image: any) => image.file)
        );
        await axios.post("/api/admin/events", event);
        toast.success("Event created successfully");
      } else {
        const newlyUploadedImageUrls = await uploadImagesToFirebase(
          newlySelectedImages.map((image: any) => image.file)
        );
        event.images = [...alreadyUploadedImages, ...newlyUploadedImageUrls];
        await axios.put(`/api/admin/events/${event._id}`, event);
        toast.success("Event updated successfully");
      }
      router.refresh();
      router.push("/admin/events");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const commonProps = {
    event,
    setEvent,
    activeStep,
    setActiveStep,
    newlySelectedImages,
    setNewlySelectedImages,

    alreadyUploadedImages,
    setAlreadyUploadedImages,

    loading,
  };

  useEffect(() => {
    if (initialData) {
      setEvent(initialData);
      setAlreadyUploadedImages(initialData.images);
    }
  }, [initialData]);

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
