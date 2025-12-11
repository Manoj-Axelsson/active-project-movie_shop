'use server';

import { redirect } from 'next/navigation';
import { movieSchema } from '@/app/lib/validation';
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/app/lib/auth';

async function requireAdmin() {
    const session = await auth.getSession();
    if (!session?.user || session.user.role !== 'admin') {
        throw new Error('Not authorized');
    }
}

export async function createMovie(prev: any, formData: FormData) {
    await requireAdmin();

    const parsed = movieSchema.safeParse({
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

    if (!parsed.success) {
        return { success: false, error: 'Invalid input' };
    }

    const { genreIds, personIds, ...data } = parsed.data;

    await prisma.movie.create({
        data: {
            ...data,
            genres: genreIds
                ? { connect: genreIds.map((id) => ({ id })) }
                : undefined,
            moviePersons: personIds
                ? { connect: personIds.map((id) => ({ id })) }
                : undefined,
        },
    });

    redirect('/admin/movies');
}

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
                    connect: genreIds.map((gid) => ({ id: gid })),
                }
                : undefined,
            moviePersons: personIds
                ? {
                    set: [],
                    connect: personIds.map((pid) => ({ id: pid })),
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
