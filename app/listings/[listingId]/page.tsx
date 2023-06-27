import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const currentUser = await getCurrentUser();
    const listing = await getListingById(params);
    const reservations = await getReservations(params);

    if (!listing) return <EmptyState />;

    return (
        <ListingClient
        currentUser={currentUser}
        listing={listing}
        reservations={reservations}
        />
    )
}

export default ListingPage;