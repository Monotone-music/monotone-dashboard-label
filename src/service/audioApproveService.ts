import apiClient from "./apiClient";

export interface AudioRequest {
    _id: string;
    title: string;
    artist: string;
    media: {
        fingerprint: {
            duration: number;
        };
        filename: string;
    };
    image: {
        filename: string;
    };
    status: string;
    view: number;
}

export const getAudioRequests = async (): Promise<AudioRequest[]> => {
    const response = await apiClient.get('/label/queued');
    return response.data.data;
};

export const approveAudio = async (trackId: string) => {
    const response = await apiClient.patch(`/recording/enqueue/${trackId}`);
    return response.data;
};

export const rejectAudio = async (trackId: string, reason: string) => {
    const response = await apiClient.patch(`/recording/reject/${trackId}`, {reason});
    return response.data;
};
