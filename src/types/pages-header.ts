import { type ImageItemWithText } from './photos'

type DocType = {
	id: string
	name: string
	url: string
	size: string
}

export type PagesHeader = {
	page_type: string
	title: string
	short: string
	full: string
	full2: string
	text1: string
	text2: string
	text3: string
	mainphoto: ImageItemWithText[]
	photoGallery: ImageItemWithText[]
	documents: DocType[]
	info: string
	rewards: string
	history: string
	p_text1: string
	p_text2: string
	p_text3: string
	p_title1: string
	p_title2: string
	p_title3: string
}
