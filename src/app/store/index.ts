import { configureStore } from '@reduxjs/toolkit'
import { authApi } from 'src/features/auth/api/auth.api'
import { contentApi } from 'src/features/content/api/content'
import { homeApi } from 'src/features/home/api/home.api'
import { modalReducer } from 'src/features/modal/store/modal.slice'
import { pagesHeaderApi } from 'src/features/pages-header/api/pages-header.api'
import { NameSpace } from 'src/shared/helpers/consts'

export const store = configureStore({
	reducer: {
		[NameSpace.Modal]: modalReducer,
		[homeApi.reducerPath]: homeApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[contentApi.reducerPath]: contentApi.reducer,
		[pagesHeaderApi.reducerPath]: pagesHeaderApi.reducer,
	},
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			homeApi.middleware,
			authApi.middleware,
			contentApi.middleware,
			pagesHeaderApi.middleware,
		),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
