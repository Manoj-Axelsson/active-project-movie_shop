"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  addItem,
  getCartFromStore,
  saveCart,
  updateItemQuantity,
  removeItem,
} from "@/lib/cart";

const addToCartSchema = z.object({
  movieId: z.string().uuid(),
  quantity: z.coerce.number().int().min(1),
});

export async function addToCart(prevState: any, formData: FormData) {
  const parsed = addToCartSchema.safeParse({
    movieId: formData.get("movieId"),
    quantity: formData.get("quantity"),
  });
  if (!parsed.success) {
    return { success: false, error: "Invalid input" };
  }

  const movie = await prisma.movie.findUnique({
    where: { id: parsed.data.movieId },
  });
  if (!movie || movie.deleted) {
    return { success: false, error: "Movie not found" };
  }

  const cart = await getCartFromStore(cookies());
  const updated = addItem(cart, {
    movieId: movie.id,
    title: movie.title,
    imageUrl: movie.imageUrl,
    price: Number(movie.price),
    quantity: parsed.data.quantity,
  });

  await saveCart(updated);
  return { success: true };
}

const updateSchema = z.object({
  movieId: z.string().uuid(),
  quantity: z.coerce.number().int().min(0),
});

export async function updateCartItem(prevState: any, formData: FormData) {
  const parsed = updateSchema.safeParse({
    movieId: formData.get("movieId"),
    quantity: formData.get("quantity"),
  });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  const cart = await getCartFromStore(cookies());
  const updated = updateItemQuantity(
    cart,
    parsed.data.movieId,
    parsed.data.quantity
  );
  await saveCart(updated);
  return { success: true };
}

const removeSchema = z.object({
  movieId: z.string().uuid(),
});

export async function removeFromCart(prevState: any, formData: FormData) {
  const parsed = removeSchema.safeParse({
    movieId: formData.get("movieId"),
  });
  if (!parsed.success) return { success: false, error: "Invalid input" };

  const cart = await getCartFromStore(cookies());
  const updated = removeItem(cart, parsed.data.movieId);
  await saveCart(updated);
  return { success: true };
}
