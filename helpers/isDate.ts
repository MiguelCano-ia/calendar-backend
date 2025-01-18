import { isValid } from "date-fns";

const isDate = (dateValue: unknown) => {
  if (!dateValue) return false;

  const date = isValid(dateValue); // retorna true o false
  return date;
};

export default isDate;
