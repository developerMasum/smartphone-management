
// import { baseApi } from "../../api/baseApi";

// const productApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getAllProducts: builder.query({
//       query: () => ({
//         url: "/products",
//         method: "GET",
//       }),
//     }),
//     createProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: "/add-product",
//         method: "POST",
//         body: newProduct,
//       }),
//     }),
//   }),
// });

// export const { useGetAllProductsQuery, useCreateProductMutation } = productApi;

import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (filters) => ({
        url: "/products",
        method: "GET",
        params: filters, 
      }),
    }),
    // getAllProducts: builder.query({
    //   query: (filters) => ({
    //     url: /products=${filters},
    //     method: "GET",
    //   }),
    // }),
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/add-product",
        method: "POST",
        body: productInfo,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),

    updateProductNew: builder.mutation({
      query: (options) => {
        return {
          url: `/product/${options.productId}`,
          method: "PUT",
          body: options.data,
        };
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductNewMutation,
} = productApi;
