import React, { useState, useContext } from 'react'
import { AdminContext } from '../../context/adminContext'
import { GrClose } from 'react-icons/gr'

const UpdateOrder = () => {
    const { setUpdateOrderModal, updateOrder, updateOrderModal } = useContext(AdminContext)
    const [details, setDetails] = useState(updateOrderModal.details)

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(updateOrderModal.id, details)
        await updateOrder(updateOrderModal.id, details)
    }

    return (
        <div className="w-11/12 bg-white mx-auto sm:w-3/4 h-auto p-4 px-4 max-w-5xl rounded border-2">

            <div className="flex w-full justify-between items-center py-2 mb-1 border-b">
                <span className="font-semibold sm:text-2xl text-xl ">Update Order</span>
                <button onClick={() => { setUpdateOrderModal({ state: false, details: {}, id: '' }) }} className='cursor-pointer'><GrClose /></button>
            </div>

            <form action="#" onSubmit={onSubmit}>
                <div className="w-full flex flex-col h-full">
                    <p className="w-full text-left text-lg mb-4">Order Details</p>

                    <div className="flex w-full flex-col sm:flex-row justify-between">
                        <div className="mb-4 w-full sm:mx-2">
                            <label htmlFor="userId" className="leading-7 text-sm text-gray-600">userId</label>
                            <input onChange={onChange} value={details.userId} placeholder='' type="text" id="userId" name="userId" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                        </div>
                        <div className="mb-4 w-full sm:mx-2">
                            <label htmlFor="productId" className="leading-7 text-sm text-gray-600">productId</label>
                            <input onChange={onChange} value={details.productId} placeholder='' type="text" id="productId" name="productId" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                        </div>
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="address" className="leading-7 text-sm text-gray-600">address</label>
                        <textarea onChange={onChange} value={details.address} placeholder='' name="address" id="address" cols="10" rows="4" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required></textarea>
                    </div>

                    <div className="w-full flex flex-col h-full">
                        <div className="flex w-full flex-col sm:flex-row justify-between">
                            <div className="mb-4 w-full sm:mx-2">
                                <label htmlFor="track" className="leading-7 text-sm text-gray-600">track</label>
                                <input onChange={onChange} value={details.track} placeholder='' type="text" id="track" name="track" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                            </div>
                            <div className="mb-4 w-full sm:mx-2">
                                <label htmlFor="quantity" className="leading-7 text-sm text-gray-600">quantity</label>
                                <input onChange={onChange} value={details.quantity} placeholder='' type="number" id="quantity" name="quantity" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col h-full">
                        <div className="flex w-full flex-col sm:flex-row justify-between">
                            <div className="mb-4 w-full sm:mx-2">
                                <label htmlFor="status" className="leading-7 text-sm text-gray-600">status</label>
                                <select onChange={onChange} value={details.status} name="status" id="status" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                    <option value="ordered">Ordered</option>
                                    <option value="cancelled">Cancelled</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full mb-4 px-2">
                        <button type='submit' className='w-full flex justify-center mx-auto my-2 px-4 py-2 bg-gray-900 text-white rounded text-base sm:text-lg border border-gray-400 hover:bg-gray-800'>Save</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateOrder