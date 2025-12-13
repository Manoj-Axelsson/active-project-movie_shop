import { getCartFromStore, cartTotal } from '@/lib/cart';
import { cookies } from 'next/headers';
import { CartItem } from './cart-item';

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
                    <CartItem key={item.movieId} item={item} />
                ))}
            </div>

            <div className="flex justify-between items-center border-t border-slate-300 pt-4">
                <div className="font-semibold">Total: {total.toFixed(2)} kr</div>
                <a
                    href="/checkout"
                    className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500"
                >
                    Proceed to checkout
                </a>
            </div>
        </div >
    );
}
