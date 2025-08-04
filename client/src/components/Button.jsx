import { Link } from "react-router"

export function Button({children, className="", ...props}) {
  const baseStyles = "transition-colors duration-200"
  return (
    <Link className={`${baseStyles} font-bold text-lime-800 whitespace-nowrap p-2 bg-lime-500 rounded-xl mt-3 hover:to-lime-600 text-sm md:text-base ${className}`}
           {...props}>
        {children}
    </Link>
  )
}

export function ButtonForm({children, ...props}){
  return(
    <button className="w-full p-2 bg-lime-500 rounded-xl mt-3 hover:to-lime-600 text-sm md:text-base"
           {...props}>
      {children}
    </button>
  )
}

export function ButtonAuthForm({children, ...props}) {
  return (
    <button className='w-full p-2 text-slate-200 font-bold bg-lime-900 rounded-xl mt-3 hover:to-lime-900 text-sm md:text-base'
        {...props}    
    >
      {children}
    </button>
  )
}