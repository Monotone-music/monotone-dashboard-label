export interface ArtistRequest {
    _id: string;
    artistId: {
      _id: string;
      name: string;
      account: string;
      labelId: string;
      releaseGroup: any[];
      featuredIn: any[];
      createdAt: string;
      updatedAt: string;
    };
    labelId: string;
    artistEmail: string;
    file: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  