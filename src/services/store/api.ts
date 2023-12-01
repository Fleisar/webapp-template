import {createApi} from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: () => new Promise(() => ''), // TODO: complete query handler
  endpoints: () => ({}),
})
