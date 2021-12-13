import {env} from '../../../next.config'
import Link  from 'next/link'

export default function EventList({ events }) {
    
   return (
    <div className="mx-auto container">
        <div className="title mt-10 ml-10 text-red-400 text-4xl font-bold">Các sự kiện sắp diễn ra </div>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 px-10 py-10 eventListUser">
            { events.map((event) => {
                console.log(event)
                const startDate = new Date(event.start_date) 
                const endDate = new Date(event.start_date)
                endDate.setDate(startDate.getDate() + event.duration - 1)
                return ( 
                    <Link href={`/event/${event._id}/donate-booking`} className="cursor-pointer" >
                        <div class="max-w-md h-full mx-auto bg-white  shadow-md overflow-hidden md:max-w-2xl">
                            <div class="md:flex flex-col">
                            <div class="flex-shrink-0">
                                <img
                                class=" w-full object-cover h-full"
                                src={event?.organization_id?.img_path ? `${env.API_URL}/getFile?img_path=${event?.organization_id?.img_path}` : '../images/slider-1.jpg'}
                                alt="Man looking at item at a store"
                                />
                            </div>
                            <div class="p-8">
                                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                {''}
                                </div>
                                <p
                                    class="block mt-1 text-3xl leading-tight font-medium font-Dosis text-black"
                                >
                                    {event.name}
                                </p>    
                                <p class="mt-2 font-Dosis text-gray-500 xl:text-xl lg:text-2xl md:text-base text-base h-auto ">
                                {event.address}
                                </p>
                                <p class="mt-2 font-Dosis text-red-500	 xl:text-xl lg:text-2xl md:text-base text-base h-auto ">
                                {startDate.toLocaleDateString('pt-PT')}&nbsp;
                                    &#8594;&nbsp;{endDate.toLocaleDateString('pt-PT')}
                                </p>
                                <p class="mt-2 font-Dosis text-gray-500	 xl:text-xl lg:text-2xl md:text-base text-base h-auto ">
                                {event?.organization_id?.name}
                                </p>
                            </div>
                            </div>
                        </div>
                    </Link>
                )
            }) }
                            
        </div>
    </div>
   )
}