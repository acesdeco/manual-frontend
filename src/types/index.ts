export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Student = {
  student_id: string;
  student_name: string;
  reg_number: string;
};
