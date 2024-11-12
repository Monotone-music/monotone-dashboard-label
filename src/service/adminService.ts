import apiClient from "./apiClient"

// Artist Management
export const getAllArtists = async (token: string | null, role: string, page: number = 1, limit: number = 5,  searchQuery?: string) => {
    const response = await apiClient.get('/admin/accounts-management', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        role,
        page,
        limit,
        ...(searchQuery && { searchQuery })
      },
    });
    return response.data;
  };