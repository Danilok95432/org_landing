import orgImg from 'src/assets/img/orgImg.png'
import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainInfoPlaceSVG } from 'src/shared/ui/icons/mainInfoPlaceSVG'
import { useState } from 'react'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'

export const MainInfoSection = () => {
	const { data: eventData } = useGetEventByIdQuery('1')
	const [activeCont, setActiveCont] = useState<boolean>(false)

	return (
		<Section className={cn(styles.mainInfo)}>
			<Container>
				<FlexRow className={styles.mainRow}>
					<div className={styles.imgWrapper}>
						<img src={orgImg} alt='main' className={styles.imgMain} />
					</div>
					<FlexRow className={styles.infoRow}>
						<h1 id='event'>{'Тамбовское общество любителей краеведения'}</h1>
						<FlexRow className={styles.additionalInfoRow}>
							<FlexRow className={cn(styles.rowEl, styles.noMargin, styles.locationEl)}>
								<MainInfoPlaceSVG />
								<a href='#'>{'ул. Кронштадтская, д. 58а, г. Тамбов, Тамбовская обл., Россия'}</a>
							</FlexRow>
						</FlexRow>
						<FlexRow className={styles.infoRow}>
							<div className={styles.textCont}>
								<p className={cn(styles.text, { [styles.activeText]: activeCont })}>
									{eventData?.description && (
										<div
											dangerouslySetInnerHTML={{
												__html:
													'ТОЛК — это небольшая, но сплочённая организация единомышленников, которые постоянно участвуют в городских и областных мероприятиях, направленных на возрождение культурных и национальных традиций. Активисты ТОЛКа организуют передвижные выставки, становятся инициаторами конференций, публикуют статьи и книги, выступают в защиту памятников истории и культуры.',
											}}
										/>
									)}
								</p>
								<button
									className={cn(styles.openContBtn, { [styles.active]: activeCont })}
									onClick={() => setActiveCont(!activeCont)}
								>
									{activeCont ? 'Свернуть' : 'Развернуть'}
								</button>
							</div>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
