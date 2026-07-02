type NavigationElement = {
	title: string
	link: string
}

type SettingsData = {
	isShowEvents?: boolean
	isShowNews?: boolean
	isShowVideos?: boolean
	isShowFaq?: boolean
	aboutTitle?: string
}

export const getNavigationElements = (settingsData?: SettingsData): NavigationElement[] =>
	[
		{
			title: `${settingsData?.aboutTitle}`,
			link: 'about',
		},
		settingsData?.isShowEvents
			? {
					title: 'События',
					link: 'event',
				}
			: null,
		settingsData?.isShowNews
			? {
					title: 'Новости',
					link: 'news',
				}
			: null,
		settingsData?.isShowVideos
			? {
					title: 'Видео',
					link: 'video',
				}
			: null,
		settingsData?.isShowFaq
			? {
					title: 'Вопросы',
					link: 'faq',
				}
			: null,
	].filter((item): item is NavigationElement => item !== null)
