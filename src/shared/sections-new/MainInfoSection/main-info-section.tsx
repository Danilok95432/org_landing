import orgImg from 'src/assets/img/orgImg.png'
import styles from './index.module.scss'
import { Section } from 'src/shared/ui/Section/section'
import { Container } from 'src/shared/ui/Container/Container'
import cn from 'classnames'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'
import { MainInfoPlaceSVG } from 'src/shared/ui/icons/mainInfoPlaceSVG'
import { type FC, useState } from 'react'
// import { useGetEventByIdQuery } from 'src/features/home/api/home.api'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'
import { useGetContactsQuery } from 'src/features/home/api/home.api'

type MainInfoProps = {
	id: string
	offContMobile?: boolean
}

export const MainInfoSection: FC<MainInfoProps> = ({ id, offContMobile }) => {
	// const { data: eventData } = useGetEventByIdQuery(id, { skip: !id })
	const { data: eventData } = useGetPageHeaderQuery('org')
	const { data } = useGetContactsQuery('')
	const [activeCont, setActiveCont] = useState<boolean>(false)

	return (
		<Section className={cn(styles.mainInfo)}>
			<Container className={cn(styles.cont, { [styles.offContMobile]: offContMobile })}>
				<FlexRow className={styles.mainRow}>
					<div className={styles.imgWrapper}>
						<img
							src={
								eventData?.page?.mainphoto && eventData?.page?.mainphoto.length > 0
									? eventData?.page?.mainphoto[0].original
									: orgImg
							}
							alt='main'
							className={styles.imgMain}
						/>
					</div>
					<FlexRow className={styles.infoRow}>
						<h1 id='event'>{eventData?.page?.title}</h1>
						<FlexRow className={styles.additionalInfoRow}>
							<FlexRow className={cn(styles.rowEl, styles.noMargin, styles.locationEl)}>
								<MainInfoPlaceSVG />
								<a href='#'>{eventData?.page?.text2}</a>
							</FlexRow>
							<p>{data?.fullName}</p>
						</FlexRow>
						<FlexRow className={styles.infoRow}>
							<div className={styles.textCont}>
								<p className={cn(styles.text, { [styles.activeText]: activeCont })}>
									{eventData?.page?.short && (
										<div
											dangerouslySetInnerHTML={{
												__html: eventData?.page?.short,
											}}
										/>
									)}
								</p>
								<button
									className={cn(styles.openContBtn, { [styles.active]: activeCont })}
									onClick={() => setActiveCont(!activeCont)}
								>
									{activeCont ? 'Свернуть' : 'Развернуть'}
								</button>
							</div>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</Section>
	)
}
