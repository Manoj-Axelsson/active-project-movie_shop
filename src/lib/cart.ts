import { cookies } from 'next/headers';
import { z } from 'zod';
import { cartSchema, cartItemSchema } from './validation';

const CART_COOKIE_NAME = 'movieshop_cart';

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof cartSchema>;

function parseCart(raw: string | undefined): Cart {
    if (!raw) return [];
    try {
        const json = JSON.parse(raw);
        const parsed = cartSchema.safeParse(json);
        if (!parsed.success) return [];
        return parsed.data;
    } catch {
        return [];
    }
}

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export async function getCartFromStore(storePromise?: Promise<CookieStore> | CookieStore): Promise<Cart> {
    const store = storePromise ? await storePromise : await cookies();
    const raw = store.get(CART_COOKIE_NAME)?.value;
    return parseCart(raw);
}

export async function saveCart(cart: Cart) {
    const jar = await cookies();
    jar.set(CART_COOKIE_NAME, JSON.stringify(cart), {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });
}

export function addItem(cart: Cart, item: CartItem): Cart {
    const existing = cart.find((c) => c.movieId === item.movieId);
    if (existing) {
        return cart.map((c) =>
            c.movieId === item.movieId
                ? { ...c, quantity: c.quantity + item.quantity }
                : c,
        );
    }
    return [...cart, item];
}

export function updateItemQuantity(
    cart: Cart,
    movieId: string,
    quantity: number,
): Cart {
    if (quantity <= 0) {
        return cart.filter((c) => c.movieId !== movieId);
    }
    return cart.map((c) =>
        c.movieId === movieId ? { ...c, quantity } : c,
    );
}

export function removeItem(cart: Cart, movieId: string): Cart {
    return cart.filter((c) => c.movieId !== movieId);
}

export function cartTotal(cart: Cart): number {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
