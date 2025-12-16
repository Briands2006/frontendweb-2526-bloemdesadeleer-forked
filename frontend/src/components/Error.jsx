import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    toast.error("Er is een fout opgetreden!" + (error?.response?.data?.message || ""));
    return (
      <div
        className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
        data-cy="axios_error_message"
      >
        <h4 className="text-red-800 font-semibold text-lg mb-2">
          Oops, something went wrong
        </h4>
        <p className="text-red-700">
          {error?.response?.data?.message || error.message}
          {error?.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </p>
      </div>
    );
  }
  if (error) {
    toast.error("Er is een fout opgetreden!" + (error.message || ""));
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h4 className="text-red-800 font-semibold text-lg mb-2">
          An unexpected error occured
        </h4>
        <p className="text-red-700">{error.message || JSON.stringify(error)}</p>
      </div>
    );
  }

  return null;
}
