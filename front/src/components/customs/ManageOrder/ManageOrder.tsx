import React ,{ useEffect , useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import Cookies from 'js-cookie';
import { Table, TextInput , Modal , Button } from '@mantine/core';
import { HiSearch } from "react-icons/hi";




function ManageOrder() {


  const [orderList , setOrderList] = useState<any>([])
  const [usersList , setUsersList] = useState<any>([])
  const [editOrder , setEditOrder] = useState<any>({})
  const [selectOrder , setSelectOrder] = useState<any>([])

  const [openModal , setOpenModal] = useState<boolean>(false)
  const [searchInput , setSearchInput] = useState<string>("")


  // console.log(orderList)
  useEffect(()=>{
    getOrder()
    getUsers()
  },[Cookies.get('token')])


  useEffect(()=>{
    if(searchInput === "" || null || undefined ){
      setSelectOrder(orderList)
    }
    else{
      const users:any = usersList.filter((item:any)=>item?.username.includes(searchInput))
      setSelectOrder(orderList.filter((item:any)=>users.some((user:any) => user.id === item.user)))      
    }
  },[searchInput , orderList , usersList])




  const getOrder = async()=>{
    const cookie = "Token"+ " " + Cookies.get('token')
    const res = await fetch('http://localhost:8000/store/order' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':cookie
      },
    })
    const data = await res.json()
    setOrderList(data)
  }
  
  const getUsers = async()=>{
    const cookie = "Token"+ " " + Cookies.get('token')
    const res = await fetch('http://localhost:8000/user/get_all_users' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':cookie
      },
    })
    const data = await res.json()
    setUsersList(data)
  }


  const handleEditOrder = (e:any,id:number)=>{
    e.preventDefault()
    const itemEdit = orderList.find((item:any)=>item.id === id)
    setEditOrder(itemEdit)
    setOpenModal(true)
  }

  const handleChange = (editOrder:any)=>{
    const cookie = "Token"+ " " + Cookies.get('token')
    fetch(`http://localhost:8000/store/order/${editOrder.id}`, {
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Authorization': cookie
      },
      body: JSON.stringify({
        address: editOrder.address,
        data: editOrder.data,
        status: editOrder.status,
        products: editOrder.products,
        total: editOrder.total ,
      })
    }).then((res:any) => res.json()).then((data:any) => {
      console.log(data)
      setOpenModal(false)
      getOrder()
      getUsers()
    }).catch((err:any) => console.error(err))            
}


  const handleStatusSubmit = (editOrder:any , isDone:boolean)=> {
    fetch(`http://localhost:8000/store/order/${editOrder.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + Cookies.get('token')
        },
      body: JSON.stringify({
            address: editOrder.address,
            data: editOrder.data,
            status: (isDone) ? 'done' : "pending",
            products: editOrder.products,
          })
        }).then(response => response.json()).then(data => {
          console.log(data)
          setOpenModal(false)
          getOrder()
          getUsers()
        }).catch(error => console.log(error));

  }
              // done
              // function handleStatusSubmit () {
              //   fetch(`http://localhost:8000/store/order/${props.order.id}`, {
              //   method: 'PUT',
              //   headers: {
              //   'Content-Type': 'application/json',
              //   'Authorization': 'Token ' + Cookies.get('token')
              //   },
              //   body: JSON.stringify({
              //   address: props.order.address,
              //   data: props.order.data,
              //   status: 'done',
              //   products: props.order.products,
              //   })
              //   }).then(response => response.json())
              //   .then(data => {
              //   window.location.reload()
              //   }
              //   ).catch(err => console.error(err))
              //   }

  // console.log(count)
  // console.log(orderList)
  // console.log(editOrder)
  return (
    <>
      <div className="flex flex-col items-center font-IR mb-56">
        <TextInput sx={{width:"60%", marginBottom:15 , marginTop:15 ,  "& input":{textAlign:"right", fontFamily:"IRANSans" ,}}} icon={<HiSearch size={16} />} placeholder="جستوجو یوزر" value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} />
        <Modal opened={openModal} onClose={()=>{setOpenModal(false)}} size="xl">
          <div className="w-full border flex flex-col gap-4 font-IR">
            {
              editOrder.products?.map((item:any)=>(
                <div className="flex flex-row-reverse items-center w-full font-IR gap-4 justify-between px-16 border-b-2 my-1" key={item.id}>
                  <div className="w-32 h-44">
                    <img className="w-full h-full object-cover" src={item.data[0].image} alt="productImg"/>
                  </div>
                  <div className="text-center text-sm flex flex-col gap-4 items-center">
                    <div className="flex gap-8">
                      <h1>قیمت: {parseInt(item.data[0].price).toLocaleString("fa-IR")} تومان</h1>
                      <h1>اسم: {item.data[0].name}</h1>
                    </div>
                    <div className="flex justify-between flex-row-reverse items-center w-full">
                      <h1>ویژگی: {item.data[0].options}</h1>
                      <TextInput sx={{width:"20%", textAlign:'center' ,'& input':{textAlign:'center'}}} label="تعداد" defaultValue={item.quantity} onChange={(e)=>{item.quantity = parseInt(e.target.value)}} type="number" />
                    </div>
                  </div>
                </div>
              ))
            }
              {
                (openModal)
                 ?
                 <>
                  <div key={editOrder.id} className="text-right flex flex-row-reverse items-center justify-around">
                    <h1>قیمت کل سبد: {parseInt(editOrder.total)?.toLocaleString('fa-IR')}</h1>
                    <h1 className={`${(editOrder?.data[0]?.discount)?'bg-[#EF4056] p-4 text-white rounded-lg': ""}`}>تخفیف: %{(editOrder.data[0]?.discount)?parseInt(editOrder.data[0]?.discount)?.toLocaleString('fa-IR'):"بدون تخفیف"}</h1>
                  </div>
                  <p className="text-center text-sm"> آدرس:{editOrder?.data[0]?.more}</p>
                  <p className={`text-center text-sm ${(editOrder?.status === "pending") ? "text-yellow-500" : "text-green-600"}`}>{(editOrder?.status) ? "در حال انتظار" : "تحویل داده شد"}</p>
                  <Button onClick={()=>{handleChange(editOrder)}} variant="outline" disabled={(editOrder?.status === "pending") ? false : true} className="font-IR mt-2">ذخیره</Button>
                  <div className="flex justify-center gap-3">
                    <Button onClick={()=>{const isDone = false;handleStatusSubmit(editOrder ,isDone);}} variant="outline" disabled={(editOrder?.status === "pending") ? true : false} color="yellow" className="font-IR">در حال انتظار</Button>
                    <Button onClick={()=>{const isDone = true;handleStatusSubmit(editOrder , isDone);}} variant="outline" disabled={(editOrder?.status === "pending") ? false : true} color="teal" className="font-IR">تحویل داده شد</Button>
                  </div>
                 </>
                // bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg ml-2 font-IR transition-all duration-400
                :
                <div></div>
              }
          </div>
        </Modal>
        <Table verticalSpacing="sm" horizontalSpacing="sm" highlightOnHover>
          <thead className="font-IR">
            <tr>
              <th className="text-right sm:text-md sx:text-[0.55rem] text-xs">نام کاربر</th>
              <th className="text-right sm:text-md sx:text-[0.55rem] text-xs">مجموع مبلغ</th>
              <th className="text-center sm:text-md sx:text-[0.55rem] text-xs">زمان ثبت سفارش</th>
              <th className="text-center sm:text-md sx:text-[0.55rem] text-xs">وضعیت سفارش</th>
            </tr>
          </thead>
          <tbody className="font-IR">
            {
              selectOrder?.map((item:any)=>(
                <tr key={item.id} onClick={(e:any)=>{handleEditOrder(e , item.id);}}>
                  <td className="text-right text-md">{usersList.find((items:any)=>items.id === item?.user)?.username}</td>
                  <td className="text-right text-md">{item?.total?.toLocaleString('fa-IR')}</td>
                  <td className="text-center text-md">{item?.created}</td>
                  <td className={`text-center text-md p ${(item?.status === 'pending') ? 'text-yellow-500': 'text-green-500'}`}>{(item?.status === 'pending') ? 'در حال انتظار' : 'تحویل داده شد'}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ManageOrder


