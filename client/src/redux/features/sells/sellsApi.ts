import { baseApi } from "../../api/baseApi";
const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSell: builder.mutation({
      query: (sellInfo) => ({
        url: "/product/create-sell",
        method: "POST",
        body: sellInfo,
      }),
    }),
    getAllSell: builder.query({
      query: (category) => ({
            url: '/product/sell-products/',
        method: "GET",
        params: { category },
      }),
    }),
  }),
});

export const { useCreateSellMutation, useGetAllSellQuery } = sellApi;