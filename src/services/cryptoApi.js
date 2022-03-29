import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoApiHeaders = {
  "X-RapidAPI-Host": process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
  "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
};
const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (id) => createRequest(`/coin/${id}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/markets`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
  }),
});
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
