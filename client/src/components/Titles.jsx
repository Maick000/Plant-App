export function Titles({children, ...props}) {
  return (
    <h1 className='text-lime-950 text-lg md:text-xl font-semibold'
    {...props}>
        {children}
    </h1>
  )
}
