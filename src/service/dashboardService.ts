import apiClient from "./apiClient";

export const getLabelAnalytics = async () => {
    
    const response = await apiClient.get('/analytics/labels', {
    });
    return response.data.data;
  };

  export interface ViewData {
    month: string;
    desktop: number;
  }
  
  export const getCharts = async () => {
    const response = await apiClient.get('/label/views');
    return response.data.data;
  };
  
  export const formatChartData = (data: Record<string, number>): ViewData[] => {
    return Object.entries(data).map(([key, value]) => ({
      month: key,
      desktop: value
    }));
  };
