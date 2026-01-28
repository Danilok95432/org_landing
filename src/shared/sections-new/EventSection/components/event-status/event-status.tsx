import { type FC } from 'react'

import cn from 'classnames'

import styles from './index.module.scss'
import { EventStatusCancelSVG } from 'src/shared/ui/icons/eventStatusCancelSVG'
import { EventStatusNowSVG } from 'src/shared/ui/icons/eventStatusNowSVG'
import { EventStatusWillBeSVG } from 'src/shared/ui/icons/eventStatusWillBeSVG'
import { EventStatusPassedSVG } from 'src/shared/ui/icons/eventStatusPassedSVG'

type EventStatusProps = {
	statusCode?: 'cancel' | 'current' | 'future' | 'finished'
	className?: string
}

export const EventStatus: FC<EventStatusProps> = ({ statusCode, className }) => {
	switch (statusCode) {
		case 'cancel':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusCancelSVG />
					<p>Отменено</p>
				</div>
			)
		case 'current':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusNowSVG />
					<p>Идет сейчас</p>
				</div>
			)
		case 'future':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusWillBeSVG />
					<p>Предстоит</p>
				</div>
			)
		case 'finished':
			return (
				<div className={cn(styles.eventStatus, className)}>
					<EventStatusPassedSVG />
					<p>Прошло</p>
				</div>
			)
		default:
			return null
	}
}
