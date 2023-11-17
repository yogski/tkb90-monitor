export function simpleErrorHandler(error: any) {
  if (error instanceof Error) {
    console.error('Error saving data to database:', error.message);
  } else {
    console.error('Error saving data:', error)
  }
}