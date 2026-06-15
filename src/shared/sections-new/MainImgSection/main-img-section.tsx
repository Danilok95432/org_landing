import { Section } from 'src/shared/ui/Section/section'
import styles from './index.module.scss'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import main from 'src/assets/img/main.png'
import { MainButton } from 'src/shared/ui/MainButton/MainButton'
import { useGetEventByIdQuery, useGetSettingsSiteQuery } from 'src/features/home/api/home.api'
import { formatDatesRange } from 'src/shared/helpers/utils'
import { RaspEventSVG } from 'src/shared/ui/icons/raspEventSVG'
import { Pagination, Autoplay } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Link } from 'react-router-dom'

export const MainImgSection = () => {
	const { data } = useGetSettingsSiteQuery(null)
	const { data: eventData } = useGetEventByIdQuery(data?.id_event ?? '1')

	const isSlider = data?.id_promo_block === '2'

	const renderContent = (showControls: boolean) => (
		<div className={styles.mainWrapper}>
			<FlexRow className={styles.desc}>
				<p>{formatDatesRange(eventData?.date)}</p>
				<p className={styles.location}>{eventData?.location.address}</p>
			</FlexRow>

			<FlexRow className={styles.imgControls}>
				<h1>{eventData?.title ?? 'Атмановские Кулачки 2026'}</h1>
				{showControls && data?.isShowBtnRasp && (
					<Link to={`https://${data?.domain}/#program`}>
						<FlexRow className={styles.raspRow}>
							<RaspEventSVG />
							<p>Расписание события</p>
						</FlexRow>
					</Link>
				)}

				{showControls && (data?.isShowBtnBel ?? data?.isShowBtnRequest) && (
					<FlexRow className={styles.controls}>
						<FlexRow className={styles.topGroup}>
							{data?.isShowBtnRequest && (
								<MainButton className={styles.controlBtn}>
									Подать заявку (для участников)
								</MainButton>
							)}
							{data?.isShowBtnBel && (
								<MainButton className={styles.controlBtnSpecial}>
									<div className={styles.customSvgWrapper}></div>
									<p>Регистрация и билеты</p>
								</MainButton>
							)}
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
					{data?.slider_photo.map((slide) => (
						<SwiperSlide key={slide.id}>
							<div className={styles.slide}>
								<img className={styles.mainImg} src={slide.original} alt='' />
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
			<img
				className={styles.mainImg}
				src={
					data?.promo_photo && data?.promo_photo.length > 0 ? data?.promo_photo[0].original : main
				}
				alt=''
			/>
			{renderContent(true)}
		</Section>
	)
}
