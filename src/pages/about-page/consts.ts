import { type NavigationItem } from 'src/types/navigation'
import { type PagesHeader } from 'src/types/pages-header'

const isNotEmpty = (value?: string | null) => Boolean(value?.trim())

export const getAboutMenuItems = (data?: PagesHeader): NavigationItem[] => {
	if (!data) return []

	const items: NavigationItem[] = []

	if (isNotEmpty(data.rewards)) {
		items.push({
			title: 'Достижения',
			link: '/about/rewards',
		})
	}

	if (isNotEmpty(data.history)) {
		items.push({
			title: 'История',
			link: '/about/history',
		})
	}

	const customPages = [
		{
			title: data.p_title1,
			text: data.p_text1,
			link: '/about/p1',
		},
		{
			title: data.p_title2,
			text: data.p_text2,
			link: '/about/p2',
		},
		{
			title: data.p_title3,
			text: data.p_text3,
			link: '/about/p3',
		},
	]

	customPages.forEach((page) => {
		if (isNotEmpty(page.title) && isNotEmpty(page.text)) {
			items.push({
				title: page.title,
				link: page.link,
			})
		}
	})

	return items
}
