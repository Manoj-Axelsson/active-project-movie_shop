'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { addToCart } from '@/app/cart/actions';



export function MovieCard({ movie }: { movie: any }) {
    const [pending, startTransition] = useTransition();

    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden shadow-md flex flex-col">
            <img
                src={movie.imageUrl}
                alt={movie.title}
                className="h-48 w-full object-cover"
            />
            <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                    {movie.title}
                </h3>
                <p className="text-xs text-slate-400 mb-2 line-clamp-3">
                    {movie.description}
                </p>
                <p className="font-bold mb-2">
                    {Number(movie.price).toFixed(2)} kr
                </p>
                <div className="mt-auto flex justify-between gap-2">
                    <Link
                        href={`/movies/${movie.id}`}
                        className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
                    >
                        Details
                    </Link>
                    <form
                        action={(formData) =>
                            startTransition(async () => {
                                await addToCart(null, formData);
                            })
                        }
                    >
                        <input type="hidden" name="movieId" value={movie.id} />
                        <input type="hidden" name="quantity" value={1} />
                        <button
                            type="submit"
                            disabled={pending}
                            className="text-xs px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
                        >
                            {pending ? 'Adding…' : 'Add to cart'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
