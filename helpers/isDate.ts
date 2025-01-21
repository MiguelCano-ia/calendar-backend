import { getTime, isValid } from "date-fns";

const isDate = (dateValue: string | number | Date) => {
  if (!dateValue) return false;

  const getMiliseconds = getTime(new Date(dateValue));

  const date = isValid(getMiliseconds); // retorna true o false
  return date;
};

export default isDate;
