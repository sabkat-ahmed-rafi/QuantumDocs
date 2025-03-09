import { MdLockOutline } from "react-icons/md";


const IsRestricted = ({handleIsRestricted, document, isDisabled}) => {


  return (
    <>
     <div className={`flex justify-between items-center py-2 rounded-md ${isDisabled && 'pointer-events-none opacity-50 select-none'}`}>     
      <section className='flex justify-between items-center space-x-2'>
       <p className='bg-slate-100 p-2 rounded-full animate-pulse'>
          <MdLockOutline  className='text-lg' />
       </p>
       <div className='flex-col'>
        <select 
        className='hover:bg-slate-100 transition-all p-2 rounded-md focus:outline-none cursor-pointer' 
        value={document?.document?.accessStatus?.isRestricted ? 'Restricted': 'Anyone with the link'} 
        onChange={handleIsRestricted}
        >
         <option className='bg-white py-2' value="Restricted">Restricted</option>
         <option className='bg-white' value="Anyone with the link">Anyone with the link</option>
        </select>
        <p className='text-[12px] ml-3 text-slate-500 font-sans'>
            Only people with access can open with the link
        </p>
       </div>
      </section>        
     </div> 
    </>
  )
}

export default IsRestricted