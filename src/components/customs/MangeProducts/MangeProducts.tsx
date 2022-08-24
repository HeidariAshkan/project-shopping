import React, { useState, useMemo } from "react";
import { Table, Button, Menu , TextInput} from "@mantine/core";
import { MdEditNote } from "react-icons/md";
import { HiSearch } from "react-icons/hi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import ModalEditProduct from './../ModalEditProduct/ModalEditProduct';
import ModalDeleteProduct from './../ModalDeleteProduct/ModalDeleteProduct';

interface IProps {
  products: [];
  category: [] | undefined;
  openModal:(open:boolean)=>void
}

function MangeProducts({ products, category , openModal }: IProps) {


  const [selected, setSelected] = useState<number | null>(null);
  const [searchInput , setSearchInput] = useState<string>("")
  const [modalEdit , setModalEdit] = useState<boolean>(false)
  const [modalDelete , setModalDelete] = useState<boolean>(false)
  const [edit , setEdit] = useState<any | {}> ({})
  const [deleteID , setDeleteID] = useState<undefined | number | null>(null)

  const filterCategory = useMemo(() => {
    return category?.filter((item: any) => item.children === null);
  }, [category]);

  const filterProductByFilterCat = useMemo(()=>{
    if(selected === null){
      return products
    }
    return products.filter((item:any) => item.category === selected)
  },[selected,products])
  
  const filterProductByFilterSearch = useMemo(()=>{
    if(searchInput === ""){
        return filterProductByFilterCat
    }
    return filterProductByFilterCat.filter((item:any)=> item.name.includes(searchInput) || item.description.includes(searchInput))
  },[filterProductByFilterCat , searchInput])
  // console.log(searchInput)

  const handleEditId = (id:number)=>{
    setEdit(products.find((item:any)=>item.id === id))
  }
  const handleDeleteId = (id:number)=>{
    setDeleteID(id)
  }
  return (
    <>
      <div className="w-2/4 mx-auto mt-6 ">
        <TextInput sx={{"& input":{textAlign:"right",}}} icon={<HiSearch size={16} />} placeholder="جستوجو کالا" value={searchInput} onChange={(e)=>{setSearchInput(e.target.value)}} /> 
      </div>
      <div className="flex justify-end py-2 px-6 ml-8">
        <Button onClick={()=>{openModal(true)}} className="bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg ">
          کالا
          <CgAddR className="mr-2" />
        </Button>
      </div>
      <Table verticalSpacing="sm" horizontalSpacing="sm" highlightOnHover>
        <thead className="font-IR">
          <tr>
            <th className="text-center text-lg">تصویر</th>
            <th className="text-center text-lg">نام</th>
            <th className="text-center text-lg">
              <Menu transition="rotate-right" transitionDuration={500}>
                <Menu.Target>
                  <Button className="border text-[#fefefe] bg-[#5500FF] rounded-md hover:bg-[#5500FF] hover:bg-opacity-80 transition-all duration-500 font-IR">
                    دسته بندی
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={()=>{setSelected(null)}} className={`text-center ${(selected === null) ? "bg-[#5500FF] text-white bg-opacity-70" : ""}`}>
                        همه
                    </Menu.Item>
                    {filterCategory?.map((item:any)=>(
                    <Menu.Item onClick={()=>{setSelected(item.id)}} className={`text-center ${(selected === item.id) ? "bg-[#5500FF] text-white bg-opacity-70" : ""}`} key={item.id}>
                      {item.name}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </th>
            <th className="text-center text-lg">قیمت</th>
            <th className="text-center text-lg">تعداد</th>
            <th className="text-center text-lg">عملیات</th>
          </tr>
        </thead>
        <tbody className="font-IR">
          {filterProductByFilterSearch?.map((item: any) => (
            <tr key={item.id}>
              <td className="text-center w-32">
                <img src={item.images} alt={item.name} />
              </td>
              <td className="text-center">{item.name}</td>
              <td className="text-center">
                {category !== undefined
                  ? category.find((items: any) => items.id === item.category)
                      ?.name
                  : item.category}
              </td>
              <td className="text-center">
                {parseInt(item.price).toLocaleString("fa-IR")}
              </td>
              <td className="text-center">
                {parseInt(item.remaining).toLocaleString("fa-IR")}
              </td>
              <td className="text-center">
                <Button onClick={()=>{setModalEdit(true);handleEditId(item.id)}} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 text-lg ml-2">
                  <MdEditNote />
                </Button>
                <Button onClick={()=>{setModalDelete(true);handleDeleteId(item.id)}} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 text-lg">
                  <RiDeleteBin2Fill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalEditProduct open={modalEdit} openModal={setModalEdit} category={category} editProduct={edit}/>
      <ModalDeleteProduct open={modalDelete} openModal={setModalDelete} id={deleteID}/>
    </>
  );
}

export default MangeProducts;
