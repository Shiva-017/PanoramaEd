
export const setResponse = (data, res) => {
    res.status(200).json(data);
}
export const setErrorResponse = (err, res) => {
    res.status(500).json({
        code: "Server Error",
        message: err.message
    })
}