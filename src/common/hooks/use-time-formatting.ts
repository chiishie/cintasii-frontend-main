import { useCallback } from "react";

const useTimeFormatting = () => {
  const timeStringToDate = useCallback((timeString: string): Date => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }, []);

  return { timeStringToDate };
};

export default useTimeFormatting;
