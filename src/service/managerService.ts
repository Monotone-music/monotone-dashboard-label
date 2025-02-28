import apiClient from "./apiClient";

//==========================Track Manager==========================
export interface Track {
  _id: string;
  title: string;
  view: number;
  artist: string;
  status: string;
  media: {
    fingerprint: {
      duration: number;
    };
  };
  image: {
    filename: string;
  };
}

export const getAvailableTracks = async (): Promise<Track[]> => {
  const response = await apiClient.get('/label/available');
  return response.data.data;
};

export const getPendingTracks = async (): Promise<Track[]> => {
  const response = await apiClient.get('/label/pending');
  return response.data.data;
};

export const getRejectedTracks = async (): Promise<Track[]> => {
  const response = await apiClient.get('/label/rejected');
  return response.data.data;
};

export const updateTrackStatus = async (trackId: string) => {
  const response = await apiClient.patch(`/recording/disable/${trackId}`, {
  });
  return response.data;
};

export const cancelPendingTrack = async (trackId: string) => {
  const response = await apiClient.patch(`/recording/reject/${trackId}`);
  return response.data;
};

//==========================Artist Manager==========================

interface ArtistStatistics {
  pending: number;
  noticed: number;
  approved: number;
  rejected: number;
}

export const getArtistImgByFilename = async (filename: string) => {
  const response = await apiClient.get(`/image/${filename}`, {
    responseType: 'blob',
  });
  
  const blob = response.data;
  const url = URL.createObjectURL(blob);
  return url;

}

export const getArtistStatistics = async (): Promise<ArtistStatistics> => {
  const response = await apiClient.get('/label/statistics');
  return response.data.data;
};
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
    image: any;
  };
  labelId: string;
  artistEmail: string;
  file: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const getPendingArtistRequests = async (): Promise<ArtistRequest[]> => {
  const response = await apiClient.get('/label/requests/pending');
  return response.data.data;
};

export const getApprovedArtistRequests = async (): Promise<ArtistRequest[]> => {
  const response = await apiClient.get('/label/requests/approved');
  return response.data.data;
};

export const getRejectedArtistRequests = async (): Promise<ArtistRequest[]> => {
  const response = await apiClient.get('/label/requests/rejected');
  return response.data.data;
};

export const getNoticedArtistRequests = async (): Promise<ArtistRequest[]> => {
  const response = await apiClient.get('/label/requests/noticed');
  return response.data.data;
};

export const updateArtistRequestStatus = async (requestId: string, status: 'approved' | 'rejected') => {
  const endpoint = status === 'approved' 
  ? `/label/approve/${requestId}`
  : `/label/reject/${requestId}`;
  
const response = await apiClient.post(endpoint);
return response.data;
};
