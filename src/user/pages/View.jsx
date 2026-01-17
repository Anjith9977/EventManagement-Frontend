import React from 'react';
import Header from '../components/Header';
import Footer from '../../components/Footer';
import { Link, useParams } from 'react-router';
import { getAuserEventApi, paymentApi } from '../../services/AllApi';
import { useEffect } from 'react';
import { useState } from 'react';
import {loadStripe} from '@stripe/stripe-js';

function View() {

  const [display,setDisplay]=useState({})
  const {id} = useParams()

  useEffect(() => {
     getAuserEvent()
  }, [])
  

  const getAuserEvent=async()=>{

    const token = sessionStorage.getItem('token')

    const reqHeader = {
      authorization:`bearer ${token}`
    }
      try {

        const result = await getAuserEventApi(id,reqHeader)
        console.log(result);
        setDisplay(result.data)
        
        
      } catch (error) {
        console.log(error)
      }
  }

   const makePayment=async()=>{

    const stripe = await loadStripe('pk_test_51SfBlzKjIs046TNDi8GyN5tJDSLsZDmQWLzoNCDySSSNjVQmcVLBgqmFA0u6dzUN5LADr4u6riT96UA9k8w66msI00ahOzCSNr');

    const token = sessionStorage.getItem('token')

    const reqHeader={
      authorization:`bearer ${token}`
    }

    try {

      const result = await paymentApi(display,reqHeader)
      console.log(result);
      window.location.href = result.data.url
      
    } catch (error) {
       console.log(error)
    }
  }


  
  return (
    <div className="w-full bg-gray-50">

      <Header />

      {/* Main container */}
      <div className="max-w-5xl mx-auto p-6 mt-28">

        {/* Event Image */}
        <div className="w-full h-72 rounded-xl overflow-hidden mb-8 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
          <img
            src={`https://eventmanagement-backend.onrender.com/uploads/${event.image}`}
            className="w-full h-full object-cover"
            alt="Event"
          />
        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="md:col-span-2">

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              {display.eventName}
            </h1>

            {/* Location */}
            <p className="mt-6 text-gray-600">
             {display.location}
            </p>

            {/* Date */}
            <p className="mt-2 text-gray-600">
              {display.startDate}
            </p>

            <hr className="my-8 border-gray-300" />

            {/* Overview */}
            <h2 className="text-xl font-semibold mb-3 text-pink-500">Overview</h2>

            <p className="text-gray-700 leading-relaxed">
            {display.description}
            </p>

            <p className="mt-6 text-gray-700">
              <strong>Category:</strong> {display.category}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="border rounded-xl p-6 shadow-lg bg-white h-fit">
            <p className="text-lg font-bold text-pink-500">Free</p>
            <p className="text-gray-600 text-sm mt-1">
              Jan 16 • 10:00 AM PST
            </p>

            
              <button onClick={makePayment} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg mt-6 font-semibold transition">
                Reserve a Spot
              </button>

          </div>

        </div>
      </div>

      {/* Footer full width */}
      <Footer />

    </div>
  );
}

export default View;
