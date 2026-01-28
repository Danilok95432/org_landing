import { MainInfoSection } from 'src/shared/sections-new/MainInfoSection/main-info-section'
import { NewsSection } from 'src/shared/sections/NewsSection/news-section'
import { VideosSection } from 'src/shared/sections/VideosSection/videos-section'
import { EventsSection } from 'src/shared/sections-new/EventSection/event-section'
import { FaqSection } from 'src/shared/sections/FaqSection/faq-section'
import { PartnersSection } from 'src/shared/sections/PartnersSection/partners-section'

export const HomePage = () => {
	return (
		<>
			<MainInfoSection />
			<EventsSection />
			<NewsSection />
			<VideosSection />
			<PartnersSection />
			<FaqSection />
		</>
	)
}
