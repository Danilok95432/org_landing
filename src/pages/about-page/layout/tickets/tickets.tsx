import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'

export const AboutTickets: FC = () => {
	const { data: aboutPageData } = useGetPageHeaderQuery('about')
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>Об атманках</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>{aboutPageData?.page?.p_title3}</h2>
				{aboutPageData?.page?.p_text3 && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.page.p_text3 }}
					/>
				)}
			</div>
		</div>
	)
}
