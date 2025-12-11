import { auth } from '@/app/lib/auth';
import { prisma } from '@/app/lib/prisma';

export default async function OrdersPage({
    searchParams,
}: {
    searchParams: { orderId?: string };
}) {
    const session = await auth.getSession();
    if (!session?.user) {
        return <p>Please log in to see your orders.</p>;
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        include: { items: { include: { movie: true } }, shippingAddress: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-semibold">Your orders</h1>
            {searchParams.orderId && (
                <div className="text-sm text-emerald-400">
                    Order {searchParams.orderId} confirmed.
                </div>
            )}
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border border-slate-800 rounded p-3 space-y-1"
                >
                    <div className="flex justify-between text-sm">
                        <span>Order #{order.id}</span>
                        <span>{order.status}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                        {order.createdAt.toLocaleString()}
                    </div>
                    <ul className="text-sm mt-2">
                        {order.items.map((item) => (
                            <li key={item.id}>
                                {item.quantity} × {item.movie.title} (
                                {Number(item.priceAtPurchase).toFixed(2)} kr)
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
