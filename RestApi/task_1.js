const http = require('node:https');

// Replace YOUR_API_KEY_HERE with your actual API key.
const apiKey = 'YOUR_API_KEY_HERE';

function getBusyIntervals(calendarId, startTime, endTime) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`
      );
      url.searchParams.append('key', apiKey);
      if (startTime) {
        url.searchParams.append('timeMin', startTime);
      }
      if (endTime) {
        url.searchParams.append('timeMax', endTime);
      }

      const request = http.request(
        url,
        {
          method: 'GET',
        },
        async (res) => {
          const chunks = [];
          for await (const chunk of res) {
            chunks.push(chunk);
          }
          const body = Buffer.concat(chunks).toString();

          const response = JSON.parse(body);

          const busyIntervals = [];

          response.items.forEach((item) => {
            const start = new Date(item.start.dateTime);
            const end = new Date(item.end.dateTime);

            busyIntervals.push({ start, end });
          });

          resolve(busyIntervals);
        }
      );
      request.end();
    } catch (error) {
      console.error('Error retrieving intervals:', error);
      reject(error);
    }
  });
}

async function fetchBusyIntervals() {
  // Replace YOUR_CALENDAR_ID_HERE with your actual calendar id.
  const calendarId = 'YOUR_CALENDAR_ID_HERE';

  // Replace START_TIME and END_TIME with data in ISO 8601 format.
  const startTime = 'START_TIME';
  const endTime = 'END_TIME';

  try {
    const result = await getBusyIntervals(calendarId, startTime, endTime);
    return result;
  } catch (error) {
    console.error('Error fetching busy intervals:', error);
    return [];
  }
}

async function main() {
  const busyIntervals = await fetchBusyIntervals();
  console.log('Busy Intervals:', busyIntervals);
}

main();
