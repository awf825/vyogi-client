import React from 'react';
import { actionTypes } from './AdminActions.js';

export const initialAdminState = false

export const AdminContext = React.createContext({})

export const adminReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.LOG_ADMIN:
            return { ...state, isAdmin: action.payload };
        default:
            return state;
    }
}