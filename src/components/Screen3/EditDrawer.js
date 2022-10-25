import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { InboxOutlined } from '@ant-design/icons';
import { Form, Button, Drawer, Input, message, Upload, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import Actions from '../../Redux/actions';


const EditDraw = () => {  
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // form.append()

  const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',

  onChange(info) {
    const { status } = info.file;

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    // debuggers
    console.log('Success:', values);
    
    setOpen(false);
    dispatch({
      type: Actions.UPLOAD_DATA_REQUEST,
      payload: values,
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Edit
      </Button>
      <Drawer title="Create" placement="right" onClose={onClose} open={open} 
      footer = {
        <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button form='myForm' key="submit" htmlType="submit" type="primary" >
             Save
            </Button>
        </Space>
      }
      footerStyle= {{textAlign:'right'}}
            >
        
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
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input placeholder='Title'/>
      </Form.Item>
      <Form.Item
      label="Cover image"
      name="image_url"
      rules={[
        {
          required: true,
          message: 'Please input your Cover Image!',
        },
      ]}  
      >
      <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Cover image</p>
    <p className="ant-upload-hint">
      image fromat:  .jpg  .png
    </p>
  </Dragger>
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
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

export default EditDraw;