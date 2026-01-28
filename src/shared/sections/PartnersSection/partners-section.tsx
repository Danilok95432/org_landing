import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { partnersSliderOptions } from './consts'
import { type RefObject, useRef } from 'react'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { Autoplay } from 'swiper'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'

export const PartnersSection = () => {
	const { data: eventData } = useGetEventByIdQuery('1')
	const navigate = useNavigate()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	if (!eventData?.partnerLinks) return ''
	return (
		<Section id='partners' className={cn(styles.partners)}>
			<Container>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Партнеры</h2>
					<MainButton className={styles.allBtn} onClick={() => navigate('/')}>
						Все партнеры
					</MainButton>
				</FlexRow>
				<div className={styles.partnerSlider}>
					<Swiper
						modules={[Autoplay]}
						{...partnersSliderOptions}
						ref={swiperRef}
						className={styles.slider}
					>
						{eventData?.partnerLinks.map((slideItem, idx) => (
							<SwiperSlide key={idx} className={styles.partnerSlide}>
								<div className={styles.partnerCard} key={slideItem.id}>
									{slideItem.link && slideItem.link !== '' ? (
										<a href={slideItem.link} className={styles.partnersLink}>
											<img
												src={slideItem.mainphotoPLL?.[0]?.thumbnail}
												alt='partner'
												width={188}
												height={105}
												loading='lazy'
											/>
										</a>
									) : (
										<div className={styles.partnersLink}>
											<img
												src={slideItem.mainphotoPLL?.[0]?.thumbnail}
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
						color='#fff'
						prevBtnColor='#000000'
						nextBtnColor='#000000'
					/>
				</div>
			</Container>
		</Section>
	)
}
