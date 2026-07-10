import { Route, Routes } from 'react-router-dom'
import { AboutLayout } from 'src/pages/about-page/about-layout'
import { AboutDocs } from 'src/pages/about-page/layout/docs/docs'
import { AboutHistory } from 'src/pages/about-page/layout/history/history'
import { AboutPlacement } from 'src/pages/about-page/layout/placement/placement'
import { AboutRoute } from 'src/pages/about-page/layout/route/route'
import { AboutTickets } from 'src/pages/about-page/layout/tickets/tickets'
import { AppLayout } from 'src/pages/app-layout/app-layout'
import { ContentPageLayout } from 'src/pages/content-page/content-page-layout'
import { NewsDetailsNew } from 'src/pages/content-page/news-details/news-details'
import { EventsPage } from 'src/pages/events-page/events-page'
import { HomePage } from 'src/pages/home-page/HomePage'
import { OrgPage } from 'src/pages/org-page/org-page'
import { PartnersPage } from 'src/pages/partners-page/partners-page'
import { VideoDetails } from 'src/pages/videos-page/video-details/video-details'
import { VideosPage } from 'src/pages/videos-page/videos-page'
import { AppRoute } from './consts'
import { AboutAdditionalRazdel } from 'src/pages/about-page/layout/additional-razdel/additional-razdel'

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
				<Route path={'/videos'} element={<VideosPage />} />
				<Route path={'/videos/:id'} element={<VideoDetails />} />
				<Route path={'/content/news/:id'} element={<NewsDetailsNew />} />
				<Route path={'/partners-list'} element={<PartnersPage />} />
				<Route path={'/events-list'} element={<EventsPage />} />
				<Route path={AppRoute.About} element={<AboutLayout />}>
					<Route index element={<AboutHistory />} />
					<Route path={'/about/p1'} element={<AboutAdditionalRazdel />} />
					<Route path={'/about/p2'} element={<AboutDocs />} />
					<Route path={'/about/rewards'} element={<AboutRoute />} />
					<Route path={'/about/history'} element={<AboutPlacement />} />
					<Route path={'/about/p3'} element={<AboutTickets />} />
				</Route>
			</Route>
		</Routes>
	)
}
