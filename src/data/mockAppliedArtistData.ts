export interface AppliedArtist {
    _id: string;
    name: string;
    email: string;
    status: string;
    createdAt: string;
}

export const pendingArtists: AppliedArtist[] = [
    {
        _id: "p1",
        name: "Michael Chen",
        email: "michael.chen@email.com",
        status: "pending",
        createdAt: "2024-01-13T15:45:00.000Z"
    },
    {
        _id: "p2",
        name: "Alex Kim",
        email: "alex.kim@email.com",
        status: "pending",
        createdAt: "2024-01-11T14:00:00.000Z"
    },
    {
        _id: "p3",
        name: "Diana Ross",
        email: "diana.ross@email.com",
        status: "pending",
        createdAt: "2024-01-16T11:30:00.000Z"
    },
    {
        _id: "p4",
        name: "James Wilson",
        email: "james.w@email.com",
        status: "pending",
        createdAt: "2024-01-17T09:15:00.000Z"
    }
];

export const approvedArtists: AppliedArtist[] = [
    {
        _id: "a1",
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        status: "approved",
        createdAt: "2024-01-14T10:15:00.000Z"
    },
    {
        _id: "a2",
        name: "David Lee",
        email: "david.lee@email.com",
        status: "approved",
        createdAt: "2024-01-10T16:20:00.000Z"
    },
    {
        _id: "a3",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        status: "approved",
        createdAt: "2024-01-09T13:45:00.000Z"
    },
    {
        _id: "a4",
        name: "Tom Parker",
        email: "tom.p@email.com",
        status: "approved",
        createdAt: "2024-01-08T14:30:00.000Z"
    }
];

export const rejectedArtists: AppliedArtist[] = [
    {
        _id: "r1",
        name: "Sofia Rodriguez",
        email: "sofia.r@email.com",
        status: "rejected",
        createdAt: "2024-01-12T09:20:00.000Z"
    },
    {
        _id: "r2",
        name: "Chris Brown",
        email: "chris.b@email.com",
        status: "rejected",
        createdAt: "2024-01-07T15:10:00.000Z"
    },
    {
        _id: "r3",
        name: "Lisa Wang",
        email: "lisa.w@email.com",
        status: "rejected",
        createdAt: "2024-01-06T10:25:00.000Z"
    }
];

// Combined list for when you need all artists
export const allArtists: AppliedArtist[] = [
    ...pendingArtists,
    ...approvedArtists,
    ...rejectedArtists
];

export default allArtists;
