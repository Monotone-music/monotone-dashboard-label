export function convertToTimezone(
    isoString: string,
    timeZone: string = "Asia/Bangkok"
  ): string {
    const date = new Date(isoString);
  
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  
    return formattedDate;
  }
  
  