import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export function Input(props) {
  return (
    <input
      className="w-full px-4 py-3 bg-lime-300 text-lime-900 placeholder-lime-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 border border-zinc-600"
      {...props}
    />
  );
}

export function TextArea(props){
  return(
    <textarea
              className="w-full px-4 py-3 bg-lime-300 text-lime-900 placeholder-lime-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 border border-zinc-600"
      {...props}
    />
  )
}

export function InputAuth(props) {
  return (
    <input
      className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-slate-500 placeholder-gray-400"
      {...props}
    />
  );
}

export function PasswordInput(props){
  return(
    <FaRegEye className='text-lime-800 absolute right-3 cursor-pointer' 
    {...props}
    />
  )
}

export function PasswordViewInput(props){
  return(
    <FaRegEyeSlash className='text-lime-800 absolute right-3 cursor-pointer'  
    {...props}
    />
  )
}