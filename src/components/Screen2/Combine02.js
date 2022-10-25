import React from "react";
import { Col } from 'antd';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom'; 
import { Button, Input , Form} from 'antd';
import Actions from "../../Redux/actions";

function Combine02 () {
    const navigate = useNavigate()
    const dispatch = useDispatch();   

    const onFinish = (values) => {
      console.log('values' , values)
      dispatch({
        type: Actions.ADD_REQUEST,
        payload: values
      })
    }

    return (
        <div className="component02">
            
            <Col
          xs={{span: 24}}
          md={{span:12}}>
            <div className="Left-Component02">
            <div>
        <div className="Body">
            <img className="Blog02" src ="Blog.png" alt="BLOG"/>
        </div>
        <Form layout='vertical' id="myForm" onFinish={onFinish}>
            <Form.Item name="first_name" label="First Name" className='F-Name02' 
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
            <Form.Item name="last_name" label="Last Name" className='L-Name02' 
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
            <Form.Item name="email" label="E-mail" className="E-Mail02"
            
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
            <Form.Item name="password" label="Password" className="password02"
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
      <Form.Item name="password_confirmation" label="Confirm Password" className="confirmPassword02"
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
      <Button form="myForm" type="primary" htmlType="submit" className='Signup02'>
          Signup
        </Button>
        </Form>
        <p className="account02">
            Don't have an account? 
            <span className='Signup'>
              <Button className='Signin02' type='link' onClick={() => navigate('/')}>Signin</Button>
            </span>
        </p>
    </div>
            </div>
            </Col>
            <Col
                 md={{span:10}} className='image01'>
                    <img src='image.png' alt='image01' className="imageClass02"/>
            </Col>
           
            
            
        </div>
    )
} 
export default Combine02