import { type ImageItemWithText } from './photos'

export type SiteSettings = {
	isShowPromo: boolean
	isShowBtnRequest: boolean
	isShowBtnBel: boolean
	isShowBtnRasp: boolean
	isShowNews: boolean
	isShowHistory: boolean
	isShowInfo: boolean
	isShowVideos: boolean
	isShowEvents: boolean
	isShowPartners: boolean
	isShowFaq: boolean
	phone: string
	email: string
	vk: string
	rutube: string
	address: string
	certificate: string
	title: string
	copyright: string
	metric: string
	isShowOrg: boolean
	slider_photo: ImageItemWithText[]
	promo_photo: ImageItemWithText[]
	id_event: string
	id_promo_block: string
	domain: string
}
