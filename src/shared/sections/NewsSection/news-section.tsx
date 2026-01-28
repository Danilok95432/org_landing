import { useGetEventNewsByIdQuery } from 'src/features/home/api/home.api'
import { Container } from '../../ui/Container/Container'
import styles from './index.module.scss'
import cn from 'classnames'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { type RefObject, useRef, useEffect, useState, useMemo } from 'react'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import { newsSliderOptions } from './consts'
import { NewsCard } from './components/NewsCard/news-card'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useNavigate } from 'react-router-dom'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { type CardNewsItem } from 'src/types/news'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'

export const NewsSection = () => {
	const { data: newsList } = useGetEventNewsByIdQuery('1')
	const [isMobile, setIsMobile] = useState(false)
	const navigate = useNavigate()
	const breakpoint = useBreakPoint()
	const swiperRef: RefObject<SwiperRef> = useRef<SwiperRef>(null)

	const { mainNews, topNews } = useMemo(() => {
		if (!newsList) {
			return { mainNews: null, topNews: [] }
		}

		const sortedNews = [...newsList].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		)

		let mainNewsItem = sortedNews.find((news) => news.main) ?? null
		if (mainNewsItem) {
			const mainNewsList = sortedNews.filter((news) => news.main)
			mainNewsItem = mainNewsList[0]
		}

		let topNewsItems: CardNewsItem[] = []

		if (mainNewsItem) {
			const filtered = sortedNews.filter((news) => news.id !== mainNewsItem?.id)

			if (breakpoint === 'breakPoint') {
				topNewsItems = filtered.slice(0, 1)
			} else if (breakpoint === 'ShortLg' || breakpoint === 'L') {
				topNewsItems = filtered.slice(0, 1)
			} else if (breakpoint === 'S') {
				mainNewsItem = null
				topNewsItems = []
			} else {
				topNewsItems = filtered.slice(0, 1)
			}
		} else {
			topNewsItems = sortedNews.slice(0, 5)
		}

		return { mainNews: mainNewsItem, topNews: topNewsItems }
	}, [newsList, breakpoint])

	const sliderNews = useMemo(() => {
		if (!newsList) return []

		const excludedNewsIds: string[] = []

		if (mainNews) {
			excludedNewsIds.push(mainNews.id)
		}
		excludedNewsIds.push(...topNews.map((news) => news.id))

		return newsList.filter((news) => !excludedNewsIds.includes(news.id))
	}, [newsList, mainNews, topNews])

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<Section id='news' className={cn(styles.news)}>
			<Container off={isMobile} className={styles.newsCont}>
				<FlexRow className={styles.btnRow}>
					<h2 className={styles.sectionTitle}>Новости</h2>
					<MainButton className={styles.allBtn} onClick={() => navigate('/content')}>
						Все новости
					</MainButton>
				</FlexRow>
				{!isMobile && (
					<div className={styles.breakpointNews}>
						{mainNews ? (
							<>
								<div className={styles.mainNews}>
									<NewsCard {...mainNews} mainStatus={true} className={styles.mainNewsCard} />
								</div>
								<div className={styles.topNews}>
									{topNews.map((news) => (
										<NewsCard className={styles.defaultNewsCard} key={news.id} {...news} />
									))}
								</div>
							</>
						) : (
							<div className={styles.topNews}>
								{topNews.map((news) => (
									<NewsCard className={styles.defaultNewsCard} key={news.id} {...news} />
								))}
							</div>
						)}
					</div>
				)}
				{sliderNews && sliderNews?.length > 0 && (
					<>
						<Swiper {...newsSliderOptions} ref={swiperRef} className={styles.newsSlider}>
							{sliderNews.map((newsEl, idx) => (
								<SwiperSlide className={styles.newsSlide} key={idx}>
									<NewsCard key={newsEl.id} {...newsEl} />
								</SwiperSlide>
							))}
						</Swiper>
						<SliderBtns
							className={styles.newsSliderBtns}
							swiperRef={swiperRef}
							color={'#fff'}
							nextBtnColor='#000'
							prevBtnColor='#000'
						/>
					</>
				)}
			</Container>
		</Section>
	)
}
