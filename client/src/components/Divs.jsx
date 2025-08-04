export function DivInput({ children, ...props }) {
  return (
    <div
      className="relative w-full flex items-center bg-lime-50 p-2 rounded-xl"
      {...props}
    >
      {children}
    </div>
  );
}

export function DivInputContainer({ children }) {
  return <div className="w-full flex flex-col gap-4">{children}</div>;
}

export function DivContainer({ children }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-teal-50">
        {children}
      </div>
  );
}

export function DivContainerForm({children}){
    return(
        <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-lime-200 flex flex-col items-center gap-4 rounded-xl shadow-green-700 shadow-lg">
            {children}
        </div>
    )
}

export function PlantFormContainer({ children }) {
  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center bg-lime-50">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-lime-200 flex flex-col items-center gap-4 rounded-xl shadow-lime-900 shadow-lg">
            {children}
        </div>
      </div>
  );
}

export function TextError({children, ...props}){
    return(
        <div
            className="mb-4 p-3 bg-red-900/30 text-red-400 text-sm rounded-lg border border-red-800"
            {...props}
          >
            {children}
          </div>
    )
}

export function ContainerFormProfile({children, ...props}){
    return(
        <div className="text-center space-y-1"
        {...props}>
            {children}
        </div>
    )
}

export function DivContainerLogo({children}){
    return(
        <div className="flex items-center justify-center gap-2">
            {children}
        </div>
    )
}