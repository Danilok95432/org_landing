/* eslint-disable @typescript-eslint/no-explicit-any */
import { type RefObject, useEffect, useRef, useState } from 'react'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { Swiper, type SwiperRef, SwiperSlide } from 'swiper/react'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { SliderBtns } from 'src/widgets/slider-btns/slider-btns'
import skeletonImg from 'src/assets/img/skeleton-img.png'

import styles from './index.module.scss'
import type { Swiper as SwiperType } from 'swiper/types'
import { CloseSvg } from 'src/shared/ui/icons/closeSVG'
import classNames from 'classnames'
import { eventsSliderFullScreenOptions, eventsSliderOptions } from './consts'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'

type ImageItemWithText = {
	id: number | string
	original?: string
	title?: string
	author?: string
}

type GallerySectionProps = {
	orgPage?: boolean
}

export const GallerySection = ({ orgPage = false }: GallerySectionProps) => {
	const swiperRef: RefObject<SwiperRef> = useRef(null)
	const fullscreenSwiperRef: RefObject<SwiperRef> = useRef(null)

	const { data: eventData } = useGetEventByIdQuery('1')
	const { data: orgData } = useGetPageHeaderQuery('org')

	const [activeIndex, setActiveIndex] = useState(0)

	// fullscreen state
	const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
	const [fullscreenIndex, setFullscreenIndex] = useState(0)

	// ✅ единый источник данных
	const photos: ImageItemWithText[] = orgPage
		? (orgData?.page?.photoGallery ?? []).map((p: any) => ({
				id: p.id,
				original: p.original || p.url,
				title: p.title,
				author: p.author,
			}))
		: eventData?.promo ?? []

	const handleSlideChange = (swiper: SwiperType) => {
		setActiveIndex(swiper.activeIndex)
	}

	const getButtonColors = () => {
		const isFirstSlide = activeIndex === 0
		const isLastSlide = activeIndex === photos.length - 2

		return {
			prevBtnColor: isFirstSlide ? '#00000040' : '#000',
			nextBtnColor: isLastSlide ? '#00000040' : '#000',
		}
	}

	const { prevBtnColor, nextBtnColor } = getButtonColors()

	const openFullscreen = (index: number) => {
		setFullscreenIndex(index)
		setIsFullscreenOpen(true)
	}

	const closeFullscreen = () => {
		setIsFullscreenOpen(false)
	}

	useEffect(() => {
		if (!isFullscreenOpen) return

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeFullscreen()
			}
		}

		document.addEventListener('keydown', onKeyDown)
		return () => document.removeEventListener('keydown', onKeyDown)
	}, [isFullscreenOpen])

	// 💡 можно вообще не рендерить секцию если нет фото
	if (!photos.length) return null

	return (
		<Section id='photo' className={styles.gallerySection}>
			<Container className={styles.galleryCont}>
				<Swiper
					{...eventsSliderOptions}
					ref={swiperRef}
					className={styles.sliderMain}
					onSlideChange={handleSlideChange}
					onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
				>
					{photos.map((slideEl, idx) => (
						<SwiperSlide key={slideEl.id}>
							<FlexRow className={styles.slideRow}>
								<div className={styles.imgWrapper}>
									<img
										className={slideEl.original ? styles.sliderImg : styles.skeletonImg}
										src={slideEl.original ?? skeletonImg}
										alt='image'
										onClick={() => openFullscreen(idx)}
									/>
								</div>
								{slideEl.title && <p className={styles.title}>{slideEl.title}</p>}
								{slideEl.author && <p className={styles.author}>{`Автор: ${slideEl.author}`}</p>}
							</FlexRow>
						</SwiperSlide>
					))}
				</Swiper>

				<SliderBtns
					className={styles.sliderBtns}
					swiperRef={swiperRef}
					color={'#fff'}
					prevBtnColor={prevBtnColor}
					nextBtnColor={nextBtnColor}
				/>
			</Container>

			{/* FULLSCREEN */}
			{isFullscreenOpen && (
				<div className={styles.fullscreenOverlay} onClick={closeFullscreen}>
					<div className={styles.fullscreenInner} onClick={(e) => e.stopPropagation()}>
						<Swiper
							{...eventsSliderFullScreenOptions}
							ref={fullscreenSwiperRef}
							className={styles.fullscreenSwiper}
							slidesPerView={1}
							centeredSlides
							initialSlide={fullscreenIndex}
							onSlideChange={(swiper) => setFullscreenIndex(swiper.activeIndex)}
						>
							{photos.map((slideEl) => (
								<SwiperSlide key={`fullscreen-${slideEl.id}`}>
									<div className={styles.fullscreenImgWrapper}>
										<img
											className={styles.fullscreenImg}
											src={slideEl.original ?? skeletonImg}
											alt='image'
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						<div
							className={classNames('swiper-pagination', styles.paginationContainer)}
							slot='pagination'
						/>

						<SliderBtns
							className={styles.fullscreenBtns}
							swiperRef={fullscreenSwiperRef}
							color={'#fff'}
							prevBtnColor={'#000'}
							nextBtnColor={'#000'}
						/>

						<button type='button' className={styles.fullscreenClose} onClick={closeFullscreen}>
							<CloseSvg />
						</button>
					</div>
				</div>
			)}
		</Section>
	)
}
