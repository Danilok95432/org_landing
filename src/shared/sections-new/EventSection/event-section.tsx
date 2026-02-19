import { type FC, type RefObject, useEffect, useRef, useState } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'
import { Container } from 'src/shared/ui/Container/Container'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { eventsSliderOptions } from './eventsSliderOption'
import { EventCard } from './components/event-card/event-card'
import { useGetEventsMonthsQuery } from 'src/features/home/api/home.api'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'

export const EventsSection: FC = () => {
	const { data: homeEvents } = useGetEventsMonthsQuery({ date: '', category: '' })
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<Section className={cn(styles.eventsSection)}>
			<Container off={isMobile}>
				<FlexRow className={styles.eventsSectionRow}>
					<h2 className={styles.sectionTitle}>События</h2>
					<MainButton as='route' to={'/events-list'} className={styles.allBtn}>
						Все события
					</MainButton>
				</FlexRow>

				<div>
					<Swiper {...eventsSliderOptions} ref={swiperRef} className={styles.slider}>
						{homeEvents?.map((slideItem, idx) => (
							<SwiperSlide key={idx}>
								<EventCard className={styles.homeEventCard} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>

					<SliderBtns
						className={styles.eventsSliderBtns}
						swiperRef={swiperRef}
						color={'#fff'}
						nextBtnColor='#000'
						prevBtnColor='#000'
					/>
				</div>
			</Container>
		</Section>
	)
}
