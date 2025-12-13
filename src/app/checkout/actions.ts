'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth, getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getCartFromStore, cartTotal } from '@/lib/cart';
import { addressSchema } from '@/lib/validation';
import { cookies } from 'next/headers';

const checkoutInputSchema = z.object({
    street: z.string(),
    postalCode: z.string(),
    city: z.string(),
    country: z.string(),
});

export async function performCheckout(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session?.user) {
        return { success: false, error: 'You must be logged in to checkout.' };
    }

    const parsed = checkoutInputSchema.safeParse({
        street: formData.get('street'),
        postalCode: formData.get('postalCode'),
        city: formData.get('city'),
        country: formData.get('country'),
    });

    if (!parsed.success) {
        return { success: false, error: 'Invalid address data.' };
    }

    const cart = await getCartFromStore(cookies());
    if (cart.length === 0) {
        return { success: false, error: 'Cart is empty.' };
    }

    // Validate against current stock & prices
    const movieIds = cart.map((c) => c.movieId);
    const movies = await prisma.movie.findMany({
        where: { id: { in: movieIds }, deleted: false },
    });

    if (movies.length !== cart.length) {
        return { success: false, error: 'Some movies are no longer available.' };
    }

    // Create address, order, order items in a transaction
    const { street, postalCode, city, country } = parsed.data;

    const result = await prisma.$transaction(async (tx) => {
        const address = await tx.address.create({
            data: {
                street,
                postalCode,
                city,
                country,
                user: { connect: { id: session.user.id } },
            },
        });

        const order = await tx.order.create({
            data: {
                userId: session.user.id,
                shippingAddressId: address.id,
                status: 'CONFIRMED',
                items: {
                    create: cart.map((item) => ({
                        movieId: item.movieId,
                        quantity: item.quantity,
                        priceAtPurchase: item.price,
                    })),
                },
            },
        });

        // Update stock
        for (const item of cart) {
            await tx.movie.update({
                where: { id: item.movieId },
                data: { stock: { decrement: item.quantity } },
            });
        }

        return order;
    });

    // Clear cart
    (await cookies()).set('movieshop_cart', '[]', { path: '/', maxAge: 0 });

    redirect(`/orders?orderId=${result.id}`);
}
