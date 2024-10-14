import { AxiosError, CanceledError } from "axios";
import { toast } from "react-toastify";
import { ZodError } from "zod";

export const handleRequestError = (error: unknown) => {
  if (error instanceof CanceledError) {
    return "CANCEL";
  } else if (error instanceof AxiosError) {
    console.error(error?.response?.data?.detail);
    toast.error(
      error?.response?.data?.detail ?? "Ошибка при обработке запроса(500)"
    );
    return error?.response?.data?.detail;
  } else if (error instanceof ZodError) {
    console.error(`Validation error: ${error?.errors}`);
    toast.error(error?.errors?.map((e) => e.message).join(", "));
    return error?.errors?.map((e) => e.message).join(", ");
  } else {
    console.error(error);
    return "Error";
  }
};
