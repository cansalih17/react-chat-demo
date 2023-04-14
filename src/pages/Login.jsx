import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">30lukteam chat</span>
        <span className="title">Giriş yap</span>s
        <form>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='şifre' />
          <button>Giriş yap</button>
        </form>
        <p>hesabınız yok mu kayıt olun</p>
      </div>
    </div>
  )
}

export default Login
