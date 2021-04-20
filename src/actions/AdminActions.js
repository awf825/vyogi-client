export const actionTypes = {
    LOG_ADMIN: 'LOG_ADMIN'
}

export const logAdmin = (isAdmin) => ({
    type: actionTypes.LOG_ADMIN,
    payload: isAdmin
});