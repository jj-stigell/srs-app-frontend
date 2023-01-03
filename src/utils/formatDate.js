export const formatDate = (date) => {
  const dateObj = new Date(date);
  const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: 'numeric' };
  const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions) + ' ' + dateObj.toLocaleTimeString('en-US', timeOptions);
  return formattedDate;
};
