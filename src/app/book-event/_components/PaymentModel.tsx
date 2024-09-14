import { EventType } from "@/interfaces/events";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import {
  PaymentElement,
  AddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface PaymentModelProps {
  showPaymentModel: boolean;
  setShowPaymentModel: (show: boolean) => void;
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  totalAmount: number;
}

function PaymentModel({
  showPaymentModel,
  setShowPaymentModel,
  event,
  ticketType,
  ticketsCount,
  totalAmount,
}: PaymentModelProps) {
  // promotion import code start
  // promotion import code end

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_DOMAIN!}/bookings`,
        },
        redirect: "if_required",
      });
      if (result.error) {
        toast.error(result.error.message!);
      } else {
        toast.success("Payment successfull");

        const reqBody = {
          event: event._id,
          ticketType,
          ticketsCount,
          totalAmount,
          paymentID: result.paymentIntent?.id,
        };

        await axios.post("/api/bookings", reqBody);
        toast.success("Event Booked successfully");
        router.refresh();
        router.push("/bookings");
      }
    } catch (error: any) {
      toast.error("Something went wrong, if amount deducted, Contact us!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      size="xl"
      isOpen={showPaymentModel}
      onClose={() => setShowPaymentModel(false)}
    >
      <ModalContent>
        <form className="p-10 rounded" onSubmit={handleSubmit}>
          <PaymentElement />
          <AddressElement
            options={{ allowedCountries: ["in"], mode: "billing" }}
          />
          <div className="flex justify-end gap-5 mt-5 items-center">
            <Button color="primary" type="submit" isLoading={loading}>
              Pay
            </Button>
            <Button color="default" type="button">
              Cancel
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
}
export default PaymentModel;
