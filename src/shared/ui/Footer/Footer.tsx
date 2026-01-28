import { Container } from '../Container/Container'
import { FlexRow } from '../FlexRow/FlexRow'
import styles from './index.module.scss'
import { VkSocialSvg } from '../icons/vkSocialSVG'
import { TelegramSocialSvg } from '../icons/telegramSocialSVG'
import { RutubeSocialSvg } from '../icons/rutubeSocialSVG'

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<FlexRow className={styles.footerCont}>
					<FlexRow className={styles.topRow}>
						<p>{'РОО «ТОЛК»'}</p>
					</FlexRow>
					<FlexRow className={styles.bottomRow}>
						<FlexRow className={styles.contactsRow}>
							<FlexRow className={styles.infoRow}>
								<FlexRow className={styles.infoEl}>
									<p className={styles.title}>Телефон</p>
									<p>{'8 (999) 999-99-99'}</p>
								</FlexRow>
								<FlexRow className={styles.infoEl}>
									<p className={styles.title}>Электронная почта</p>
									<p>{'npotau@npotau.ru'}</p>
								</FlexRow>
								<FlexRow className={styles.infoEl}>
									<p className={styles.title}>Адрес</p>
									<p>{'392003, г. Тамбов, б-р Энтузиастов, д. 2А, этаж 4'}</p>
								</FlexRow>
							</FlexRow>
							<FlexRow className={styles.socialsRow}>
								<FlexRow className={styles.socialEl}>
									<VkSocialSvg />
								</FlexRow>
								<FlexRow className={styles.socialEl}>
									<TelegramSocialSvg />
								</FlexRow>
								<FlexRow className={styles.socialEl}>
									<RutubeSocialSvg />
								</FlexRow>
							</FlexRow>
						</FlexRow>
						<FlexRow className={styles.bottomInfo}>
							<FlexRow className={styles.author}>
								<p className={styles.title}>© Федерация этноспорта России, 2026</p>
								<p>
									Cвидетельство о регистрации средства массовой информации Эл № ФС77 - 37229 от 14
									августа 2009 г. Выдано Федеральной службой по надзору в сфере связи,
									информационных технологий и массовых коммуникаций (Роскомнадзор).
								</p>
							</FlexRow>
							<FlexRow className={styles.developer}>
								<p>Разработано и построено в НПО ТАУ. Платформа Т-6.</p>
							</FlexRow>
						</FlexRow>
					</FlexRow>
				</FlexRow>
			</Container>
		</footer>
	)
}
