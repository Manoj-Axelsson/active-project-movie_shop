import { getCartFromStore, cartTotal } from '@/app/lib/cart';
import { cookies } from 'next/headers';
import { updateCartItem, removeFromCart } from './actions';

export default async function CartPage() {
    const cart = await getCartFromStore(cookies());
    const total = cartTotal(cart);

    if (cart.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold mb-4">Your cart</h1>
            <div className="space-y-3">
                {cart.map((item) => (
                    <div
                        key={item.movieId}
                        className="flex items-center justify-between border border-slate-800 rounded p-3"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-16 h-20 object-cover rounded"
                            />
                            <div>
                                <div className="font-semibold text-sm">{item.title}</div>
                                <div className="text-xs text-slate-400">
                                    {item.quantity} × {item.price.toFixed(2)} kr
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <form action={updateCartItem}>
                                <input type="hidden" name="movieId" value={item.movieId} />
                                <input
                                    type="number"
                                    name="quantity"
                                    defaultValue={item.quantity}
                                    min={0}
                                    className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm"
                                />
                                <button
                                    type="submit"
                                    className="ml-2 text-xs px-2 py-1 rounded bg-slate-800"
                                >
                                    Update
                                </button>
                            </form>
                            <form action={removeFromCart}>
                                <input type="hidden" name="movieId" value={item.movieId} />
                                <button
                                    type="submit"
                                    className="text-xs px-2 py-1 rounded bg-red-600"
                                >
                                    Remove
                                </button>
                            </form>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                <div className="font-semibold">Total: {total.toFixed(2)} kr</div>
                <a
                    href="/checkout"
                    className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
                >
                    Proceed to checkout
                </a>
            </div>
        </div>
    );
}
