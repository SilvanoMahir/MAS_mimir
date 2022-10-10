import CardDetailsPage from 'components/pages/CardDetailsPage'
import CardsOverviewPage from 'components/pages/CardsOverviewPage'
import GamePage from 'components/pages/GamePage'
import { NavBar } from 'components/widgets/NavBar'
import { Route, Routes } from 'react-router-dom'

export const ROUTE_GAMEPAGE = '/'
export const ROUTE_CARDSOVERVIEWPAGE = '/cards'
export const ROUTE_APICARDS = '/api/cards'
export const ROUTE_APIGAME = '/api/game'

export const NO_CARDS_SOLVED_COUNT = 0

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path={ROUTE_GAMEPAGE} element={<GamePage />} />
        <Route path={ROUTE_CARDSOVERVIEWPAGE} element={<CardsOverviewPage />} />
        <Route
          path={`${ROUTE_CARDSOVERVIEWPAGE}/:id`}
          element={<CardDetailsPage />}
        />
      </Routes>
    </>
  )
}
