import apiClient from "./apiClient"

// Artist Management
export const getAllArtists = async (token: string | null, role: string, page: number = 1, limit: number = 5,  searchQuery?: string) => {
    const response = await apiClient.get('/label/accounts-management', {
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

export const getAccountsById = async (token: string | null, id: string | null) => {
  const response = await apiClient.get(`/label/accounts-management/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};


export const deleteAccountsByIds = async (token: string | null, ids: string[]) => {
  const response = await apiClient.delete(`/label/accounts-management`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ids,
    },
  });
  return response.data;
};