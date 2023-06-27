import prisma from '@/app/libs/prismadb';

interface IParams {
    userId?: string;
    authorId?: string;
    listingId?: string;
}

const getReservations = async (params: IParams) => {
    try {



        const { userId, authorId, listingId } = params;

        const query: any = {};

        if (userId) query.userId = userId;

        if (listingId) query.listingId = listingId;

        if (authorId) query.listing = { userId: authorId }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            }, orderBy: {
                createdAt: 'desc'
            }
        })

        const safeReservations = reservations.map(reservation => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            }
        })
        )

        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}

export default getReservations;