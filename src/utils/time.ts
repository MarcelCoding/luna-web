import {Duration as IsoDuration, parse as parseISODDuration} from "iso8601-duration";
import {Duration, intervalToDuration} from "date-fns";

export function parseDuration(iso: string, past = false, start?: Date): Duration {
  if (!start) {
    start = new Date();
  }

  const end = addDuration(start, parseISODDuration(iso), past);

  return intervalToDuration({
    start: end,
    end: start,
  });
}

export function formatDuration({years, months, days}: Duration) {
  const result = [];

  if (years) {
    result.push(`${years} Jahre`);
  }

  if (months) {
    result.push(`${months} Monate`);
  }

  if (days) {
    result.push(`${days} Tage`);
  }

  return result.join(", ");
}

// https://github.com/tolu/ISO8601-duration/blob/b39ac80a5fef7d06a187b64b370592f93a76ac66/src/index.js#L46-L71
function addDuration(start: Date, duration: IsoDuration, past: boolean) {
  const then = new Date(start);

  const i = past ? -1 : 1;

  if (duration.years) then.setFullYear(then.getFullYear() + duration.years * i);
  if (duration.months) then.setMonth(then.getMonth() + duration.months * i);
  if (duration.days) then.setDate(then.getDate() + duration.days * i);
  if (duration.hours) then.setHours(then.getHours() + duration.hours * i);
  if (duration.minutes) then.setMinutes(then.getMinutes() + duration.minutes * i);
  if (duration.seconds) then.setMilliseconds(then.getMilliseconds() + (duration.seconds * 1000 * i));
  // Special case weeks
  if (duration.weeks) then.setDate(then.getDate() + (duration.weeks * 7 * i));

  return then;
}
