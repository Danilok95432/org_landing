import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'

export const Header = () => {
	const [, setIsSmallScreen] = useState(false)
	const { data } = useGetSettingsSiteQuery(null)
	const navRef = useRef<HTMLElement | null>(null)
	const [navHeight, setNavHeight] = useState(0)

	useLayoutEffect(() => {
		const navEl = navRef.current
		if (!navEl) return

		const measure = () => {
			const navEl = navRef.current
			if (!navEl) return

			const h = Math.ceil(navEl.offsetHeight || navEl.getBoundingClientRect().height)

			// важное: не даём спейсеру схлопнуться из-за промежуточного кадра layout
			if (h <= 0) return

			setNavHeight(h)
		}
		measure()

		let ro: ResizeObserver | null = null
		if ('ResizeObserver' in window) {
			ro = new ResizeObserver(measure)
			ro.observe(navEl)
		}

		window.addEventListener('resize', measure)
		window.addEventListener('load', measure)

		return () => {
			ro?.disconnect()
			window.removeEventListener('resize', measure)
			window.removeEventListener('load', measure)
		}
	}, [])

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 1340)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<>
			<div
				style={{
					height: navHeight,
					minHeight: navHeight,
					maxHeight: navHeight,
					flexBasis: navHeight,
					flexShrink: 0,
				}}
				aria-hidden
			/>
			<header ref={navRef} className={styles.header}>
				<Container>
					<FlexRow className={styles.headerRow}>
						<Link to={'/'} aria-label='Главная' title='Главная' className={styles.link}>
							{data?.org_photo && data?.org_photo.length > 0 && (
								<img className={styles.img} src={data?.org_photo[0].original} />
							)}
						</Link>
						<MainNavigation />
						{/* <div className={styles.infoBlock}>
						<HeaderTextSVG />
					</div> */}
						{/* <MainButton className={styles.loginBtn}>
						<PersonIconSvg />
						<p>Войти</p>
					</MainButton> */}
					</FlexRow>
				</Container>
			</header>
		</>
	)
}
