import { Outlet } from '@tanstack/react-router'
import type { FC } from 'react'

type AuthOutletProps = {
  imgSrc: string
  imgAlt: string
}

const AuthOutlet: FC<AuthOutletProps> = ({ imgSrc, imgAlt }) => {
  return (
    <>
      <section className="md:w-1/2 w-full h-full pt-10">
        <Outlet />
      </section>
      <section className="w-1/2 hidden md:flex flex-col justify-center items-center">
        <img className="w-3/5" alt={imgAlt} src={imgSrc} />
      </section>
    </>
  )
}

export default AuthOutlet
