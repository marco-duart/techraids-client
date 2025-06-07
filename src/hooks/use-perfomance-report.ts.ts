import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { GetPerformanceReport } from "../services/performance-report";
import { IGetPerformanceReport } from "../services/performance-report/DTO";
import { useAuth } from "../context/user-provider";

type FetchPerformanceReportParams = {
  startDate?: string;
  endDate?: string;
};

export const usePerformanceReport = () => {
  const { token } = useAuth();
  const [performanceReports, setPerformanceReports] =
    useState<IGetPerformanceReport.Response>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPerformanceReport = async ({
    startDate,
    endDate,
  }: FetchPerformanceReportParams) => {
    if (!token) return;

    setIsLoading(true);

    const result = await GetPerformanceReport({ token, startDate, endDate });
    if (result.success && result.data) {
      setPerformanceReports(result.data);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPerformanceReport({});
  }, [token]);

  return {
    performanceReports,
    isLoading,
    fetchPerformanceReport,
  };
};
