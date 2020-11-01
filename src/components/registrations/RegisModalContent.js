import React from 'react';

export const RegisModalContent = ({ handleRegistration, handleInputChange, data }) => {
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegistration}>
        <label htmlFor="email">
          Email
          <input
            type="text"
            value={data.email}
            onChange={handleInputChange}
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            value={data.password}
            onChange={handleInputChange}
            name="password"
            id="password"
          />
        </label>
        <label htmlFor="passwordConf">
          Password
          <input
            type="password"
            value={data.passwordConf}
            onChange={handleInputChange}
            name="passwordConf"
            id="passwordConf"
          />
        </label>
        <button placeholder="submit" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

export default RegisModalContent;