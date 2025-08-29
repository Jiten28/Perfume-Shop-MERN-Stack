import { useCart } from "../pages/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-700">Your Cart is Empty</h2>
        <Link to="/collections" className="mt-4 px-6 py-3 bg-rose-600 text-white rounded-lg">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000${item.images[0]}`}
                  alt={item.name}
                  className="h-20 w-20 object-contain bg-gray-50 rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                  <p className="text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 flex justify-between items-center">
          <h3 className="text-xl font-bold">Total: ₹{total}</h3>
          <button
            onClick={clearCart}
            className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
