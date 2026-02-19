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
import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { type PartnerLinksType } from 'src/types/event'

export const PartnersPage = () => {
	const { data: eventData } = useGetEventByIdQuery('1')
	const breakpoint = useBreakPoint()

	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10 // Количество элементов на странице

	// Вычисляем данные для пагинации
	const paginationData = useMemo(() => {
		const totalItems = eventData?.partnerLinks.length ?? 0
		const totalPages = Math.ceil(totalItems / itemsPerPage)

		// Получаем элементы для текущей страницы
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		const currentItems = eventData?.partnerLinks.slice(startIndex, endIndex) ?? []

		return {
			totalItems,
			totalPages,
			currentItems,
			startIndex: startIndex + 1,
			endIndex: Math.min(endIndex, totalItems),
		}
	}, [eventData?.partnerLinks, currentPage, itemsPerPage])

	// Обработчик изменения страницы
	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		// Прокручиваем к началу списка
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	// Функция для рендеринга элемента в зависимости от типа
	const renderItem = (item: PartnerLinksType) => {
		return (
			<FlexRow className={styles.partnerCard} key={item.id}>
				{item.link && item.link !== '' ? (
					<a href={item.link} className={styles.partnersLink} key={item.id}>
						<img
							src={item.mainphotoPLL?.[0]?.thumbnail}
							alt='partner'
							width={188}
							height={105}
							loading='lazy'
						/>
						<p>{item.title}</p>
					</a>
				) : (
					<div className={styles.partnersLink} key={item.id}>
						<img
							src={item.mainphotoPLL?.[0]?.thumbnail}
							alt='partner'
							width={188}
							height={105}
							loading='lazy'
						/>
						<p>{item.title}</p>
					</div>
				)}
			</FlexRow>
		)
	}

	return (
		<>
			<Helmet>
				<title>Партнеры</title>
			</Helmet>
			<Section className={styles.partnersListPage}>
				<Container className={styles.partnersContainer}>
					<Link to={'/'} className={styles.linkBack}>
						Назад на главную
					</Link>
					<FlexRow className={styles.titleRow}>
						<h2 className={styles.title}>{'Партнеры'}</h2>
					</FlexRow>

					{paginationData?.currentItems.length > 0 ? (
						breakpoint === 'S' ? (
							<MobileList
								items={eventData?.partnerLinks ?? []}
								renderItem={renderItem}
								classListItems={styles.partnersList}
								defaultVisibleCount={5}
							/>
						) : (
							<>
								<div className={styles.partnersList}>
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
						<p className={styles.partnersAbsence}>{'Список пуст'}</p>
					)}
				</Container>
			</Section>
		</>
	)
}
