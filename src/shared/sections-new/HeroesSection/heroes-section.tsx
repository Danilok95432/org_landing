/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { type RefObject, useRef, useEffect, useState, type FC } from 'react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { newsSliderOptions } from './consts'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { HeroCard } from './components/hero-card/hero-card'
import { type HeroCardItem } from 'src/types/heroes'

type NewsProps = {
	id: string
}

export const HeroesSection: FC<NewsProps> = ({ id }) => {
	const heroesList: HeroCardItem[] = [
		{
			id: '1',
			title: 'Герой 1',
			desc: 'Описание героя 1',
			mainphoto: [
				{
					original: 'https://via.placeholder.com/300x200',
					thumbnail: 'https://via.placeholder.com/300x200',
					title: 'Герой 1',
					author: '',
					id: '1',
				},
			],
		},
		{
			id: '2',
			title: 'Герой 2',
			desc: 'Описание героя 2',
			mainphoto: [
				{
					original: 'https://via.placeholder.com/300x200',
					thumbnail: 'https://via.placeholder.com/300x200',
					title: 'Герой 2',
					author: '',
					id: '2',
				},
			],
		},
	]
	const [isMobile, setIsMobile] = useState(false)
	const navigate = useNavigate()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

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
		const isLastSlide = heroesList ? activeIndex === heroesList.length - 2 : false

		return {
			prevBtnColor: isFirstSlide ? '#0000000D' : '#0000000D',
			nextBtnColor: isLastSlide ? '#0000000D' : '#0000000D',
		}
	}

	const { prevBtnColor, nextBtnColor } = getButtonColors()

	return (
		<Section id='news' className={cn(styles.news)}>
			<Container off={isMobile} className={styles.newsCont}>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Наши герои</h2>
					<MainButton className={styles.allBtn} onClick={() => navigate('/content')}>
						Все герои
					</MainButton>
				</FlexRow>
				<Swiper
					{...newsSliderOptions}
					ref={swiperRef}
					className={styles.newsSlider}
					onSlideChange={handleSlideChange}
					onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
				>
					{heroesList.map((newsEl, idx) => (
						<SwiperSlide className={styles.newsSlide} key={idx}>
							<HeroCard key={newsEl.id} {...newsEl} />
						</SwiperSlide>
					))}
				</Swiper>
				<SliderBtns
					className={styles.newsSliderBtns}
					swiperRef={swiperRef}
					color='#000'
					disabledColor='#fff'
					nextBtnColor={nextBtnColor}
					prevBtnColor={prevBtnColor}
				/>
			</Container>
		</Section>
	)
}
