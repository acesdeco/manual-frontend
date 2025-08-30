import { setResponseStatus } from "@tanstack/react-start/server";
import { HTTPError } from "ky";
import { ZodError } from "zod";

export async function handleServerFnError(error: unknown) {
  if (error instanceof HTTPError) {
    setResponseStatus(error.response.status);
    const response = await error.response.json();
    if (
      typeof response === "object" &&
      response !== null &&
      "message" in response &&
      typeof response.message === "string"
    )
      return response.message as string;
    else return "An unknown error occured";
  } else if (error instanceof ZodError) {
    setResponseStatus(500);
    return error.message;
  } else throw error;
}
