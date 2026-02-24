import { useContext } from "react";
import { UserContext } from "../components/userContext";
import api from "../utils/api";
import toast from "react-hot-toast";

const Credits = () => {

  const { user, fetchUser } = useContext(UserContext);

  const handlePayment = async (packageType) => {
    try {
      // 1️⃣ Call backend to create order
      const { data } = await api.post(
        "api/payment/create-order",
        { packageType },
      );

      const order = data.order;
      const key = data.key;

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: key, //import.meta.env.VITE_RAZORPAY_KEY_ID, // public key
        amount: order.amount,
        currency: order.currency,
        name: "Your AI Website",
        description: "Buy Credits",
        order_id: order.id,

        handler: function (response) {
          // Payment successful
          toast.success("Payment successful! Credits added to your account.");
          setTimeout(() => {
            fetchUser();
          }, 3000);
          
        },

        theme: {
          color: "#6366f1"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="space-y-12">

      {/* ================= BALANCE OVERVIEW ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-sm text-gray-400 mb-2">Available Credits</p>
          <h2 className="text-3xl font-semibold">{user?.credits}</h2>
          <p className="text-xs text-gray-500 mt-2">
            0 used total
          </p>
        </div>

      </div>

      {/* ================= BUY CREDITS ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-8">
          Buy More Credits
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <CreditPack
            title="2 Credits"
            price="₹2"
            value="₹2 per credit"
            buttonValue="Basic"
            onSelect={() => handlePayment("basic")}
          />

          <CreditPack
            title="6 Credits"
            price="₹4"
            value="₹1.5 per credit"
            buttonValue="Pro"
            onSelect={() => handlePayment("pro")}
            highlight
          />

          <CreditPack
            title="10 Credits"
            price="₹10"
            value="₹1 per credit"
            buttonValue="Ultimate"
            onSelect={() => handlePayment("ultimate")}
          />

        </div>
      </div>

    </div>
  );
};

export default Credits;


/* ================= CREDIT PACK ================= */

const CreditPack = ({
  title,
  price,
  value,
  highlight,
  buttonValue,
  onSelect
}) => {
  return (
    <div
      className={`rounded-2xl p-8 border backdrop-blur-xl transition
      ${
        highlight
          ? "bg-gradient-to-b from-purple-600/20 to-cyan-500/10 border-purple-500/40 scale-105"
          : "bg-white/5 border-white/10 hover:bg-white/10"
      }`}
    >
      {highlight && (
        <span className="text-xs bg-purple-600/40 px-3 py-1 rounded-full">
          Best Value
        </span>
      )}

      <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
      <h2 className="text-3xl font-semibold mb-2">{price}</h2>
      <p className="text-sm text-gray-400 mb-8">{value}</p>

      <button onClick={onSelect}
        className={`w-full py-3 rounded-lg font-medium transition cursor-pointer
        ${
          highlight
            ? "bg-gradient-to-r from-purple-600 to-cyan-500 hover:scale-105"
            : "bg-white/10 hover:bg-white/20"
        }`}
      >
        {buttonValue}
      </button>
    </div>
  );
};