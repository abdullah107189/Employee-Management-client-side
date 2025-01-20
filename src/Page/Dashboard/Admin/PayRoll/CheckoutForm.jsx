/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaSpinner } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const CheckoutForm = ({ employee, refetch, setShowModal }) => {
  const [paymentError, setPaymentError] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axisoSecure = useAxiosSecure();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [payLoading, setPayLoading] = useState({
    isShow: false,
    isWorking: true,
  });
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await axisoSecure.post("/create-payment-intent", {
          price: employee?.salary,
        });
        setSecretKey(res.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    createPaymentIntent();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPayLoading({ isShow: true, isWorking: true });
    if (!secretKey) {
      setPayLoading({ isShow: false });
      return;
    }

    if (!stripe || !elements) {
      setPayLoading({ isShow: false });
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      setPayLoading({ isShow: false });
      return;
    }
    // eslint-disable-next-line no-unused-vars
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setPayLoading({ isShow: false });
      setPaymentError(error.message);
    } else {
      setPayLoading({ isShow: true });
      setPaymentError("");
    }
    setPayLoading({ isShow: true });
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(secretKey, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      setPayLoading({ isShow: false });
    } else {
      setPayLoading({ isShow: true });
      if (paymentIntent?.status === "succeeded") {
        setPayLoading({ isShow: true });
        const { data } = await axiosSecure.patch(
          `/payment-update/${
            employee?._id
          }?paymentDate=${new Date()}&transactionId=${paymentIntent?.id}`
        );
        if (data.modifiedCount > 0) {
          toast.success("Payment Successful ✅");
          refetch();
          setShowModal({ isOpen: false });
          setPaymentError(paymentIntent?.id);
        }
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <CardElement
          className="text-blue-300 p-2 rounded-full shadow-md "
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {paymentError && <p className="text-red-400">{paymentError}</p>}
        <button
          className="flex items-center mx-auto justify-center gap-2 actionBtn mt-3 !p-2 !px-5 disabled:btn-disabled disabled:bg-gray-500 disabled:text-gray-50 "
          type="submit"
          disabled={!stripe || !secretKey}
        >
          Pay
          {payLoading?.isWorking ? (
            <span
              className={`${
                payLoading?.isShow === true ? "flex" : "hidden"
              } animate-spin`}
            >
              <FaSpinner></FaSpinner>
            </span>
          ) : (
            <span
              className={`${payLoading?.isShow !== true ? "hidden" : "flex"}`}
            >
              <IoMdCheckmarkCircleOutline />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
