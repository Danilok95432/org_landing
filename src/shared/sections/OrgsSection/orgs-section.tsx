/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { type RefObject, useRef, useState } from 'react'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { partnersSliderOptions } from './consts'
import { Autoplay } from 'swiper'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'

export const OrgsSection = () => {
	const { data: eventData } = useGetEventByIdQuery('1')
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const navigate = useNavigate()

	const [activeIndex, setActiveIndex] = useState(0)

	const handleSlideChange = (swiper: any) => {
		setActiveIndex(swiper.activeIndex)
	}

	const getButtonColors = () => {
		const isFirstSlide = activeIndex === 0
		const isLastSlide = eventData?.partnerLinks
			? activeIndex === eventData?.partnerLinks.length - 2
			: false
		return {
			prevBtnColor: isFirstSlide ? '#0000000D' : '#0000000D',
			nextBtnColor: isLastSlide ? '#0000000D' : '#0000000D',
		}
	}

	const { prevBtnColor, nextBtnColor } = getButtonColors()

	if (!eventData?.organizerGameLinks) return ''
	return (
		<Section id='orgs' className={cn(styles.orgs)}>
			<Container>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Организаторы игр</h2>
					<MainButton className={styles.allBtn} onClick={() => navigate('/partners-list')}>
						Все организаторы
					</MainButton>
				</FlexRow>
				<div className={styles.partnerSlider}>
					<Swiper
						modules={[Autoplay]}
						{...partnersSliderOptions}
						ref={swiperRef}
						className={styles.slider}
						onSlideChange={handleSlideChange}
						onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
					>
						{eventData?.organizerGameLinks.map((slideItem, idx) => (
							<SwiperSlide key={idx} className={styles.partnerSlide}>
								<div className={styles.partnerCard} key={slideItem.id}>
									{slideItem.link && slideItem.link !== '' ? (
										<a href={slideItem.link} className={styles.partnersLink}>
											<img
												src={slideItem.mainphotoOG?.[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
										</a>
									) : (
										<div className={styles.partnersLink}>
											<img
												src={slideItem.mainphotoOG?.[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
										</div>
									)}
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.partnersSliderBtns}
						swiperRef={swiperRef}
						color='#000'
						disabledColor='#fff'
						nextBtnColor={nextBtnColor}
						prevBtnColor={prevBtnColor}
					/>
				</div>
			</Container>
		</Section>
	)
}
