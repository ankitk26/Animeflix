export const dateFormatter = (inputDate) => {
  let date = new Date(inputDate);
  return date.toDateString();
};
