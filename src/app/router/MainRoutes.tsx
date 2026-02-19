import { Route, Routes } from 'react-router-dom'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ContentPageLayout } from 'src/pages/content-page/content-page-layout'
import { NewsDetailsNew } from 'src/pages/content-page/news-details/news-details'
import { VideoDetails } from 'src/pages/content-page/video-details/video-details'
import { EventsPage } from 'src/pages/events-page/events-page'
import { HomePage } from 'src/pages/home-page/HomePage'
import { OrgPage } from 'src/pages/org-page/org-page'
import { PartnersPage } from 'src/pages/partners-page/partners-page'

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
				<Route path={'/content'} element={<ContentPageLayout />} />
				<Route path={'/content/news/:id'} element={<NewsDetailsNew />} />
				<Route path={'/content/videos/:id'} element={<VideoDetails />} />
				<Route path={'/partners-list'} element={<PartnersPage />} />
				<Route path={'/events-list'} element={<EventsPage />} />
			</Route>
		</Routes>
	)
}
