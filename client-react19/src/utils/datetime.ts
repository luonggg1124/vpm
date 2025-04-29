import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(utc);
import "dayjs/locale/vi";
export const formatDate = (timestamp: number): string => {
  return dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss");
};
export const SECOND: number = 1000;
export const MINUTE: number = 60 * 1000;
export function isDaytime(): boolean {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 6 && hours < 18;
}

export function sortByDateAsc(
  items: any[],
  dateKey: string,
  sort: "asc" | "desc" = "asc"
): any[] {
  return items.sort((a, b) => {
    const dateA = new Date(a[dateKey]).getTime();
    const dateB = new Date(b[dateKey]).getTime();
    if (sort === "asc") return dateA - dateB;
    return dateB - dateA;
  });
}
export const timeToNow = (time: string) => {
  dayjs.locale("vi");
  return dayjs(time).fromNow();
};
