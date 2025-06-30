import { createContext, useState } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("$");

  const rates = {
    $: 1,
    "€": 0.92,
    "¥": 144.6,
  };

  const symbols = {
    $: "$",
    "€": "€",
    "¥": "¥",
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, symbols }}>
      {children}
    </CurrencyContext.Provider>
  );
};

// import { createContext, useState } from "react";

// export const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [currentCurrency, setCurrentCurrency] = useState("$");

//   return (
//     <CurrencyContext.Provider
//       value={{ currency: currentCurrency, setCurrency: setCurrentCurrency }}
//     >
//       {children}
//     </CurrencyContext.Provider>
//   );
// };
