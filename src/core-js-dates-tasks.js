/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return Date.parse(date);
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  const dateISO = new Date(Date.parse(date));
  const hour = dateISO.getHours();
  const minutes = dateISO.getMinutes();
  const seconds = dateISO.getSeconds();
  return `${
    hour < 10 ? `0${hour}` : hour
  }:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  return new Date(Date.parse(date)).toLocaleString('en-US', {
    weekday: 'long',
  });
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  const FRIDAY = 5;
  const MAX_WEEK_DAYS = 7;
  const currentDate = new Date(Date.parse(date));
  const currentDay = currentDate.getDay();
  const newDate = new Date(Date.parse(date));
  if (currentDay < FRIDAY) {
    newDate.setDate(currentDate.getDate() + FRIDAY - currentDay);
  } else {
    newDate.setDate(
      currentDate.getDate() + MAX_WEEK_DAYS - currentDay + FRIDAY
    );
  }
  return newDate;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const ONE_DAY = 1000 * 3600 * 24;

  const date1 = new Date(Date.parse(dateStart));
  const date2 = new Date(Date.parse(dateEnd));
  return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / ONE_DAY) + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  if (
    Date.parse(date) >= Date.parse(period.start) &&
    Date.parse(date) <= Date.parse(period.end)
  ) {
    return true;
  }
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const dateISO = new Date(Date.parse(date));
  const hour = dateISO.getUTCHours();
  const minutes = dateISO.getUTCMinutes();
  const seconds = dateISO.getUTCSeconds();
  return `${
    dateISO.getUTCMonth() + 1
  }/${dateISO.getUTCDate()}/${dateISO.getFullYear()}, ${
    hour > 12 ? hour - 12 : hour
  }:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${
    hour >= 12 ? 'PM' : 'AM'
  }`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const MAX_WEEK_DAYS = 7;

  function weekDayCount(numberOfDays, firstDay) {
    return Math.ceil((numberOfDays - firstDay + 1) / MAX_WEEK_DAYS);
  }

  const SATURDAY = 6;
  const SUNDAY = 0;
  const numberOfDays = getCountDaysInMonth(month, year);
  const firstDay = new Date(year, month - 1).getDay();

  const firstSaturday = firstDay === SATURDAY ? 1 : SATURDAY - firstDay + 1;
  const firstSunday = firstDay === SUNDAY ? 1 : MAX_WEEK_DAYS - firstDay + 1;

  const Saturdays = weekDayCount(numberOfDays, firstSaturday);
  const Sundays = weekDayCount(numberOfDays, firstSunday);

  return Saturdays + Sundays;
}

/**
 * Returns the week number of the year for a given date.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const MAX_WEEK_DAYS = 7;
  const firstDayOfYear = new Date(date.getUTCFullYear(), 0, 1);

  const dayFromBeginYear = getCountDaysOnPeriod(date, firstDayOfYear);
  const firstWeekAddDays = firstDayOfYear.getDay();

  return Math.ceil(
    Math.abs(dayFromBeginYear + firstWeekAddDays) / MAX_WEEK_DAYS
  );
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  const FRIDAY = 5;
  const DATE_13TH = 13;
  const MAX_MONTH = 12;
  const findDate = new Date(date);

  let currentMonth =
    date.getDate() < DATE_13TH ? date.getMonth() : date.getMonth() + 1;

  do {
    findDate.setMonth(currentMonth, DATE_13TH);
    currentMonth += currentMonth === MAX_MONTH ? 0 : 1;
  } while (findDate.getDay() !== FRIDAY);
  return findDate;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  return Math.ceil((date.getMonth() + 1) / 3);
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  function convertDate(str) {
    return str.split('-').reverse().join('-');
  }

  function getDateString(date) {
    const monthDate = date.getDate();
    const month = date.getMonth() + 1;
    return `${monthDate < 10 ? `0${monthDate}` : monthDate}-${
      month < 10 ? `0${month}` : month
    }-${date.getFullYear()}`;
  }

  const ONE_DAY = 1000 * 3600 * 24;
  const startDate = new Date(convertDate(period.start)).getTime();

  const currentDate = new Date();
  const daysPeriod = getCountDaysOnPeriod(
    convertDate(period.start),
    convertDate(period.end)
  );

  let counterWorkDays = countWorkDays;
  const rezultArray = [];
  for (let i = 0; i < daysPeriod; i += 1) {
    currentDate.setTime(startDate + i * ONE_DAY);
    if (counterWorkDays > 0) {
      rezultArray.push(getDateString(currentDate));
      counterWorkDays -= 1;
    } else {
      i = i + countOffDays - 1;
      counterWorkDays = countWorkDays;
    }
  }
  return rezultArray;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  if (year % 100 === 0) {
    return year % 400 === 0;
  }
  return year % 4 === 0;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
