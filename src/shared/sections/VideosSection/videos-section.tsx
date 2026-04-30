/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { useGetEventVideosByIdQuery } from 'src/features/home/api/home.api'
import { type FC, type RefObject, useEffect, useRef, useState } from 'react'
import { VideoCard } from './components/video-card/video-card'
import { homeVideosSliderOptions } from './consts'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

type VideoProps = {
	id: string
}

export const VideosSection: FC<VideoProps> = ({ id }) => {
	const { data: videos } = useGetEventVideosByIdQuery(id, { skip: !id })
	const [isMobile, setIsMobile] = useState(false)
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)
	const navigate = useNavigate()

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const [activeIndex, setActiveIndex] = useState(0)

	const handleSlideChange = (swiper: any) => {
		setActiveIndex(swiper.activeIndex)
	}

	const getButtonColors = () => {
		const isFirstSlide = activeIndex === 0
		const isLastSlide = videos ? activeIndex === videos.length - 2 : false

		return {
			prevBtnColor: isFirstSlide ? '#00000040' : '#000',
			nextBtnColor: isLastSlide ? '#00000040' : '#000',
		}
	}

	const { prevBtnColor, nextBtnColor } = getButtonColors()

	return (
		<Section id='video' className={cn(styles.videos)}>
			<Container off={isMobile}>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Видеолента</h2>
					<MainButton className={styles.allBtn} onClick={() => navigate('/content?onlyVideo=1')}>
						Все видео
					</MainButton>
				</FlexRow>
				<div>
					<Swiper
						{...homeVideosSliderOptions}
						ref={swiperRef}
						onSlideChange={handleSlideChange}
						onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
					>
						{videos?.map((slideItem, idx) => (
							<SwiperSlide key={idx}>
								<VideoCard key={slideItem.id} {...slideItem} />
							</SwiperSlide>
						))}
					</Swiper>
					<SliderBtns
						className={styles.videoSliderBtns}
						swiperRef={swiperRef}
						color={'#fff'}
						nextBtnColor={nextBtnColor}
						prevBtnColor={prevBtnColor}
					/>
				</div>
			</Container>
		</Section>
	)
}
