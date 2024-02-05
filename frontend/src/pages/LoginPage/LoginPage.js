import React from 'react'
import style from './LoginPage.module.scss'
import LoginForm from '../../components/login_form/LoginForm.js'
import axios from 'axios'
import logo from '../../assets/icons/app_logo.png'
const LoginPage = () => {
  const [serverUp,setServerUp] = React.useState(false)
  React.useEffect(() => {
    const host = process.env.REACT_APP_BACKEND
    const checkServer = async () => {
      try {
        const response = await axios.get(host + '/')
        if (response.status === 200) {
          setServerUp(true)
        }
      } catch (error) {
        setServerUp(false)
        setTimeout(checkServer, 1000) 
      }
    }

    checkServer()
  }, [])

  return (
    <div className={style.Holder}>
      
      {serverUp===false && <div className={style.Loader}>
        <div className={style.LoadGroup}>
          <div className={style.Backdrop}/>
          <div className={style.DotGroup}>
          <div className={style.Dot}/>
          <div className={style.Dot}/>
          <div className={style.Dot}/>
          </div>
          <h3>Hang tight, waking up backend server</h3>
          <h3>(~2 minutes)</h3>
        </div>
      </div>}
        <LoginForm />
        <img className={style.Backdrop} src="https://images.unsplash.com/photo-1536147116438-62679a5e01f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    </div>
  )
}

export default LoginPage