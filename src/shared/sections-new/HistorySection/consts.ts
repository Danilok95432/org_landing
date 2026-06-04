import { DisplayBreakpoints } from 'src/shared/helpers/consts'
import { Pagination, Autoplay } from 'swiper'
import { type SwiperProps } from 'swiper/react'

export const eventsSliderOptions: SwiperProps = {
	slidesPerView: 1.2,
	slidesPerGroup: 1,
	spaceBetween: 24,
	autoHeight: false,
	loop: false,
	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	pagination: {
		clickable: true,
		type: 'bullets',
	},
	modules: [Pagination, Autoplay], // Добавьте Autoplay сюда
	breakpoints: {
		[DisplayBreakpoints.Sm]: {
			slidesPerView: 1.2,
		},
		[DisplayBreakpoints.Md]: {
			slidesPerView: 3,
		},
		[DisplayBreakpoints.ShortLg]: {
			slidesPerView: 3,
		},
		[DisplayBreakpoints.Lg]: {
			slidesPerView: 4,
		},
		[DisplayBreakpoints.Xll]: {
			slidesPerView: 4,
		},
		[DisplayBreakpoints.Xxl]: {
			slidesPerView: 4,
		},
	},
}
