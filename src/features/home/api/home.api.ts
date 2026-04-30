import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MAIN_PROD_URL, ReducerPath } from 'src/shared/helpers/consts'
import { type ContactsInfo } from 'src/types/contacts'
import {
	type CardEventItem,
	type EventItem,
	type EventAwardResponse,
	type EventFaq,
} from 'src/types/event'
import { type FiltrationInfo } from 'src/types/global'
import { type CardNewsItem } from 'src/types/news'
import { type ProgramDay, type SubEventResponse } from 'src/types/program'
import { type SiteSettings } from 'src/types/site-settings'
import { type VideoItem } from 'src/types/videos'

export const homeApi = createApi({
	reducerPath: ReducerPath.Home,
	tagTypes: ['Home'],
	baseQuery: fetchBaseQuery({
		baseUrl: MAIN_PROD_URL,
	}),
	endpoints: (build) => ({
		getCurrentEventId: build.query<{ status: string; id_event: string; errorText: string }, null>({
			query: () => ({
				url: `get_event`,
			}),
		}),
		getEventsMonths: build.query<CardEventItem[], { date: string; category: string }>({
			query: ({ date = '0', category = '0' }) => ({
				url: 'events',
				params: {
					d: date,
					cat: category,
				},
			}),
		}),
		getEventsFiltration: build.query<FiltrationInfo, null>({
			query: () => ({
				url: `events_filter_info`,
			}),
		}),
		getEventById: build.query<EventItem, string>({
			query: (eventId) => ({
				url: `events/${eventId}`,
			}),
		}),
		getEventNewsById: build.query<CardNewsItem[], string>({
			query: (eventId) => ({
				url: `news`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventAwardsById: build.query<EventAwardResponse, string>({
			query: (eventId) => ({
				url: `dates/list`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventVideosById: build.query<VideoItem[], string>({
			query: (eventId) => ({
				url: `videos`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getEventProgramById: build.query<ProgramDay[], string>({
			query: (eventId) => ({
				url: `events/program`,
				params: {
					id_event: eventId,
				},
			}),
		}),
		getSubEventProgramById: build.query<SubEventResponse, string>({
			query: (subEventId) => ({
				url: `sub_events/${subEventId}`,
			}),
		}),
		getFaqById: build.query<EventFaq[], string>({
			query: (idEvent) => ({
				url: `home/faq`,
				params: {
					id_event: idEvent,
				},
			}),
		}),
		getContacts: build.query<ContactsInfo, string>({
			query: () => ({
				url: `contacts/getinfo`,
			}),
		}),
		getSettingsSite: build.query<SiteSettings, null>({
			query: () => ({
				url: `settings/getinfo`,
			}),
		}),
	}),
})

export const {
	useGetEventsMonthsQuery,
	useGetEventsFiltrationQuery,
	useGetEventByIdQuery,
	useGetEventAwardsByIdQuery,
	useGetEventNewsByIdQuery,
	useGetEventProgramByIdQuery,
	useGetEventVideosByIdQuery,
	useGetSubEventProgramByIdQuery,
	useGetFaqByIdQuery,
	useGetCurrentEventIdQuery,
	useGetContactsQuery,
	useGetSettingsSiteQuery,
} = homeApi
