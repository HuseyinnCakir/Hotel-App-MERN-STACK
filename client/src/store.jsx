import { configureStore } from '@reduxjs/toolkit'

import headerReducer from './features/header/headerSlice'
import adminReducer from './features/admin/adminSlice'
export const store = configureStore({
  reducer: {
    header: headerReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
