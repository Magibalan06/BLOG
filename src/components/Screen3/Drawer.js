import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { useParams } from 'react-router-dom';
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Button, Drawer, Input, message, Upload, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../../Redux/actions';


const Draw = () => {  
  const dispatch = useDispatch();
  const {id} = useParams()
  const postGetList = useSelector((state) => state.blogDetails);
  console.log('postGetList', postGetList)
  const  createDraw = useSelector((state)=>state. createDraw)
  const { Dragger } = Upload;
  // var drawerValues = false;



  // const loadError = (file) => {
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  
  //     reader.onload = () => resolve(reader.result);
  
  //     reader.onerror = (error) => reject(error);
  // })
  // }

const [previewOpen, setPreviewOpen] = useState(true);
const [previewImage, setPreviewImage] = useState('');
const [previewTitle, setPreviewTitle] = useState('');
const [fileList, setFileList] = useState([
  {
    uid: '-1',
    name: '',
    status: 'done',
    url: `${postGetList?.image_url}`,
  },


]);

const handleChange = ({ fileList: newFileList }) =>
setFileList(newFileList);

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);



// const handlePreview = async (file) => {
//   if (!file.url && !file.preview) {
//     file.preview = await loadError(file.originFileObj);
//   }

//   setPreviewImage(file.url || file.preview);
//   setPreviewOpen(true);
//   setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
// };

// const handleChangeUpdate = ({ fileList: newFileList }) => {
//   console.log('fileList',fileList)
//   console.log('newFileList',newFileList)
//   setFileList(newFileList)
//   drawerValues = true
//   console.log('drawerValues',drawerValues)
// }


  const onClose = () => {
    
    dispatch({
      type: Actions.CLOSE_DRAW,
     
    })
  };

  const onFinish = (values) => {
    // debuggers
    console.log('Success:', values);    
    if(Object.keys(postGetList).length) {
      dispatch({
        type: Actions.EDIT_DATA_REQUEST,
        payload: values,
        objectId: postGetList.id,
        id: id
      })
      dispatch({
        type: Actions.CLOSE_DRAW
      })
    }
    
    else {
      dispatch({
        type: Actions.CLOSE_DRAW
      })
      console.log('values',values)
      dispatch({
        type: Actions.UPLOAD_DATA_REQUEST,
        payload: values,
        null: ""
      })
      
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const props = {
    beforeUpload: file=> {
      const fileSize = file.size;
      const isPNG = file.type === 'image/png';
      const isJPG = file.type === 'image/jpg;'
      
      if (!isPNG && isJPG) {
        message.error(`Please Upload the image in PNG or JPG`)
      }
      else if ( fileSize>= 5000000 ) {
        message.error(`Please Upload your image within 5MB`);
      }

      return isPNG || Upload.LIST_IGNORE;
      // return isJPG || Upload.LIST_IGNORE;
      // return fileSize || Upload.LIST_IGNORE;

    }
  }

  

  return (
    <>
      
      <Drawer title={`${postGetList && Object.keys(postGetList).length? "Edit":"Create"}`}
         placement="right" onClose={onClose} open={createDraw} destroyOnClose
      footer = {
        <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button form='myForm' key="submit" htmlType="submit" type="primary" >
             {postGetList && Object.keys(postGetList).length? "Update":"Save"}
            </Button>
        </Space>
      }
      footerStyle= {{textAlign:'right'}}>
        
      <Form layout='vertical'
      name="basic"
      id="myForm"     
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      
    >
      <Form.Item
        label="Blog Title"
        name="name"
        initialValue={postGetList?.name} 
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder='Title'/>
      </Form.Item>

      {
        !(postGetList?.name) ?"" :
        <Form.Item 
      label={!(postGetList?.name) ? "" : "Update Image"}>

        {!(postGetList?.name) && !(postGetList?.image_url) ?
        "":
      <img src={postGetList?.image_url} style={{width: '140px', height: '140px'}}/>}
      

      </Form.Item>
      }

      



      <Form.Item
      label={!(postGetList?.name) ? "Cover Image" : ""}
      name="image_url"
      initialValue={postGetList?.image_url?.file?.originFileObj}>

        
        {!(postGetList?.name )?
        
        <Dragger 
        {...props}
        maxCount="1"
        >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          jpg or .png
        </p>
      </Dragger>
      : 

    
      

       <Upload {...props}  maxCount="1"><Button>Click to upload</Button></Upload> 
      
      
      // <>
      //   <img src={postGetList?.image_url} style={{width: '140px', height: '140px'}}/>
      //   <Upload maxCount="1">
      //     <Button>Click here to Upload</Button>
      //   </Upload>
      // </>

      // <Upload maxCount="1" >
      //   <Button style={{width:'330px', height: '155px'}}>
      //     {<img src={postGetList?.image_url} style={{width: '140px', height: '140px'}}/>}
      //   </Button>
      // </Upload>

      // <Upload
      //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      //   listType="picture-card"
      //   fileList={fileList}
      //   onChange={handleChange}
      // >
      //   {fileList.length >= 1 ? null : uploadButton}
      // </Upload>
      
      }

</Form.Item>


      <Form.Item
        label="Content"
        name="content"
        initialValue={postGetList?.content}
        rules={[  
          {
            required: true,
            message: 'Please input your Content!',
          },
        ]}
      >
        <TextArea rows={6} placeholder='Blog Content'/>
      </Form.Item>
      
    </Form>
      </Drawer>
    </>
  );
};

export default Draw;