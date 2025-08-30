import { type ComponentProps, type FC } from 'react'

const Button: FC<ComponentProps<'button'>> = (props) => {
  return (
    <button
      className={`w-fit bg-[#1671D9] text-white px-4 py-1 rounded-lg ${props.className}`}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Button
