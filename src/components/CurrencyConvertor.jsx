import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { useSearchParams } from 'react-router-dom'

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState(1)
  const [amount, setAmount] = useState([])

  // Currencies -> https://api.frankfuter.app/currencies
  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfuter.app/currencies");
      const data = await res.json();

      setCurrencies(data);
    } catch (error) {
      console.error("Enter fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);
  console.log(currencies);

  const convertCurrency = () => {

  }

  // Conversion -> https://api.frankfuter.app/latest?amount=1&from=USD&to=INR
  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
      <h2 className='mb-10 text-2xl font-semibold text-gray-700'>CurrencyConverter</h2>

      <div>Dropdowns</div>
      <div>
        <label htmlFor="amount"
          className='block text-sm font-medium text-gray-700'>
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-50 m-1' />
      </div>
      <div className='flex justify-end mt-6'>
        <button
          onclic={convertCurrency}
          className='px-5 py-2 bg-indigo-600 text-white  rounded-md hover:bg-indigo-700 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
          Convert
        </button>
      </div>
      <div className='mt-4 text-lg font-medium text-right text-green-600'>
        Converted Amount: 69 USD
      </div>

    </div>
  )
}

export default CurrencyConvertor
