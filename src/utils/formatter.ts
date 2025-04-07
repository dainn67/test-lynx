const formatDateTimeFromMillis = (millis: number | string): string => {
  if (typeof millis === 'string') {
    millis = parseInt(millis);
  }
  const date = new Date(millis);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return date.toLocaleDateString('en-US', options);
};

export const Utils = {
  formatDateTimeFromMillis,
};
