import { performCheckout } from './actions';

export default function CheckoutPage() {
    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-xl font-semibold mb-4">Checkout</h1>
            <p className="text-sm text-slate-400 mb-4">
                Enter your shipping address. Payment is simulated.
            </p>
            <form action={performCheckout} className="space-y-3">
                <div>
                    <label className="block text-xs mb-1">Street</label>
                    <input
                        name="street"
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
                        required
                    />
                </div>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-xs mb-1">Postal code</label>
                        <input
                            name="postalCode"
                            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs mb-1">City</label>
                        <input
                            name="city"
                            className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs mb-1">Country</label>
                    <input
                        name="country"
                        className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
                >
                    Confirm order
                </button>
            </form>
        </div>
    );
}
