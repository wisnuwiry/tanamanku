export type ResponseData = {
  detail: ErrorResponse | SuccessResponse;
};

export type ErrorResponse = {
  status: "error";
  error_message: string;
};

export type SuccessResponse = {
  status: "success";
  predictions: Prediction[];
  image?: string;
};

export type Prediction = {
  box: number[];
  class_name: string;
  class_label: string;
  solution: string;
};
