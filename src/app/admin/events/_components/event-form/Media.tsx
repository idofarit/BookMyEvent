import { Button } from "@nextui-org/react";
import { EventFormStepProp } from "./General";
import { useRef } from "react";
import toast from "react-hot-toast";

function Media({
  newlySelectedImages,
  setNewlySelectedImages,
  event,
  setEvent,
  setActiveStep,
  activeStep,
  alreadyUploadedImages,
  setAlreadyUploadedImages,
}: EventFormStepProp) {
  const uploadFileRef = useRef<HTMLInputElement>(null);

  const onFileSelect = (e: any) => {
    try {
      const files = e.target.files;
      const filesArray = Array.from(files);

      // set the newly selected images with url

      const existingNewlySelectedImages = newlySelectedImages || [];
      const newImages = filesArray.map((file: any) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setNewlySelectedImages([...existingNewlySelectedImages, ...newImages]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onNewUploadedRemove = (index: number) => {
    const tempImages: any[] = [...newlySelectedImages];
    tempImages.splice(index, 1);
    setNewlySelectedImages(tempImages);
  };

  const onAlreadyUploadedRemove = (index: number) => {
    const tempImages: string[] = [...alreadyUploadedImages];
    tempImages.splice(index, 1);
    setAlreadyUploadedImages(tempImages);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="w-max">
        <Button
          onClick={() => uploadFileRef.current?.click()}
          startContent={<i className="ri-upload-2-line" />}
        >
          <input
            onChange={onFileSelect}
            type="file"
            ref={uploadFileRef}
            hidden
          />
          Upload image
        </Button>
      </div>

      {/* show the newly selected images */}

      <div className="flex gap-5">
        {alreadyUploadedImages?.map((image: any, index: number) => (
          <div className="border pb-3 rounded flex flex-col gap-5" key={index}>
            <img
              className="w-40 h-40 object-cover"
              src={image}
              key={index}
              alt="newly selected"
            />
            <h3
              onClick={() => onAlreadyUploadedRemove(index)}
              className="cursor-pointer underline text-center"
            >
              remove
            </h3>
          </div>
        ))}
        {newlySelectedImages?.map((image: any, index: number) => (
          <div className="border pb-3 rounded flex flex-col gap-5" key={index}>
            <img
              className="w-40 h-40 object-cover"
              src={image.url}
              key={index}
              alt="newly selected"
            />
            <h3
              onClick={() => onNewUploadedRemove(index)}
              className="cursor-pointer underline text-center"
            >
              remove
            </h3>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveStep(activeStep - 1)}>back</Button>
        <Button
          isDisabled={!newlySelectedImages}
          onClick={() => setActiveStep(activeStep + 1)}
          color="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default Media;
