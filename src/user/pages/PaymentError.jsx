import React from 'react'
import { Link } from 'react-router'

function PaymentError() {
    return (
        <div className='container my-10'>

            <div className='md:grid grid-cols-2 px-2 justify-center items-center flex-col'>

                <div>
                    <h1 className='md:text-4xl text-blue-800'>OOOPS SOMTHING WENT WRONG.............</h1>
                    <p className='text-2xl my-4'>Sorry payment failed</p>
                    <Link to={'/allbooks'}><button className='bg-blue-900 text-white px-4 py-3 my-5 hover:bg-white hover:border hove:border-blue-800 hover:text-blue-900'>Back</button></Link>
                </div>


                <div className='flex justify-center items-center'>

                    <img src="https://media.tenor.com/Q4b2T6umZyoAAAAM/fail-badtestscore.gif" alt="" />
                </div>

            </div>

        </div>
    )
}

export default PaymentError