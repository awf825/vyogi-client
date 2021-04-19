import React, { createContext, useState, useContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({children}) => {
  return (
    <AdminContext.Provider value={false}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;