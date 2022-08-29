import React, {useState, useContext} from 'react'
import { AdminContext } from '../../context/adminContext'
import { GrClose } from 'react-icons/gr'

const AddProduct = () => {
    const { setAddProductModal, addProduct} = useContext(AdminContext)
    const [details, setDetails] = useState({title:'', slug:'', description:'', img:'', category:'', storage:'', color:'', price:'', availableQty:''})

    const onChange = (e)=>{
      setDetails({...details, [e.target.name] : e.target.value})
     }
     const onSubmit = async (e)=>{
        e.preventDefault()
        await addProduct({...details, authToken: sessionStorage.getItem("authToken")})
      }

  return (
    <div className="w-11/12 bg-white mx-auto sm:w-3/4 h-auto p-4 px-4 max-w-5xl rounded border-2">

        <div className="flex w-full justify-between items-center p-2 mb-1 border-b">
            <span className="font-semibold sm:text-2xl text-xl ">Add Product</span>
            <button onClick={() => {setAddProductModal(false)}} className='cursor-pointer'><GrClose /></button>
        </div>

        <form action="#" onSubmit={onSubmit}>
        <div className="w-full flex flex-col h-full">
          <p className="w-full text-left text-lg mb-4">Product Details</p>

          <div className="flex w-full flex-col sm:flex-row justify-between">
            <div className="mb-4 w-full sm:mx-2">
              <label htmlFor="title" className="leading-7 text-sm text-gray-600">title</label>
              <input onChange={onChange} value={details.title} placeholder='' type="text" id="title" name="title" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
            </div>
            <div className="mb-4 w-full sm:mx-2">
              <label htmlFor="slug" className="leading-7 text-sm text-gray-600">slug</label>
              <input onChange={onChange} value={details.slug} placeholder='' type="text" id="slug" name="slug" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
            </div>
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="description" className="leading-7 text-sm text-gray-600">description</label>
            <textarea onChange={onChange} value={details.description} placeholder='' name="description" id="description" cols="10" rows="4" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"required></textarea>
          </div>

          <div className="w-full flex flex-col h-full">
            <div className="flex w-full flex-col sm:flex-row justify-between">
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="img" className="leading-7 text-sm text-gray-600">img</label>
                <input onChange={onChange} value={details.img} placeholder='' type="text" id="img" name="img" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
              </div>
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="category" className="leading-7 text-sm text-gray-600">category</label>
                <input onChange={onChange} value={details.category} placeholder='' type="text" id="category" name="category" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col h-full">
            <div className="flex w-full flex-col sm:flex-row justify-between">
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="color" className="leading-7 text-sm text-gray-600">color</label>
                <input onChange={onChange} value={details.color} placeholder='' type="text" id="color" name="color" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="storage" className="leading-7 text-sm text-gray-600">storage</label>
                <input onChange={onChange} value={details.storage} placeholder='' type="text" id="storage" name="storage" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col h-full">
            <div className="flex w-full flex-col sm:flex-row justify-between">
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="price" className="leading-7 text-sm text-gray-600">price</label>
                <input onChange={onChange} value={details.price} placeholder='' type="number" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
              </div>
              <div className="mb-4 w-full sm:mx-2">
                <label htmlFor="availableQty" className="leading-7 text-sm text-gray-600">availableQty</label>
                <input onChange={onChange} value={details.availableQty} placeholder='' type="number" id="availableQty" name="availableQty" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required/>
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

export default AddProduct