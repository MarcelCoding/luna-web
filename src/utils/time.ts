import {Duration as IsoDuration, parse as parseISODDuration} from "iso8601-duration";
import {Duration, intervalToDuration} from 'date-fns';

export function parseDuration(iso: string): Duration {
  const start = Date.now();
  const end = addDuration(start, parseISODDuration(iso));

  return intervalToDuration({start, end: 2 * start - end.getTime()});
}

export function formatDuration(iso: string) {
  const {years, months, days} = parseDuration(iso);

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

  return result.join(', ');
}

// https://github.com/tolu/ISO8601-duration/blob/b39ac80a5fef7d06a187b64b370592f93a76ac66/src/index.js#L46-L71
function addDuration(start: number, duration: IsoDuration) {
  const then = new Date(start);

  if (duration.years) then.setFullYear(then.getFullYear() + duration.years);
  if (duration.months) then.setMonth(then.getMonth() + duration.months);
  if (duration.days) then.setDate(then.getDate() + duration.days);
  if (duration.hours) then.setHours(then.getHours() + duration.hours);
  if (duration.minutes) then.setMinutes(then.getMinutes() + duration.minutes);
  if (duration.seconds) then.setMilliseconds(then.getMilliseconds() + (duration.seconds * 1000));
  // Special case weeks
  if (duration.weeks) then.setDate(then.getDate() + (duration.weeks * 7));

  return then;
}
