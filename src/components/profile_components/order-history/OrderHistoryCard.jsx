import { useRouter } from 'next/router';
import Button from './../../reusable_components/Buttons';


const OrderHistoryCard = ({ imageUrl, name, price, quantity, dateAdded, orderId }) => {
    const router = useRouter()
  const timeStamp = new Date(dateAdded);
  const months = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "June", "July", "Aug",
    "Sep", "Oct", "Nov", "Dec",
  ];
  return (
    <>
      <div className='px-2 py-3 space-y-3 bg-(--text-secondary-light) w-full'>
        <div className='flex gap-2 items-center justify-between'>
            <div className='w-8 h-8 rounded-md'>
                <img className='object-cover' src={imageUrl} alt={`${name} image`} />
            </div>
          <p className='w-full flex flex-col items-start justify-center text-lg text-(--text-primary) font-normal'>
            <span>{name}</span>
            <span>#{price}</span>
          </p>
          <span className='text-base text-(--text-primary-light) font-normal'>Qty: {quantity}pcs</span>
        </div>
        <p className='flex items-center justify-between text-sm'>
          <span className='text-(--main-secondary-light) font-medium'>Delivered on</span>{" "}
          <span className='text-(--text-primary) font-normal'>{`${timeStamp.getDay()} ${
            months[timeStamp.getMonth()]
          }. ${timeStamp.getHours()}:${timeStamp
            .getMinutes()
            .toString()
            .padStart(2, "0")}${timeStamp.getHours() > 13 ? "PM" : "AM"}`}</span>
        </p>
        <div className='grid grid-cols-2 gap-2 items-center'>
            <Button buttonFn={()=>router.push(`userId/orders/${orderId}`)} type='tertiary' width='100%'>Details</Button>
            <Button width='100%'>Leave review</Button>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryCard;
