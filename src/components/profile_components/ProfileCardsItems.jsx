import { useRouter } from 'next/navigation';
import { MdArrowForward } from 'react-icons/md';

const ProfileCardsItems = ({icon=<></>, title="", href=""}) => {
  const router = useRouter()
  return (
    <div className='flex justify-between items-center px-2 py-3'>
      <p className='flex justify-start items-center gap-2'>
        <span>{icon}</span>
        <span className='text-base text-(--text-primary) font-normal'>{title}</span>
      </p>
      <button onClick={()=>router.push(href)} className='p-3 h-full text-xl text-(--text-primary) font-semibold'>
        <MdArrowForward />
      </button>
    </div>
  )
}

export default ProfileCardsItems