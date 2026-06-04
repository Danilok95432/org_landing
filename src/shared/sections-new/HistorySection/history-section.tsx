import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { Section } from 'src/shared/ui/Section/section'
import { type FC, type RefObject, useRef } from 'react'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { useGetEventAwardsByIdQuery } from 'src/features/home/api/home.api'
import { eventsSliderOptions } from './consts'
import { HistorySeporatorSVG } from 'src/shared/ui/icons/historySeporatorSVG'

export const HistorySection: FC<{ noTitle?: boolean; className?: string }> = ({
	noTitle = false,
	className,
}) => {
	const { data: history } = useGetEventAwardsByIdQuery('1')
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	return (
		<Section className={cn(styles.history, className)}>
			<Container>
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
				</FlexRow>
			</Container>
		</Section>
	)
}
