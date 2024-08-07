import { AxiosError } from "axios";

export function simpleErrorHandler(error: any, data?: any) {
  if (error instanceof AxiosError) {
    console.info('Request Config:', error.config);
    console.error('Axios Error:', error.stack)
  } else if (error instanceof Error) {
    console.error('Error saving data to database:', data, error.stack);
  } else {
    console.error('Error saving data:', error);
  }
}