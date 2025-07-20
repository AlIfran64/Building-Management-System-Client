import React, { useContext, useState } from 'react';
import { PaymentContext } from './PaymentContext';

const PaymentProvider = ({ children }) => {

  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <PaymentContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);

export default PaymentProvider;