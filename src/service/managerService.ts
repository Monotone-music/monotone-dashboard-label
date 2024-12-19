import apiClient from "./apiClient";

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
