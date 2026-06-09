import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import main from 'src/assets/img/main.png'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { formatDatesRange } from 'src/shared/helpers/utils'
import { RaspEventSVG } from 'src/shared/ui/icons/raspEventSVG'
import { Pagination, Autoplay } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

export const MainImgSection = () => {
	const { data: eventData } = useGetEventByIdQuery('1')

	const isSlider = false

	// Потом сюда можно подставить массив картинок с бэка
	const slides = [
		{
			id: 1,
			image: main,
		},
		{
			id: 2,
			image: main,
		},
		{
			id: 3,
			image: main,
		},
	]

	const renderContent = (showControls: boolean) => (
		<div className={styles.mainWrapper}>
			<FlexRow className={styles.desc}>
				<p>{formatDatesRange(eventData?.date)}</p>
				<p className={styles.location}>{eventData?.location.address}</p>
			</FlexRow>

			<FlexRow className={styles.imgControls}>
				<h1>{eventData?.title ?? 'Атмановские Кулачки 2026'}</h1>
				{showControls && (
					<FlexRow className={styles.raspRow}>
						<RaspEventSVG />
						<p>Расписание события</p>
					</FlexRow>
				)}

				{showControls && (
					<FlexRow className={styles.controls}>
						<FlexRow className={styles.topGroup}>
							<MainButton className={styles.controlBtn}>Подать заявку (для участников)</MainButton>

							<MainButton className={styles.controlBtnSpecial}>
								<div className={styles.customSvgWrapper}></div>
								<p>Регистрация и билеты</p>
							</MainButton>
						</FlexRow>
					</FlexRow>
				)}
			</FlexRow>
		</div>
	)

	if (isSlider) {
		return (
			<Section className={styles.noPadding}>
				<Swiper
					className={styles.mainSlider}
					modules={[Pagination, Autoplay]}
					slidesPerView={1}
					loop
					pagination={{
						clickable: true,
					}}
					autoplay={{
						delay: 6000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
				>
					{slides.map((slide) => (
						<SwiperSlide key={slide.id}>
							<div className={styles.slide}>
								<img className={styles.mainImg} src={slide.image} alt='' />
								{renderContent(false)}
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</Section>
		)
	}

	return (
		<Section className={styles.noPadding}>
			<img className={styles.mainImg} src={main} alt='' />
			{renderContent(true)}
		</Section>
	)
}
