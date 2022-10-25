import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Col } from 'antd';
import Actions from "../../Redux/actions";

function Combine () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const PostGetlist = useSelector((state) => state.PostGetlist)
    // const logIn = useSelector((state)=>state.logIn)
    const logIn = localStorage.getItem('result')

    const onFinish = (values) => {
      // console.log(values) 
      dispatch({
        type: Actions.LOGIN_REQUEST,
        payload:values,
        navigate,
      })
    }
    
    useEffect(() => {
      if(!logIn) {
        navigate("/")
      }
      else {
        navigate("/login/posts")
      }
    },[logIn,navigate])

    return (
        <div className="component">
          <Col
          xs={{span: 24}}
          md={{span:12}}>
            <div className="Left-Component">
            <div>
        <div className="Body">
            <img className="Blog" src ="Blog.png" alt="BLOG"/>
        </div>

            <Form layout='vertical' id="myForm" onFinish={onFinish}>
                <Form.Item name="email" label="E-mail" className='E-Mail' 
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

                    <Input className='Input-E-Mail' placeholder='Email'/>

                </Form.Item>
                <Form.Item name="password" label="Password" className='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password className='Input-Password' placeholder='Password'/>
          </Form.Item>
          <Button form="myForm" type="primary" htmlType="submit" className='Signin' >
              Signin
            </Button>
            </Form>
          <p className="account">
              Don't have an account? 
              <span className='Signup'>
                <Button className='Signup' type='link' onClick={() => navigate('signup')}>Signup</Button>
              </span>
          </p>
    </div> 
            </div>
            </Col>
            <Col
                 md={{span:10}} className='image01'>
                    <img src='image.png' alt='image01' className="imageClass"/>
            </Col>
        </div>
    )
} 
export default Combine