export function parseDurationMs(duration: string) {
  const regex = /(\d+)h?(\d+)?m?(\d+)?s?/;
  const match = duration.match(regex);
  if (!match) {
    throw new Error("Invalid duration format");
  }

  let milliseconds = 0;
  if (match[1]) {
    milliseconds += parseInt(match[1]) * 3600000; // Convert hours to milliseconds
  }
  if (match[2]) {
    milliseconds += parseInt(match[2]) * 60000; // Convert minutes to milliseconds
  }
  if (match[3]) {
    milliseconds += parseInt(match[3]) * 1000; // Convert seconds to milliseconds
  }
  return milliseconds;
}
