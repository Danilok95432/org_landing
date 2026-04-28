import { type FC } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'
import { EventStatus } from '../event-status/event-status'
import { type CardEventItem } from 'src/types/event'
import { getDayOfWeek, mainFormatDate, parseTimeFromDate } from 'src/shared/helpers/utils'

type EventItemProps = {
	className?: string
} & CardEventItem

export const EventCard: FC<EventItemProps> = ({
	id,
	category: { title: catTitle },
	brand: { title: brandTitle },
	location: { title: locTitle, address },
	title,
	siteurl,
	date,
	status,
	mainphoto,
	description,
	className,
}) => {
	const formatUrl = (url: string) => {
		if (!url) return '/'
		url = url.trim()
		if (url.startsWith('http://') || url.startsWith('https://')) {
			return url
		}
		if (url.startsWith('www.')) {
			return `https://${url}`
		}
		if (url.includes('.') && !url.includes(' ')) {
			return `https://${url}`
		}
		return url
	}
	return (
		<a
			href={formatUrl(siteurl)}
			aria-label='Переход на страницу события'
			title={title}
			target='_blank'
			rel='noopener noreferrer'
		>
			<figure className={cn(styles.eventItem, className)}>
				<div className='event-item-img'>
					<img src={mainphoto[0]?.original} alt={title} width={415} height={256} loading='lazy' />
					<span>{brandTitle}</span>
				</div>
				<figcaption className={cn(styles.eventContent, 'event-card-content')}>
					<h3 className={styles.eventTitle}>{title}</h3>
					<EventStatus className={styles.status} statusCode={status} />
					<p className={styles.eventDate}>
						{date ? `${mainFormatDate(date)}, ${getDayOfWeek(date)}` : 'Нет даты'}
					</p>
					<p className={styles.eventTime}>
						{date ? `Начало в ${parseTimeFromDate(date)}` : 'Нет информации о времени начала'}
					</p>
					<p className={styles.eventLocations}>
						<span>
							{locTitle}
							<br />
							{address}
						</span>
					</p>
					{description && (
						<div className={styles.eventDesc} dangerouslySetInnerHTML={{ __html: description }} />
					)}
				</figcaption>
			</figure>
		</a>
	)
}
