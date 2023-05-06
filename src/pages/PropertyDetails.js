import React from 'react';
// import data
import { housesData } from '../data';
// import use params & link
import { useParams, Link } from 'react-router-dom';
// import-icons
import {BiBed, BiBath, BiArea} from 'react-icons/bi'

const PropertyDetails = () => {
  // get the house id
  const {id} = useParams()
  // get the house based on the id
  const house = housesData.find(house => {
    return house.id === parseInt(id)
  })

  return(
    <section>
      <div className='container mx-auto min-h-[800px] mb-14'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
          <div className=''>
            <h2 className='text-2xl font-semibold'>{house.name}</h2>
            <h3 className='text-lg mb-4'>{house.address}</h3>
          </div>

          <div className='mb-4 lg:mb-0 flex gap-x-2 text-sm'>
            <p className='bg-green-500 text-white px-3 rounded-full'>{house.type}</p>
            <p className='bg-violet-500 text-white px-3 rounded-full'>{house.country}</p>
          </div>

          <p className='text-3xl font-semibold text-violet-600'>{house.price}$</p>
        </div>

        <div className='flex flex-col items-start gap-8 lg:flex-row'>
          <div className='max-w-[768px]'>
            <div className='mb-8'>
              <img src={house.imageLg } alt='Hosue Images'/>
            </div>

            <div className='flex gap-x-6 text-violet-700 mb-6'>
              <div className='flex gap-x-2 items-center'>
                <BiBed className='text-2xl'/>
                <p>{house.bedrooms}</p>
              </div>

              <div className='flex gap-x-2 items-center'>
                <BiBath className='text-2xl'/>
                <p>{house.bathrooms}</p>
              </div>

              <div className='flex gap-x-2 items-center'>
                <BiArea className='text-2xl'/>
                <p>{house.surface}</p>
              </div>
            </div>

            <p>{house.description}</p>
          </div>

          <div className='flex-1 bg-white w-full mb-8 border border-gray-300 rounded-lg px-6 py-8'>
            <div className='flex items-center gap-x-4 mb-8'>
              <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
                <img src={house.agent.image} alt='House Agent Image'/>
              </div>
              <div>
                <p className='font-bold text-lg'>{house.agent.name}</p>
                <Link to='' className='text-violet-700 text-sm'>View Listings</Link>
              </div>
            </div>

            <form className='flex flex-col gap-y-4'>
              <input type='text' placeholder='Name*' className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm'/>
              <input type='email' placeholder='Email*' className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm'/>
              <input type='tel' placeholder='Phone*' className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 h-14 text-sm'/>
              <textarea placeholder='Message*' className='border border-gray-300 focus:border-violet-700 outline-none rounded w-full px-4 py-2 h-36 text-sm'></textarea>
              <div className='flex gap-x-2'>
                <button className='bg-violet-700 hover:bg-violet-800 text-white rounded p-4 text-sm w-full transition'>Send message</button>
                <button className='border border-violet-700 hover:border-violet-500 hover:text-violet-500 rounded p-4 text-sm w-full transition'>Call</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
