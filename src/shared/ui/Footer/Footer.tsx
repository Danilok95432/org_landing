import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { VkSocialSvg } from '../icons/vkSocialSVG'
import { useGetSettingsSiteQuery } from 'src/features/home/api/home.api'
import { MaxSocialSvg } from '../icons/maxSocialSVG'

export const Footer = () => {
	const { data } = useGetSettingsSiteQuery(null)
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerCont}>
					<FlexRow className={styles.topRow}>
						<p>{data?.fullname}</p>
						<FlexRow className={styles.socialsRow}>
							<a href={data?.vk ?? ''}>
								<FlexRow className={styles.socialEl}>
									<VkSocialSvg />
								</FlexRow>
							</a>
							{/* <a href=''>
									<FlexRow className={styles.socialEl}>
										<TelegramSocialSvg />
									</FlexRow>
								</a> */}
							<a href={data?.rutube ?? ''}>
								<FlexRow className={styles.socialEl}>
									<MaxSocialSvg />
								</FlexRow>
							</a>
						</FlexRow>
					</FlexRow>
					<FlexRow className={styles.bottomRow}>
						<FlexRow className={styles.contactsRow}>
							<p>Контакты</p>
							<FlexRow className={styles.infoRow}>
								{data?.phone && (
									<FlexRow className={styles.infoEl}>
										<p>{data?.phone ?? '8 (999) 999-99-99'}</p>
									</FlexRow>
								)}
								{data?.address && (
									<FlexRow className={styles.infoEl}>
										<p>{data?.address ?? '392003, г. Тамбов, б-р Энтузиастов, д. 2А, этаж 4'}</p>
									</FlexRow>
								)}
								{data?.email && (
									<FlexRow className={styles.infoEl}>
										<p>{data?.email ?? 'npotau@npotau.ru'}</p>
									</FlexRow>
								)}
							</FlexRow>
						</FlexRow>
						<FlexRow className={styles.contactsRow}>
							<p>Документы</p>
							<FlexRow className={styles.infoRow}>
								<FlexRow className={styles.infoEl}>
									<a href='https://t6simpleapi.npotau.ru/uploads/maindocs/politics.pdf' download>
										{'Политика конфиденциальности'}
									</a>
								</FlexRow>
								<FlexRow className={styles.infoEl}>
									<a href='https://t6simpleapi.npotau.ru/uploads/maindocs/personal.pdf' download>
										{'Согласие на обработку персональных данных'}
									</a>
								</FlexRow>
								<FlexRow className={styles.infoEl}>
									<a href='https://t6simpleapi.npotau.ru/uploads/maindocs/user.pdf' download>
										{'Пользовательское соглашение'}
									</a>
								</FlexRow>
							</FlexRow>
						</FlexRow>
						<FlexRow className={styles.bottomInfo}>
							<FlexRow className={styles.developer}>
								<p>Разработано в ООО «НПО «ТАУ»</p>
							</FlexRow>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
