import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './Components/Login/LoginPage'
import { checkAuth, actions } from './redux/authorizationReducer';
import { AppDispatch } from './redux/redux'
import { routes } from './config';
import RegistrationPage from './Components/Registration/Registartion';
import SearchPage from './Components/Search/SearchPage';
import MyProfile from './Components/MyProfile/MyProfile';
import authSelectors from './selectors/auth'
import PreloaderPage from './Components/PreloaderPage/PreloaderPage';
import ChatsPage from './Components/ChatsPage/ChatsPage'
import Chats from './Components/ChatsPage/Chats/Chats';
import MessagesPage from './Components/ChatsPage/Messages/Messages';
import UserProfile from './Components/UserProfile/UserProfile';
import StartChat from './Components/StartChat/StartChat';
import { Layout } from 'antd'
import MySider from './Components/Sider/Sider';
import MyFooter from './Components/Footer/Footer';
import './App.css'
import MyHeader from './Components/Header/Header';

const { Content } = Layout;


function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('unhandledrejection', (e) => console.log(e))
    return window.removeEventListener('unhandledrejection', (e) => console.log(e))
  }, [])

  useEffect(() => {
    dispatch(checkAuth())
    return () => {
      dispatch(actions.setInitialState())
    }
  }, [dispatch])

  const [collapsed, setCollapsed] = useState(window.innerWidth < 800)

  if (useSelector(authSelectors.isGettingData)) return <PreloaderPage fullPage/>

  return (
    <BrowserRouter>
      <Layout 
        className={'siteLayout'}
      >
        <MyHeader 
          collapsed = {collapsed}
          setCollapsed = {setCollapsed}
        />
        <Layout
          className={'contentLayout'}
        >
          <MySider 
            collapsed = {collapsed}
          />
          <Content>
            <Routes>
              <Route path={routes['chats']} element={<ChatsPage />}>
                <Route index element={<Chats />} />
                <Route path={`:chatId`} element={<MessagesPage />} />
              </Route>
              <Route path={`${routes['profile']}:id`} element={<UserProfile />} />
              <Route path={routes['login']} element={<LoginPage />} />
              <Route path={routes['myProfile']} element={<MyProfile />} />
              <Route path={routes['registration']} element={<RegistrationPage />} />
              <Route path={routes['search']} element={<SearchPage />} />
              <Route path={`${routes['startChat']}/:companionId`} element={<StartChat />} />
            </Routes>
          </Content>
        </Layout>
        <MyFooter />
      </Layout>
    </BrowserRouter>

  );
}
export default App
