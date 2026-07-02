import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'
import { type FC, type RefObject, useEffect, useRef, useState } from 'react'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useGetEventAwardsByIdQuery } from 'src/features/home/api/home.api'
import { eventsSliderOptions } from './consts'
import { HistorySeporatorSVG } from 'src/shared/ui/icons/historySeporatorSVG'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'

export const HistorySection: FC<{ noTitle?: boolean; className?: string }> = ({
	noTitle = false,
	className,
}) => {
	const { data: history } = useGetEventAwardsByIdQuery('1')
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	return (
		<Section className={cn(styles.history, className)}>
			<Container off={isMobile}>
				<FlexRow className={styles.historyList}>
					<Swiper {...eventsSliderOptions} ref={swiperRef}>
						{history?.dates.map((el) => {
							return (
								<SwiperSlide key={el.id}>
									<div className={styles.historyEl}>
										<FlexRow className={styles.titleRow}>
											<HistorySeporatorSVG />
											<p>{el.datename}</p>
										</FlexRow>
										<p>{el.datetext}</p>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
					<SliderBtns
						className={styles.eventsSliderBtns}
						swiperRef={swiperRef}
						color='#000'
						disabledColor='#fff'
						nextBtnColor='#0000000D'
						prevBtnColor='#0000000D'
					/>
				</FlexRow>
			</Container>
		</Section>
	)
}
