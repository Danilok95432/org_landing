import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { PersonIconSvg } from '../icons/personIconSVG'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MainButton } from '../MainButton/MainButton'
import { HeaderTextSVG } from '../icons/headerTextSVG'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'

export const Header = () => {
	const [, setIsSmallScreen] = useState(false)
	const { data } = useGetSettingsSiteQuery(null)

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
						{data?.org_photo && data?.org_photo.length > 0 && (
							<img className={styles.img} src={data?.org_photo[0].original} />
						)}
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
