import { Container } from 'src/shared/ui/Container/Container'
import { getNavigationElements } from './consts'
import styles from './index.module.scss'
import { BurgerMenu } from './components/burger-menu/burger-menu'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

import cn from 'classnames'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'

export const MainNavigation = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const navRef = useRef<HTMLElement | null>(null)

	const rafRef = useRef<number | null>(null)
	const timeoutRef = useRef<number | null>(null)
	const activeTargetRef = useRef<string | null>(null)
	const { data: settingsData } = useGetSettingsSiteQuery(null)

	const navigationElements = getNavigationElements(settingsData)

	const cancelPending = () => {
		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}
		if (timeoutRef.current !== null) {
			window.clearTimeout(timeoutRef.current)
			timeoutRef.current = null
		}
	}

	const getHeaderOffset = () => navRef.current?.getBoundingClientRect().height ?? 0

	const scrollToElWithOffset = (el: HTMLElement, behavior: ScrollBehavior) => {
		const offset = getHeaderOffset()
		const y = el.getBoundingClientRect().top + window.scrollY - offset
		window.scrollTo({ top: Math.max(0, y), behavior })
	}

	const startSmoothScrollToId = (id: string) => {
		cancelPending()
		activeTargetRef.current = id

		let tries = 0
		const tick = () => {
			if (activeTargetRef.current !== id) return

			const el = document.getElementById(id)
			if (!el) {
				if (tries++ < 120) rafRef.current = requestAnimationFrame(tick)
				return
			}

			scrollToElWithOffset(el, 'smooth')

			timeoutRef.current = window.setTimeout(() => {
				if (activeTargetRef.current !== id) return
				const el2 = document.getElementById(id)
				if (!el2) return

				const offset = getHeaderOffset()
				const desiredY = el2.getBoundingClientRect().top + window.scrollY - offset
				const delta = desiredY - window.scrollY

				if (Math.abs(delta) > 8) {
					window.scrollTo({ top: Math.max(0, desiredY), behavior: 'smooth' })
				}
			}, 400)
		}

		rafRef.current = requestAnimationFrame(tick)
	}

	useEffect(() => {
		if (location.pathname !== '/') return

		const state = location.state as { scrollTo?: string } | null
		const stateId = state?.scrollTo
		const hashId = location.hash ? location.hash.slice(1) : undefined

		const id = stateId ?? hashId
		if (!id) return
		window.history.replaceState(null, '', `/#${id}`)

		startSmoothScrollToId(id)

		return () => cancelPending()
	}, [location.key, location.pathname])

	const scrollToSection = (sectionId: string) => {
		cancelPending()
		activeTargetRef.current = sectionId

		if (location.pathname !== '/') {
			navigate('/', { state: { scrollTo: sectionId } })
			return
		}
		if (sectionId.includes('/')) {
			navigate(sectionId)
			return
		}
		window.history.replaceState(null, '', `/#${sectionId}`)
		startSmoothScrollToId(sectionId)
	}

	return (
		<>
			<nav ref={navRef} className={styles.navigation}>
				<Container className={styles.navigationCont}>
					<FlexRow className={styles.mobileRow}>
						<BurgerMenu />
					</FlexRow>

					<ul className={styles.navWrapper}>
						{navigationElements.map((el, index) => (
							<button key={index} className={styles.navEl} onClick={() => scrollToSection(el.link)}>
								<li className={cn({ [styles.active]: location.pathname.includes(el.link) })}>
									{el.title}
								</li>
							</button>
						))}
					</ul>
				</Container>
			</nav>
		</>
	)
}
