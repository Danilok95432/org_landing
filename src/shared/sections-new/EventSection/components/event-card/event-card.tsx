import { type FC } from 'react'

import cn from 'classnames'
import { Link } from 'react-router-dom'

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
	date,
	status,
	mainphoto,
	description,
	className,
}) => {
	return (
		<Link to={`/`} aria-label='Переход на страницу события' title={title}>
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
					{description && <p className={styles.eventDesc}>{description}</p>}
				</figcaption>
			</figure>
		</Link>
	)
}
