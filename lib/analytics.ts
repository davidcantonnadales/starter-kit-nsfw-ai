import { getAnalytics, logEvent } from "firebase/analytics";

export function logCustomEvent(name: string, data: any) {
  const analytics = getAnalytics();
  logEvent(analytics, name, data);
}
