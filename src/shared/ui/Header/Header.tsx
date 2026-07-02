import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { LogoSVG } from '../icons/logoSVG'
import { PersonIconSvg } from '../icons/personIconSVG'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { LogoMobileSVG } from '../icons/logoMobileSVG'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MainButton } from '../MainButton/MainButton'
import { HeaderTextSVG } from '../icons/headerTextSVG'

export const Header = () => {
	const breakpoint = useBreakPoint()
	const [, setIsSmallScreen] = useState(false)

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
		<header className={styles.header}>
			<Container>
				<FlexRow className={styles.headerRow}>
					<Link to={'/'} aria-label='Главная' title='Главная' className={styles.link}>
						{breakpoint === 'S' ? <LogoMobileSVG /> : <LogoSVG />}
					</Link>
					<div className={styles.infoBlock}>
						<HeaderTextSVG />
					</div>
					<MainButton className={styles.loginBtn}>
						<PersonIconSvg />
						<p>Войти</p>
					</MainButton>
				</FlexRow>
			</Container>
		</header>
	)
}
