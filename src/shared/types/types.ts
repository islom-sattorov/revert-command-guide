export type ZustandState<T> = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: T | null;
  errorData: string | null;
};
