import { z } from 'zod';

export const movieSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().nonnegative(),
    releaseDate: z.coerce.date(),
    imageUrl: z.string().url(),
    runtime: z.coerce.number().int().positive().optional(),
    stock: z.coerce.number().int().min(0),
    genreIds: z.array(z.string().uuid()).optional(),
    personIds: z.array(z.string().uuid()).optional(),
});

export const genreSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1),
    description: z.string().optional(),
});

export const personSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1),
    role: z.string().min(1),
});

export const addressSchema = z.object({
    street: z.string().min(1),
    postalCode: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
});

export const cartItemSchema = z.object({
    movieId: z.string().uuid(),
    title: z.string(),
    imageUrl: z.string(),
    price: z.number().nonnegative(),
    quantity: z.number().int().min(1),
});

export const cartSchema = z.array(cartItemSchema);

export const checkoutSchema = z.object({
    address: addressSchema,
});
