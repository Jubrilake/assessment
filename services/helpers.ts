export const convertInputDate = (date: string | undefined) => {
    return date ? new Date(date).toISOString().substr(0, 10) : "";
  };