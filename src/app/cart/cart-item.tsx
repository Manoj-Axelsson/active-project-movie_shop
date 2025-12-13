'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateCartItem, removeFromCart } from './actions';

type CartItemProps = {
    item: {
        movieId: string;
        title: string;
        imageUrl: string;
        price: number;
        quantity: number;
    };
};

const initialState = { success: false, error: '' };

function SubmitButton({ label, className }: { label: string; className: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={`${className} ${pending ? 'opacity-50' : ''}`}
        >
            {pending ? '...' : label}
        </button>
    );
}

export function CartItem({ item }: CartItemProps) {
    const [updateState, updateAction] = useFormState(updateCartItem, initialState as any);
    const [removeState, removeAction] = useFormState(removeFromCart, initialState as any);

    return (
        <div className="flex items-center justify-between bg-white rounded p-3 shadow-sm">
            <div className="flex items-center gap-3">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                />
                <div>
                    <div className="font-semibold text-sm">{item.title}</div>
                    <div className="text-xs text-slate-500">
                        {item.quantity} × {item.price.toFixed(2)} kr
                    </div>
                    {updateState?.error && (
                        <div className="text-red-500 text-xs">{updateState.error}</div>
                    )}
                    {removeState?.error && (
                        <div className="text-red-500 text-xs">{removeState.error}</div>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <form action={updateAction} className="flex items-center gap-2">
                    <input type="hidden" name="movieId" value={item.movieId} />
                    <input
                        type="number"
                        name="quantity"
                        defaultValue={item.quantity}
                        min={0}
                        className="w-16 bg-slate-100 border border-slate-300 rounded px-2 py-1 text-sm"
                    />
                    <SubmitButton
                        label="Update"
                        className="text-xs px-2 py-1 rounded bg-slate-800 text-white hover:bg-slate-700"
                    />
                </form>
                <form action={removeAction}>
                    <input type="hidden" name="movieId" value={item.movieId} />
                    <SubmitButton
                        label="Remove"
                        className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-500"
                    />
                </form>
            </div>
        </div>
    );
}
