import { CheckoutForm } from './checkout-form';

export default function CheckoutPage() {
    return (
        <div className="max-w-lg mx-auto">
            <h1 className="text-xl font-semibold mb-4">Checkout</h1>
            <p className="text-sm text-slate-500 mb-4">
                Enter your shipping address. Payment is simulated.
            </p>
            <CheckoutForm />
        </div>
    );
}
