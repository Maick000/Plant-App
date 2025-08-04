export function Text({children, ...props}) {
  return (
    <p className='text-xs md:text-sm text-gray-500 text-center'
    {...props}>
        {children}
    </p>
  )
}

export function TextForm({children, ...props}){
  return(
    <h1 className='text-3xl font-bold text-lime-950 tracking-tight'
    {...props}>
      {children}
    </h1>
  )
}