import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { useBreakPoint } from 'src/features/useBreakPoint/useBreakPoint'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'
import { MobileList } from 'src/widgets/mobile-list/mobile-list'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { Pagination } from 'src/widgets/pagination/pagination'
import {
	useGetEventsFiltrationQuery,
	useGetEventsMonthsQuery,
} from 'src/features/home/api/home.api'
import { type CardEventItem } from 'src/types/event'
import { EventCard } from 'src/shared/sections-new/EventSection/components/event-card/event-card'
import { MonthsFilterSlider } from 'src/widgets/month-filter-slider/month-filter-slider'

export const EventsPage = () => {
	const [activeMonth, setActiveMonth] = useState('0')
	const { data: eventsFiltrationInfo } = useGetEventsFiltrationQuery(null)
	const { data: eventData } = useGetEventsMonthsQuery({
		date: activeMonth,
		category: '',
	})
	const breakpoint = useBreakPoint()

	const handleChangeActiveMonth = (newMonth: string) => {
		setActiveMonth(newMonth)
	}

	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 8 // Количество элементов на странице

	// Вычисляем данные для пагинации
	const paginationData = useMemo(() => {
		const totalItems = eventData?.length ?? 0
		const totalPages = Math.ceil(totalItems / itemsPerPage)

		// Получаем элементы для текущей страницы
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		const currentItems = eventData?.slice(startIndex, endIndex) ?? []

		return {
			totalItems,
			totalPages,
			currentItems,
			startIndex: startIndex + 1,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [eventData, currentPage, itemsPerPage])

	// Обработчик изменения страницы
	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		// Прокручиваем к началу списка
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// Функция для рендеринга элемента в зависимости от типа
	const renderItem = (item: CardEventItem) => {
		return <EventCard key={item.id} className={styles.homeEventCard} {...item} />
	}

	return (
		<>
			<Helmet>
				<title>События</title>
			</Helmet>
			<Section className={styles.eventListPage}>
				<Container className={styles.eventContainer}>
					<Link to={'/'} className={styles.linkBack}>
						Назад на главную
					</Link>
					<FlexRow className={styles.titleRow}>
						<h2 className={styles.title}>{'События'}</h2>
					</FlexRow>
					<MonthsFilterSlider
						monthsList={eventsFiltrationInfo?.months ?? []}
						changeActiveMonth={handleChangeActiveMonth}
						activeMonth={activeMonth}
						allMonthTitle='Все события'
					/>
					{paginationData?.currentItems.length > 0 ? (
						breakpoint === 'S' ? (
							<MobileList
								items={eventData ?? []}
								renderItem={renderItem}
								classListItems={styles.eventList}
								defaultVisibleCount={2}
							/>
						) : (
							<>
								<div className={styles.eventList}>
									{paginationData.currentItems.map((item) => renderItem(item))}
								</div>
								{paginationData.totalPages > 1 && (
									<Pagination
										currentPage={currentPage}
										totalPages={paginationData.totalPages}
										onPageChange={handlePageChange}
										className={styles.pagination}
									/>
								)}
							</>
						)
					) : (
						<p className={styles.eventAbsence}>{'Список пуст'}</p>
					)}
				</Container>
			</Section>
		</>
	)
}
