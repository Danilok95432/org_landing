import { Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { HomePage } from 'src/pages/home-page/HomePage'
import { OrgPage } from 'src/pages/org-page/org-page'

export const MainRoutes = () => {
	return (
		<Routes>
			{/*
				<Route path={'terminal'} element={<TerminalPage />} />
			<Route path={'terminal/print'} element={<PrintPage />} />
				*/}
			<Route path='/' element={<AppLayout />}>
				<Route index element={<HomePage />} />
				<Route path={'/org'} element={<OrgPage />} />
			</Route>
		</Routes>
	)
}
