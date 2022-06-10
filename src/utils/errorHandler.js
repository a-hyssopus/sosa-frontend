export const errorHandler = (res, successCallbacks) => {
    if (res) {
        // successCallbacks.forEach(func => func())
    } else {
        const err = new Error("Something went wrong!");
        err.response = res;
        throw err;
    }
}
