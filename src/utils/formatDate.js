export const formatDate = (date, includeHours = true) => {
  const dateObj = new Date(date);
  const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric' };

  if (includeHours) {
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions) + ' ' + dateObj.toLocaleTimeString('en-US', timeOptions);
    return formattedDate;
  }

  const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);
  return formattedDate;
};
