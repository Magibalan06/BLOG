import { Button, Input , Form} from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom'; 


function Left02() {
    const navigate = useNavigate()
  return (
    <div>
        <div className="Body">
            <img className="Blog02" src ="Blog.png" alt="BLOG"/>
        </div>
        <Form layout='vertical'>
            <Form.Item name="first_name" label="First Name" className='F-Name02' 
            style={{
                display: 'inline-block',
                width: '195px',
                height: '40px',
                margin: '0px 10px 20px 160px'
              }}
            rules={[
                {
                  type: 'text',
                  message: 'The input is not valid First Name!',
                },
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}>

                <Input className='Input-E-Mail02' placeholder='First Name'/>

            </Form.Item>
            <Form.Item name="lastName" label="Last Name" className='L-Name02' 
            style={{
                display: 'inline-block',
                width: '195px',
                height: '40px',
              }}
            rules={[
                {
                  type: 'text',
                  message: 'The input is not valid First Name!',
                },
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}>

                <Input className='Input-E-Mail02' placeholder='Last Name'/>

            </Form.Item>
            <Form.Item name="email" label="E-mail" 
            style={{
                margin: '20px 0px 20px 160px',
                width: '400px',
                height: '40px',
              }}
            rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}>

                <Input  placeholder='Email'/>

            </Form.Item>
            <Form.Item name="password" label="Password" 
            style={{
                margin: '40px 0 20px 160px',
                width: '400px',
                height: '40px',
              }}
             rules={[
             {
              required: true,
              message: 'Please input your password!',
            },
             ]}
        hasFeedback
      >
        <Input.Password  placeholder='Password'/>
      </Form.Item>
      <Form.Item name="cPassword" label="Confirm Password" 
      style={{
        margin: '40px 0 20px 160px',
        width: '400px',
        height: '40px',
      }}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password  placeholder='Confirm Password'/>
      </Form.Item>
      <Button type="primary" htmlType="submit" className='Signup02'>
          Signup
        </Button>
        </Form>
        <p className="account02">
            Don't have an account? 
            <span className='Signup'>
                <nav>
                    <Button className='Signin02' type='link' onClick={() => navigate('/')}>Signin</Button>
                </nav>
            </span>
        </p>
    </div>
  )
}

export default Left02