import { prisma } from '@/lib/prisma';

import { MovieCard } from '@/components/movie/movie-card';

async function getTopLists() {
    const [topPurchased, newest, oldest, cheapest] = await Promise.all([
        prisma.movie.findMany({
            where: { deleted: false },
            take: 5,
            orderBy: { orderItems: { _count: 'desc' } },
        }),
        prisma.movie.findMany({
            where: { deleted: false },
            take: 5,
            orderBy: { releaseDate: 'desc' },
        }),
        prisma.movie.findMany({
            where: { deleted: false },
            take: 5,
            orderBy: { releaseDate: 'asc' },
        }),
        prisma.movie.findMany({
            where: { deleted: false },
            take: 5,
            orderBy: { price: 'asc' },
        }),
    ]);

    return { topPurchased, newest, oldest, cheapest };
}

export default async function HomePage() {
    const { topPurchased, newest, oldest, cheapest } = await getTopLists();

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-xl font-semibold mb-3">
                    Top 5 most purchased
                </h2>
                <div className="grid gap-4 md:grid-cols-5">
                    {topPurchased.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">
                    Top 5 newest movies
                </h2>
                <div className="grid gap-4 md:grid-cols-5">
                    {newest.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">
                    Top 5 oldest movies
                </h2>
                <div className="grid gap-4 md:grid-cols-5">
                    {oldest.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-3">
                    Top 5 cheapest movies
                </h2>
                <div className="grid gap-4 md:grid-cols-5">
                    {cheapest.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </div>
            </section>
        </div>
    );
}
