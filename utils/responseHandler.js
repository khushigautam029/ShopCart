export const sendSuccess = ( res , statusCode , message , data = null) => {
    return res.status(statusCode).json({
        success:true,
        message,
        ...(data || {})
    });
};

export const sendError = ( res , statusCode , message , errors = null) => {
    return res.status(statusCode).json({
        sendSuccess:false,
        message,
        ...(errors && { errors })
    });
};