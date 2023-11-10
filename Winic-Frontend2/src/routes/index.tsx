import { createBrowserRouter } from 'react-router-dom'
import { routesNames } from './routes'
import Home from '../components/Home'
import Layout from '../components/Layout/Layout'
import Upload from '../components/Upload'


const router = createBrowserRouter([
  {
    path: routesNames.init,
    element: < Layout />
  },
  {
    path: routesNames.home,
    element: < Home />
  },
  {
    path: routesNames.upload,
    element: < Upload />
  }
])

export default router
