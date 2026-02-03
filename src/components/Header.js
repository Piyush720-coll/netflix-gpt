import React from 'react'

const Header = () => {
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black to-transparent w-full flex items-center'>
        <img 
            src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' 
            alt='Netflix Logo' 
            style={{width: '120px', height: '60px'}} 
        />
    </div>
  )
}

export default Header;