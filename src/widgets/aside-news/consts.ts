import { type SwiperProps } from 'swiper/react'

export const newsSliderOptions: SwiperProps = {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 25,
	observer: true,
	observeParents: true,
	resizeObserver: true,
	updateOnWindowResize: true,
	breakpoints: {
		576: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 3,
		},
		1024: {
			slidesPerView: 4,
		},
		1280: {
			slidesPerView: 4,
		},
		1440: {
			slidesPerView: 4,
		},
	},
}
