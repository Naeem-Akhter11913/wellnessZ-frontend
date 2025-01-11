import { toast } from "react-toastify";

export const showAllertMessage = (type, message) => {
    const toastOptions = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    switch (type) {
        case "success":
            toast.success(message, toastOptions);
            break;
        case "error":
            toast.error(message, toastOptions);
            break;
        default:
            toast("Oops... mismatch message type!", {
                ...toastOptions,
                autoClose: 5000, // Custom autoClose for default case
            });
            break;
    }
};
