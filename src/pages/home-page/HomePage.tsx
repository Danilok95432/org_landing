import { MainInfoSection } from 'src/shared/sections-new/MainInfoSection/main-info-section'
import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
import { EventsSection } from 'src/shared/sections-new/EventSection/event-section'
import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { PartnersSection } from 'src/shared/sections/PartnersSection/partners-section'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'

export const HomePage = () => {
	const { data } = useGetSettingsSiteQuery(null)
	return (
		<>
			<MainInfoSection id={'1'} />
			{data?.isShowEvents && <EventsSection />}
			{data?.isShowNews && <NewsSection id={'1'} />}
			{data?.isShowVideos && <VideosSection id={'1'} />}
			{data?.isShowPartners && <PartnersSection id={'1'} />}
			{data?.isShowFaq && <FaqSection id={'1'} />}
		</>
	)
}
