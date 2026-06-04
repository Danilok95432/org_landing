import { Outlet } from 'react-router-dom'
import { Footer } from 'src/shared/ui/Footer/Footer'
import { Header } from 'src/shared/ui/Header/Header'
import { MainNavigation } from 'src/widgets/main-navigation/main-navigation'

export const AppLayout = () => {
	return (
		<>
			<Header />
			<MainNavigation />
			<Outlet />
			<Footer />
		</>
	)
}
