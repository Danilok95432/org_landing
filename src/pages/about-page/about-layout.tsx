import { useMemo, type FC } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { AboutLayoutHeader } from './components/about-layout-header'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { BreadCrumbs } from 'src/widgets/bread-crumbs/bread-crumbs'
import { HeadMenu } from 'src/widgets/head-menu/head-menu'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'
import { getAboutMenuItems } from './consts'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'

export const AboutLayout: FC = () => {
	const location = useLocation()
	const breakPoint = useBreakPoint()

	const { data: settingsData } = useGetSettingsSiteQuery(null)
	const { data: aboutPageData } = useGetPageHeaderQuery('about')

	const aboutMenuItems = useMemo(() => {
		return getAboutMenuItems(aboutPageData?.page)
	}, [aboutPageData?.page])

	const getCurrentLocation = () => {
		if (
			location.pathname.startsWith(`/about/laureates/`) ||
			location.pathname.startsWith(`/about/about-games/`)
		) {
			return true
		}
		return false
	}

	const isTraditionPage = getCurrentLocation()

	return (
		<div className={styles.aboutLayout}>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...aboutMenuItems,
						{
							title: `${settingsData?.aboutTitle}`,
							link: 'about',
						},
					]}
				/>
			</Container>
			<Container className={styles.aboutContainerLayout} off={breakPoint === 'S'}>
				{!isTraditionPage && (
					<>
						{<AboutLayoutHeader />}
						<HeadMenu
							className={styles.aboutSideMenu}
							sideItems={[
								{
									title: 'Информация',
									link: '/about',
								},
								...aboutMenuItems,
							]}
						/>
					</>
				)}
				<Outlet />
			</Container>
			<Container>
				<BreadCrumbs
					crumbsLinksMap={[
						...aboutMenuItems,
						{
							title: `${settingsData?.aboutTitle}`,
							link: 'about',
						},
					]}
				/>
			</Container>
		</div>
	)
}
