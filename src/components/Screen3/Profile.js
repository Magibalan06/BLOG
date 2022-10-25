import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Avatar, Button, Modal, Spin, Input, Form, Upload } from 'antd';
import Actions from "../../Redux/actions";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';



export const Profile = () => {

  const validateUserValues = useSelector((state) => state.validateUserValues)
  // console.log('validateUserValues',validateUserValues)

  const isLoading = useSelector((state) => state.loader)    

  const localStorageValues = JSON.parse(localStorage.getItem('result'))    
  // console.log('localStorageValues',localStorageValues)
  
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadError = (file) => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => resolve(reader.result);
  
      reader.onerror = (error) => reject(error);
  })
  }

const [previewOpen, setPreviewOpen] = useState(false);
const [previewImage, setPreviewImage] = useState('');
const [previewTitle, setPreviewTitle] = useState('');
const [fileList, setFileList] = useState([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: `${validateUserValues?.data?.profile_url}`,
  },


]);


const handleCancelUpdate = () => setPreviewOpen(false);

const handlePreview = async (file) => {
  if (!file.url && !file.preview) {
    file.preview = await loadError(file.originFileObj);
  }

  setPreviewImage(file.url || file.preview);
  setPreviewOpen(true);
  setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
};

const handleChangeUpdate = ({ fileList: newFileList }) => setFileList(newFileList);



  const onFinish = (values) => {
    console.log('values:::' , values)
      dispatch({
        type: Actions.UPDATE_PROFILE_REQUEST,
        payload: values
      })
      setIsModalOpen(false)
  }
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    const validateMessages = {
      required: 'Name is required!',
    };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateProfile = () => {
    console.log('update profile')
    setIsModalOpen(true);
    
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const upload = (
    <div style={{ textAlign: "center" }}>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>  )

    
  return (<>

      {isLoading ? <Spin tip = 'Loading...' style={{margin: '5% 0 0 48%'}}/> 
      
      : 
  
         <div className='userDetailsProfileInfo'>

           <Avatar src={validateUserValues?.data?.profile_url} />

            <div className='userNameProfileInfo'>

               {validateUserValues?.data?.first_name} {validateUserValues?.data?.last_name}

            </div>

            <><h3 style={{marginLeft:'1%'}}>{validateUserValues?.data?.email}</h3></>

            <Button type='primary' onClick={updateProfile}>
                <EditOutlined/>Edit Profile
            </Button>

          </div> }


       <Modal title="Profile"  visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose
          footer={[
            <Button onClick={handleCancel}>Cancel</Button>,
            <Button form="myForm"  key="submit" htmlType="submit" type="primary" >
              Update
            </Button>
        ]}>

      <Form  id="myForm"  {...layout} validateMessages={validateMessages}  onFinish={onFinish}  >
            <Form.Item
               name="first_name" 
               label="First Name" 
               className='F-Name03' 
               initialValue={validateUserValues?.data?.first_name}
               rules={[
                {
                  type: 'text',
                  message: 'The input is not valid First Name!',
                }
               ]}>

                <Input className='Input-E-Mail02' placeholder='First Name'/>

            </Form.Item>

            <Form.Item 
              name="last_name" 
              label="Last Name" 
              className='L-Name03' 
              initialValue={validateUserValues?.data?.last_name}
              rules={[
                {
                  type: 'text',
                  message: 'The input is not valid Last Name!',
                }
              ]}>

                <Input className='Input-E-Mail02' placeholder='Last Name'/>
              
            </Form.Item>

            <Form.Item 
              name="image_url" 
              label="Image" 
              className='Image03' 
              initialValue={validateUserValues?.data?.image_url?.file?.originFileObj}>

                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChangeUpdate}
                >

                 {fileList.length >= 1 ? null : "Add Profile"}

            {/* upload */}
            
               </Upload>

            </Form.Item>

            


            {/* <Form.Item name="image_url" label="Image" className='Image03'
            rules={[
              {
                type: 'text',
                message: 'The input is not valid Image',
              }
            ]}>
              
              <Upload >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>

              </Form.Item> */}
            </Form>
      </Modal>

    </>)
}
export default Profile