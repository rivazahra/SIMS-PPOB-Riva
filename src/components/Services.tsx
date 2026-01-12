import type { JSX } from "react";
import { useServices } from "../services/useServices";
import { useDispatch } from "react-redux";
import type { ServiceData } from "../types/services.types";
import { setSelectedService } from "../store/slice/ServiceSlice";
import { Link } from "react-router";
import Skeleton from "./Skeleton";

const Services = (): JSX.Element => {
    const { data } = useServices()
    const dispatch = useDispatch()

    const handleClick = (service: ServiceData) => {
        dispatch(setSelectedService(service))
    }
    return (
        <section className='flex   flex-wrap md:flex-nowrap justify-start md:justify-between  w-full  no-scrollbar'>
            {data? data?.map((service, index) => (
                <Link to={`service/${service.service_code}`}
                    key={index}
                    onClick={() => handleClick(service)}
                    className='md:w-20 gap-1  items-center flex flex-col cursor-pointer shrink-0 transition-all duration-300 '>
                    <section className='h-12 lg:h-14 w-12 lg:w-14 hover:-translate-y-0.5 transition-all ease-in-out  hover:bg-gray-50 hover:shadow-lg  duration-200 rounded-lg '>
                        <img
                            src={service.service_icon}
                            alt={`${service.service_code}-icon`}
                            className='w-full h-full object-cover object-center'
                        />
                    </section>
                    <p className='hidden md:block text-center text-[10px] md:text-xs text-gray-500 font-medium'>
                        {service.service_name}
                    </p>
                </Link>
            )) : [...Array(12)].map((_, index) => (
            <li key={index} className="flex justify-center">
              <div className="flex w-[70px] flex-col items-center gap-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="aspect-square h-4 w-12" />
              </div>
            </li>
          ))}
        </section>


    )
}

export default Services;