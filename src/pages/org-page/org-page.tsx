import { MainInfoSection } from 'src/shared/sections-new/MainInfoSection/main-info-section'
import { Container } from 'src/shared/ui/Container/Container'
import { Section } from 'src/shared/ui/Section/section'

import styles from './index.module.scss'
import { GallerySection } from 'src/shared/sections-new/GallerySection/gallery-section'
import { Link } from 'react-router-dom'
import { useGetContactsQuery } from 'src/features/home/api/home.api'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'
import { FlexRow } from 'src/shared/ui/FlexRow/FlexRow'

export const OrgPage = () => {
	const { data: eventData } = useGetPageHeaderQuery('org')
	const { data } = useGetContactsQuery('')
	return (
		<Section className={styles.orgPage}>
			<Container className={styles.cont}>
				<Container className={styles.innerCont}>
					<Link to={'/'} className={styles.linkBack}>
						Назад на главную
					</Link>
					<MainInfoSection id={'1'} offContMobile />
				</Container>
				<GallerySection orgPage />
				<Container className={styles.innerCont}>
					<p className={styles.text}>
						{eventData?.page?.full && (
							<div
								dangerouslySetInnerHTML={{
									__html: eventData?.page?.full,
								}}
							/>
						)}
					</p>
					<div className={styles.inner}>
						<h2>Реквизиты организатора</h2>
						<FlexRow className={styles.creditsList}>
							{data?.fullName && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>Полное название</p>
									<p className={styles.credit}>{data?.fullName}</p>
								</FlexRow>
							)}
							{data?.bank && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>Банк</p>
									<p className={styles.credit}>{data?.bank}</p>
								</FlexRow>
							)}
							{data?.bik && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>БИК</p>
									<p className={styles.credit}>{data?.bik}</p>
								</FlexRow>
							)}
							{data?.fioDir && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>ФИО руководителя</p>
									<p className={styles.credit}>{data?.fioDir}</p>
								</FlexRow>
							)}
							{data?.inn && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>ИНН</p>
									<p className={styles.credit}>{data?.inn}</p>
								</FlexRow>
							)}
							{data?.korChet && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>Кор. счет</p>
									<p className={styles.credit}>{data?.korChet}</p>
								</FlexRow>
							)}
							{data?.kpp && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>КПП</p>
									<p className={styles.credit}>{data?.kpp}</p>
								</FlexRow>
							)}
							{data?.ogrn && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>ОГРН</p>
									<p className={styles.credit}>{data?.ogrn}</p>
								</FlexRow>
							)}
							{data?.phone && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>Телефон</p>
									<p className={styles.credit}>{data?.phone}</p>
								</FlexRow>
							)}
							{data?.rasChet && (
								<FlexRow className={styles.creditItem}>
									<p className={styles.title}>Расчетный счет</p>
									<p className={styles.credit}>{data?.rasChet}</p>
								</FlexRow>
							)}
						</FlexRow>
					</div>
				</Container>
			</Container>
		</Section>
	)
}
