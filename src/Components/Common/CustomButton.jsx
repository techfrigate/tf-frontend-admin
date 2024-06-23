import React from 'react'

const CustomButton = ({type,text,onclick,width}) => {
  return (
    <button
    type={type}
    className={`px-4 pb-1  pt-[2px] text-[16px] bg-[#64C6B0] text-white hover:bg-[#56a897]  transition duration-300 ease-in-out rounded ${width?width:""}`}
    onClick={onclick}
  >
   {text}
  </button>
  )
}

export default CustomButton