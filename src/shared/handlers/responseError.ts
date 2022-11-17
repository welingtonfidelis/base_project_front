type Response = {
  message: string | string[];
  status: number;
};

export const responseErrorHandler = (error: any): Response => {
  let status = 500;
  let message = "";

  if (error?.response?.status) status = error.response.status;

  if (error?.response?.data?.message) message = error.response.data.message;

  return { message, status };
};
