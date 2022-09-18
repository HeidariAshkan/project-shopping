import React , { useState , useMemo , useEffect } from 'react'
import { Modal , Menu , Button , Checkbox ,FileInput  , Select , TextInput , Textarea , JsonInput   } from '@mantine/core';
import { useForm } from '@mantine/form';
import Cookies from "js-cookie";
import { getProduct } from './../../../redux/slice/productSlice';
import { useDispatch } from 'react-redux';

interface IProps {
    open: boolean;
    openModal: (value: boolean) => void,
    category: any;
    editProduct:any
  }
  
function ModalEditProduct({ open, openModal , category , editProduct }: IProps) {



  const dispatch = useDispatch()

  const [categoryTpye , setCategoryType] = useState<number | null  | any>(null)
  const [slug , setSlug] = useState<string>('')
  const [name , setName] = useState<string>('')
  const [description , setDescription] = useState<string>('')
  const [price , setPrice] = useState<string>('')
  const [final_price , setFinalPrice] = useState<string>('')
  const [option , setOption] = useState<string | any>('')
  const [optionsValues , setOptionsValues] = useState<string>('')
  const [remaining , setRemaining] = useState<number | null | any>(null)
  const [featured , setFeatured] = useState<boolean>(false)

  // console.log(editProduct)
  useEffect(()=>{
    setCategoryType(editProduct.category)
    setSlug(editProduct.slug)
    setName(editProduct.name)
    setDescription(editProduct.description)
    setPrice(editProduct.price)
    setFinalPrice(editProduct.final_price)
    setOption(editProduct.options?.name)
    setOptionsValues(editProduct.options?.value.join(" "))
    setRemaining(editProduct.remaining)
  },[editProduct])
    const cat = useMemo(()=>{
        return category.filter((item:any)=>item.children === null)
        },[category])

    const categorys = useMemo(()=>{
        return cat.map((item:any)=>({
          value:item.id,
          label:item.name
        }))
      },[cat])

      // const form = useForm({
      //   initialValues: {
      //     category:editProduct.category,
      //     slug: editProduct.slug,
      //     name: editProduct.name,
      //     description: editProduct.description,
      //     price: editProduct.price,
      //     final_price: editProduct.final_price,
      //     options: editProduct?.options?.name,
      //     optionsValues:editProduct?.options?.value?.join(' '),
      //     remaining: editProduct.remaining,
      //     featured: editProduct.featured,
      //   },
      // })



      const handleSubmit = (e:any) => {
        e.preventDefault()
        fetch(`http://localhost:8000/store/product/id/${editProduct.id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + Cookies.get('token')
        },
        body: JSON.stringify({
        name: name,
        price: price,
        final_price:final_price,
        category: categoryTpye,
        slug:slug,
        featured:featured,
        image: editProduct.image,
        images: editProduct.images,
        options:{name:option , value:optionsValues.split(' ')},
        remaining:remaining,
        })
        }).then(response => response.json())
        .then(data => {
        dispatch((getProduct()))
        openModal(false)
        // console.log(data)
        }
        ).catch(err => console.error(err))
      }
      // console.log(editProduct)
  return (
    <Modal className='font-IR' size={"xl"} opened={open} onClose={()=>{openModal(false)}}>
    <h1 className="text-2xl text-center mb-3">Edit Product</h1>
    <div dir="ltr">
    
      <form>
        <div className="flex justify-between gap-6 items-center">
        <div className='flex flex-col flex-1'>
        <Select 
          sx={{
            '& label':{
              color:"#5500FF",
              marginRight:5,
            },
            '& input':{textAlign:'center'}
          }}
          placeholder={"pick one"}
          label="Categorys"
          data={categorys}
          value={categoryTpye}
          onChange={setCategoryType}
          name="category"
          required
          />
        <TextInput value={name} onChange={(event)=>{setName(event.currentTarget.value)}} type="text" name="name" label="Product Name" sx={{'& label':{color:"#5500FF",marginRight:5,},'& input':{textAlign:'center'}}} required />
        </div>
          <div className="w-28 h-40"><img className="w-full h-full object-cover" src={editProduct.main_image} alt="product_image"/></div>
        </div>
        <TextInput value={slug} onChange={(event)=>{setSlug(event.currentTarget.value)}}  type="text" name="slug" label="Product Slug" sx={{'& label':{color:"#5500FF",marginRight:5,},}} />
        <Textarea value={description} onChange={(event)=>{setDescription(event.currentTarget.value)}} name="description" label="Product Description" sx={{'& label':{color:"#5500FF",marginRight:5,},'& textarea':{textAlign:'right'}}} required />
        <TextInput value={price} onChange={(event)=>{setPrice(event.currentTarget.value)}} type="number" name="price" label="Product Price"  sx={{'& label':{color:"#5500FF",marginRight:5,},}} required/>
        <TextInput value={final_price} onChange={(event)=>{setFinalPrice(event.currentTarget.value)}} type="number" name="final_price" label="Product Total-Price" sx={{'& label':{color:"#5500FF",marginRight:5,},}} required />
        {/* <JsonInput {...form.getInputProps('options')} name="options" label="Product Options" sx={{'& label':{color:"#5500FF",marginRight:5,},}} required /> */}
        <Select value={option} onChange={setOption}  name="options" label="Product Options" data={[{value:'رنگ' , label:"Color"},{value:'سایز' , label:"Size"}]} placeholder={"pick one"} sx={{'& label':{color:"#5500FF",marginRight:5,},}} required />
        <TextInput value={optionsValues} onChange={(event)=>{setOptionsValues(event.currentTarget.value)}} description="Put space between each word"  name="optionsValues" type="text" label="Options Values Product" sx={{'& label':{color:"#5500FF",marginRight:5,},'& input':{textAlign:'right'}}} required/>
        <TextInput value={remaining} onChange={(event)=>{setRemaining(event.currentTarget.value)}}  name="remaining" type="number" label="Count" sx={{'& label':{color:"#5500FF",marginRight:5,},}}/>
        <Checkbox
        sx={{
            marginTop:15,
            '& label':{
              color:"#5500FF",
              marginRight:5,
            },
          }}
          checked={featured}
          onChange={(event) => setFeatured(event.currentTarget.checked)} 
          label="featured"
          name='featured'
          />
          <Button onClick={(e:any)=>{handleSubmit(e)}} type='submit' className="w-full bg-blue-500 hover:bg-blue-600 mt-2 transtion-all duration-500">Save</Button>
      </form>
    </div>
  </Modal>  )
}

export default ModalEditProduct