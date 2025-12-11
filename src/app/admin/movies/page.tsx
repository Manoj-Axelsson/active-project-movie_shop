import { prisma } from '@/app/lib/prisma';
import Link from 'next/link';
import { MovieCard } from '@/components/movie/movie-card';

type SearchParams = {
    search?: string;
    genreId?: string;
    personId?: string;
};

async function getMovies(filters: SearchParams) {
    const where: any = { deleted: false };

    if (filters.search) {
        where.title = { contains: filters.search, mode: 'insensitive' };
    }

    if (filters.genreId) {
        where.genres = { some: { id: filters.genreId } };
    }

    if (filters.personId) {
        where.moviePersons = { some: { id: filters.personId } };
    }

    return prisma.movie.findMany({
        where,
        include: { genres: true, moviePersons: true },
        orderBy: { title: 'asc' },
    });
}

export default async function MoviesPage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const [movies, genres, people] = await Promise.all([
        getMovies(searchParams),
        prisma.genre.findMany({ orderBy: { name: 'asc' } }),
        prisma.moviePerson.findMany({ orderBy: { name: 'asc' } }),
    ]);

    return (
        <div className="space-y-4">
            <form className="flex flex-wrap gap-2 mb-4">
                <input
                    className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm flex-1 min-w-[200px]"
                    name="search"
                    placeholder="Search by title…"
                    defaultValue={searchParams.search ?? ''}
                />
                <select
                    name="genreId"
                    defaultValue={searchParams.genreId ?? ''}
                    className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
                >
                    <option value="">All genres</option>
                    {genres.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
                <select
                    name="personId"
                    defaultValue={searchParams.personId ?? ''}
                    className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-sm"
                >
                    <option value="">All people</option>
                    {people.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name} ({p.role})
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="px-3 py-2 rounded bg-emerald-600 text-sm"
                >
                    Apply
                </button>
            </form>

            <div className="grid gap-4 md:grid-cols-4">
                {movies.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                ))}
            </div>
        </div>
    );
}
