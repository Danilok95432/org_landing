import cn from 'classnames'
import { type FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'
import { type HeroCardItem } from 'src/types/heroes'

type NewsCardProps = {
	className?: string
	mainStatus?: boolean
	titleLink?: boolean
	noShadow?: boolean
} & HeroCardItem

export const HeroCard: FC<NewsCardProps> = ({
	id,
	mainphoto,
	title,
	desc,
	className,
	titleLink = false,
	noShadow = false,
}) => {
	return (
		<Link
			className={cn(
				styles.newsItem,
				{ [styles.contentItem]: titleLink },
				{ [styles.noShadow]: noShadow },
			)}
			to={`/`}
			aria-label={title}
			title={title}
		>
			<figure>
				<div className={cn(styles.newsImgWrapper, { [styles.radius]: noShadow })}>
					<img src={mainphoto[0]?.original} alt={title} width={286} height={160} loading='lazy' />
				</div>
				<figcaption className={styles.newsItemContent}>
					<h4 className={cn(styles.newsItemTitle, { [styles.linkTitle]: titleLink })}>{title}</h4>
					<p className={styles.newsDate}>{desc}</p>
				</figcaption>
			</figure>
		</Link>
	)
}
