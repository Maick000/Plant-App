export function Form({children, ...props}) {
  return (
    <form className='flex flex-col gap-4'
    {...props}>
        {children}
    </form>
  )
}

export function PlantForm({children, ...props}){
  return(
    <form className="space-y-5" 
    {...props}
    >
      {children}
    </form>
  )
}