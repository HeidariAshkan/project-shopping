import React , { useState , useMemo , useEffect } from 'react'
import { Modal , Button , Checkbox ,FileInput  , Select , TextInput , Textarea , JsonInput   } from '@mantine/core';
import { useForm } from '@mantine/form';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { getProduct } from './../../../redux/slice/productSlice';

interface IProps {
  open: boolean;
  openModal: (value: boolean) => void,
  category: any[];
}

function ModalAddProduct({ open, openModal , category }: IProps) {

  const [mainImage , setMainImage] = useState<File | null>(null)
  const [image , setImage] = useState<string | File | any>('')

  const [nextImages, setNextImages] = useState<File | null>(null)
  const [nextImages64 , setNextImages64] = useState<string | File | any>('')

  const dispatch = useDispatch()

  useEffect(()=>{
    if(mainImage){
      getBase64(mainImage).then((data)=> {
        if(typeof data === 'string'){
          setImage(data)
        }
      })
    }
    if(nextImages){
      getBase64(nextImages).then((data)=> {
        if(typeof data === 'string'){
          setNextImages64(data)
        }
    })
  }
  },[mainImage , nextImages])
  

  const cat = useMemo(()=>{
    return category.filter((item:any)=>item.children === null)
    },[category])

  const categorys = useMemo(()=>{
    return cat.map((item:any)=>({
      value:item.id,
      label:item.name
    }))
  },[cat])


  const form = useForm({
    initialValues: {
      category: '',
      slug: '',
      name: '',
      description: '',
      price: '',
      final_price: '',
      images:'',
      option: '',
      optionsValues:'',
      remaining: '',
      featured: false,
    },
  })


  const handleSubmit = (values:any)=>{
    // console.log(typeof image)
    fetch('http://localhost:8000/store/product/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + Cookies.get('token')
      },
      body: JSON.stringify({
          name:values.name,
          price:values.price,
          description:values.description,
          final_price:values.final_price,
          category: values.category,
          slug: values.slug,
          featured: values.featured,
          mainImage: image,
          images: nextImages64,
          // options: JSON.parse(values.options),
          options:{name:values.option , value:values.optionsValues.split(' ')},
          remaining: values.remaining,
      })
  }).then(res => res.json())
      .then(data => {
          // console.log(data)
          dispatch(getProduct())
          form.reset()
          setMainImage(null)
          setNextImages(null)
          openModal(false)
      }).catch(err => {
          console.log(err)
      })
  } 


  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    });
  }

  return (
    <>
        <Modal className='font-IR' size={"xl"} opened={open} onClose={()=>{openModal(false);form.reset();setMainImage(null);setNextImages(null)}}>
          <h1 className="text-2xl text-center mb-3">Add Product</h1>
          <div dir="ltr">
            <form onSubmit={form.onSubmit((values)=>handleSubmit(values))}>
                <Select 
                sx={{
                  '& label':{
                    color:"#5500FF",
                    marginRight:5,
                  },
                }}
                placeholder={"pick one"}
                label="Categorys"
                data={categorys}
                {...form.getInputProps('category')}
                name="category"
                required
                />
              <TextInput {...form.getInputProps('name')} type="text" name="name" label="Product Name" sx={{'& label':{color:"#5500FF",marginRight:5,},}} required />
              <TextInput {...form.getInputProps('slug')}  type="text" name="slug" label="Product Slug" sx={{'& label':{color:"#5500FF",marginRight:5,},}} />
              <Textarea {...form.getInputProps('description')}  name="description" label="Product Description" sx={{'& label':{color:"#5500FF",marginRight:5,},}} required />
              <TextInput  {...form.getInputProps('price')}  type="number" name="price" label="Product Price"  sx={{'& label':{color:"#5500FF",marginRight:5,},}} required/>
              <TextInput {...form.getInputProps('final_price')}  type="number" name="final_price" label="Product Total-Price" sx={{'& label':{color:"#5500FF",marginRight:5,},}} required />
              <FileInput
              placeholder="Image"
              label="Product Main-Image"
              accept="image/png,image/jpeg"
              sx={{
              '& label':{color:"#5500FF",marginRight:5,},
              '& button':{
              textAlign:'center',
              display:'flex',
              justifyContent:'center',
              backgroundColor:'transparent'
              }}}
              name="image"
              value={mainImage}
              onChange={setMainImage}
              required
                />
                              <FileInput
                placeholder="Next Images"
                sx={{
                  '& label':{color:"#5500FF",marginRight:5,},
                  '& button':{
                textAlign:'center',
                display:'flex',
                justifyContent:'center',
                backgroundColor:'transparent'}
              }}
                value={nextImages}
                onChange={setNextImages}
                accept="image/png,image/jpeg"
                name='images'
                label="Product Images"
                required
                />
              {/* <JsonInput {...form.getInputProps('options')} name="options" label="Product Options" sx={{'& label':{color:"#5500FF",marginRight:5,},}} required /> */}
              <Select {...form.getInputProps('option')} name="option" label="Product Options" data={[{value:'رنگ' , label:"Color"},{value:'سایز' , label:"Size"}]} placeholder={"pick one"} sx={{'& label':{color:"#5500FF",marginRight:5,},}} required />
              <TextInput description="Put space between each word" {...form.getInputProps('optionsValues')} name="optionsValues" type="text" label="Options Values Product" sx={{'& label':{color:"#5500FF",marginRight:5,},}} required/>
              <TextInput {...form.getInputProps('remaining')} name="remaining" type="number" label="Count" sx={{'& label':{color:"#5500FF",marginRight:5,},}}/>
              <Checkbox
              sx={{
                  marginTop:15,
                  '& label':{
                    color:"#5500FF",
                    marginRight:5,
                  },
                }} 
                label="featured"
                name='featured'
                {...form.getInputProps('featured', { type: 'checkbox' })}
                />
                <Button type='submit' className="w-full bg-blue-500 hover:bg-blue-600 mt-2 transtion-all duration-500">Save</Button>
            </form>
          </div>
        </Modal>
    </>
  )
}

export default ModalAddProduct











