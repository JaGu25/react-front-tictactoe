import { ErrorPresentation } from "@/shared/providers/ErrorProvider";
import { AxiosError } from "axios";

interface ErrorResponse {
    error: string;
    message: string | string[]
}

export const handleError = (error: AxiosError, setError: (error: ErrorPresentation) => void) => {

    const data = error.response?.data as ErrorResponse;
    const title = data.error;
    let message = data.message;

    if (typeof message === "object") {
        message = message.join("\n");
    }

    setError({
        message,
        title
    });
}