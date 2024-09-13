import { Button, Input } from "@nextui-org/react";
import { EventFormStepProp } from "./General";
import toast from "react-hot-toast";

function Tickets({
  setActiveStep,
  setEvent,
  event,
  setNewlySelectedImages,
  activeStep,
  newlySelectedImages,
  loading,
}: EventFormStepProp) {
  const onAddTicketType = () => {
    try {
      const tempEvent = { ...event };
      if (event.ticketTypes) {
        tempEvent.ticketTypes.push({
          name: "",
          price: 0,
          limit: 0,
        });
      } else {
        tempEvent.ticketTypes = [{ name: "", price: 0, limit: 0 }];
      }

      setEvent(tempEvent);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onTicketPropertyChange = ({
    index,
    property,
    value,
  }: {
    index: number;
    property: string;
    value: any;
  }) => {
    const tempEvent = { ...event };
    tempEvent.ticketTypes[index][property] = value;
    setEvent(tempEvent);
  };

  const onTicketTypeDelete = (index: number) => {
    const tempEvent = { ...event };
    tempEvent.ticketTypes.splice(index, 1);
    setEvent(tempEvent);
  };

  return (
    <div>
      {event.ticketTypes && event.ticketTypes.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="gap-5 grid grid-cols-4 rounded justify-between">
            {["Name", "Price", "Limit", ""].map((item, index) => (
              <h3 key={index}>{item}</h3>
            ))}
          </div>

          {event.ticketTypes.map((ticketType: any, index: number) => (
            <div className="gap-5 grid grid-cols-4 pb-3" key={index}>
              <Input
                placeholder="Name"
                onChange={(e) =>
                  onTicketPropertyChange({
                    index,
                    property: "name",
                    value: e.target.value,
                  })
                }
                value={ticketType.name}
                type="string"
              />
              <Input
                placeholder="Price"
                onChange={(e) =>
                  onTicketPropertyChange({
                    index,
                    property: "price",
                    value: Number(e.target.value),
                  })
                }
                value={ticketType.price}
                type="number"
              />
              <Input
                placeholder="Limit"
                onChange={(e) =>
                  onTicketPropertyChange({
                    index,
                    property: "limit",
                    value: Number(e.target.value),
                  })
                }
                value={ticketType.limit}
                type="number"
              />
              <Button isIconOnly onClick={() => onTicketTypeDelete(index)}>
                <i className="ri-delete-bin-6-line"></i>
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button onClick={onAddTicketType}>Add ticket type</Button>

      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveStep(activeStep - 1)}>back</Button>
        <Button
          type="submit"
          isDisabled={event?.ticketTypes?.length === 0}
          color="primary"
          isLoading={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
export default Tickets;
