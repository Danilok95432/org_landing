import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'

import styles from './index.module.scss'
import { useGetPageHeaderQuery } from 'src/features/pages-header/api/pages-header.api'

export const AboutPlacement: FC = () => {
	const { data: aboutPageData } = useGetPageHeaderQuery('about')
	return (
		<div className={styles.aboutGeneralPage}>
			<Helmet>
				<title>Об атманках</title>
			</Helmet>

			<div className={styles.inner}>
				<h2>История</h2>
				{aboutPageData?.page.history && (
					<div
						className={styles.mainDescs}
						dangerouslySetInnerHTML={{ __html: aboutPageData.page.history }}
					/>
				)}
			</div>
		</div>
	)
}
