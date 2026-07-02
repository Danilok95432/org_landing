import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
import { EventsSection } from 'src/shared/sections-new/EventSection/event-section'
import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { PartnersSection } from 'src/shared/sections/PartnersSection/partners-section'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'
import { MainSliderSection } from 'src/shared/sections/MainSliderSection/main-slider-section'
import { OrgsSection } from 'src/shared/sections/OrgsSection/orgs-section'
import { HistorySection } from 'src/shared/sections-new/HistorySection/history-section'
import { MainImgSection } from 'src/shared/sections-new/MainImgSection/main-img-section'
// import { HeroesSection } from 'src/shared/sections-new/HeroesSection/heroes-section'

export const HomePage = () => {
	const { data } = useGetSettingsSiteQuery(null)
	return (
		<>
			{data?.isShowPromo && <MainImgSection />}
			{data?.isShowHistory && <HistorySection />}
			<MainSliderSection />
			{data?.isShowEvents && <EventsSection />}
			{data?.isShowNews && <NewsSection id={'1'} />}
			{/* <HeroesSection id={'1'} /> */}
			{data?.isShowVideos && <VideosSection id={'1'} />}
			{data?.isShowOrg && <OrgsSection />}
			{data?.isShowPartners && <PartnersSection id={'1'} />}
			{data?.isShowFaq && <FaqSection id={'0'} />}
		</>
	)
}
