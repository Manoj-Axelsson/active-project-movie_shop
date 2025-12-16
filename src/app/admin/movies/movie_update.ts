import { prisma } from '@/lib/prisma';
import { movieSchema } from '@/lib/validation';
import { redirect } from 'next/navigation';

export async function updateMovie(prev: any, formData: FormData) {
    await requireAdmin();

    const parsed = movieSchema
        .extend({ id: movieSchema.shape.id.unwrap() })
        .safeParse({
            id: formData.get('id'),
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            releaseDate: formData.get('releaseDate'),
            imageUrl: formData.get('imageUrl'),
            runtime: formData.get('runtime'),
            stock: formData.get('stock'),
            genreIds: formData.getAll('genreIds'),
            personIds: formData.getAll('personIds'),
        });

    if (!parsed.success) return { success: false, error: 'Invalid input' };

    const { id, genreIds, personIds, ...data } = parsed.data;

    await prisma.movie.update({
        where: { id },
        data: {
            ...data,
            genres: genreIds
                ? {
                    set: [],
                    connect: genreIds.map((gid: any) => ({ id: gid })),
                }
                : undefined,
            moviePersons: personIds
                ? {
                    set: [],
                    connect: personIds.map((pid: any) => ({ id: pid })),
                }
                : undefined,
        },
    });

    redirect('/admin/movies');
}

export async function softDeleteMovie(id: string) {
    await requireAdmin();
    await prisma.movie.update({
        where: { id },
        data: { deleted: true },
    });
}
function requireAdmin() {
    throw new Error('Function not implemented.');
}

