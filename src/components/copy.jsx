import React, { useEffect, useState } from 'react';

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetch currencies
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfuter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data)); // assuming API returns an object with currency codes as keys
    } catch (error) {
      console.error("Error fetching currencies", error);
    }
  };

  // Fetch conversion rate and calculate amount
  const convertCurrency = async () => {
    try {
      const res = await fetch(`https://api.frankfuter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      setConvertedAmount(data.result); // assuming API returns the conversion result in `data.result`
    } catch (error) {
      console.error("Error converting currency", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
      <h2 className='mb-10 text-2xl font-semibold text-gray-700'>Currency Converter</h2>
      
      <div className='mb-4'>
        <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>
          Amount:
        </label>
        <input 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number" 
          min="0"
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-50 m-1'
        />
      </div>
      
      <div className='mb-4'>
        <label htmlFor="fromCurrency" className='block text-sm font-medium text-gray-700'>
          From Currency:
        </label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-50 m-1'
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor="toCurrency" className='block text-sm font-medium text-gray-700'>
          To Currency:
        </label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-50 m-1'
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className='flex justify-end mt-6'>
        <button 
          onClick={convertCurrency}
          className='px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Convert
        </button>
      </div>
      
      <div className='mt-4 text-lg font-medium text-right text-green-600'>
        {convertedAmount !== null ? `Converted Amount: ${convertedAmount} ${toCurrency}` : 'Enter amount and select currencies'}
      </div>
    </div>
  );
};

export default CurrencyConvertor;
