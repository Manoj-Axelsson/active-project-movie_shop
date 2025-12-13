'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { performCheckout } from './actions';

const initialState = { success: false, error: '' };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={`mt-2 w-full px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500 ${pending ? 'opacity-50' : ''}`}
        >
            {pending ? 'Processing...' : 'Confirm order'}
        </button>
    );
}

export function CheckoutForm() {
    const [state, action] = useFormState(performCheckout, initialState as any);

    return (
        <form action={action} className="space-y-3">
            {state?.error && (
                <div className="p-3 bg-red-100 text-red-700 rounded text-sm mb-4">
                    {state.error}
                </div>
            )}
            <div>
                <label className="block text-xs mb-1 font-medium">Street</label>
                <input
                    name="street"
                    className="w-full px-3 py-2 rounded bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
            </div>
            <div className="flex gap-3">
                <div className="flex-1">
                    <label className="block text-xs mb-1 font-medium">Postal code</label>
                    <input
                        name="postalCode"
                        className="w-full px-3 py-2 rounded bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-xs mb-1 font-medium">City</label>
                    <input
                        name="city"
                        className="w-full px-3 py-2 rounded bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs mb-1 font-medium">Country</label>
                <input
                    name="country"
                    className="w-full px-3 py-2 rounded bg-white border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                />
            </div>
            <SubmitButton />
        </form>
    );
}
