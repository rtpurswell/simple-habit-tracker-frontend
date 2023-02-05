import './App.css'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'

const store = configureStore()

function App() {
  Modal.setAppElement('#root')
  return (
    <Provider store={store}>
      <Layout>
        <ToastContainer position="bottom-center" />
      </Layout>
    </Provider>
  )
}

export default App
