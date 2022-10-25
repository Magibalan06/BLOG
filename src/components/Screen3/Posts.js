import Draw  from './Drawer';
import React, { useEffect, useState } from 'react';
import { Input, Table, Space, Button, Badge, Spin, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Actions from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';


const Posts = () => {

  const isLoading = useSelector((state) => state.loader)
  

  const createDraw = useSelector((state) => state.createDraw)  
  const dispatch = useDispatch();  
  const PostGetlist = useSelector((state)=> state.PostGetlist)
  console.log('PostGetlist::::::',PostGetlist)

  // console.log('PostGetlist::::::',PostGetlist?.data)
  // console.log('PostGetlist',PostGetlist)


  useEffect(() => {
    dispatch({
      type: Actions.GET_POST_REQUEST,
      payload: ""
    })
  },[])  


  const { Search } = Input;
  // const onSearch = (value) => console.log(value);

  const deletePost = (current) => {
    // console.log(current)
    // console.log(current.id)
    var deletePostIndexOf =  PostGetlist.indexOf(current)

    if(deletePostIndexOf !== 1) {
      PostGetlist.splice(deletePostIndexOf, 1)
    }

    dispatch({
      type: Actions.DELETE_POST_REQUEST,
      payload: current.id,
      PostGetlist: PostGetlist
    })
  
 }

  const showDrawer = () => { 
    dispatch({
      type: Actions.CREATE_DRAW,
      payload: null
    })
    dispatch({
      type: Actions.DRAW_NULL,
      payload: {}
    })
  }

  const publishEvent = (current)=> {

    console.log('PostGetlist',PostGetlist)

    dispatch({
      type: Actions.PUBLISH_REQUEST,
      payload: current,
      PostGetlist: PostGetlist
    })
    dispatch({
      type: Actions.GET_POST_REQUEST,
      payload: ""
    })
  } 
  
  const cancel = (e) => {
    console.log(e);
  };

  const columns  = [ { title:"Post name", dataIndex:"name", key:"name",
                       render: (data,current) => 
                        <NavLink to={`/login/posts/${current?.id}`} >  
                          {data}
                        </NavLink>},

                      { title:"Created at", dataIndex:"created_at" ,key:"created_at",
                        render: (_,current) =>
                           <div>
                            <Badge color={!current?.is_published?"red":"green"}/>
                            {moment(current?.created_at).format("YYYY-MM-DD HH:mm:ss")}
                          </div>},

                      { title:"Updated at", dataIndex:"updated_at", key:"updated_at",
                         render: (_,current) => 
                            <div>
                              {moment(current?.updated_at).format("YYYY-MM-DD HH:mm:ss")}
                            </div>},  

                      { title:"", dataIndex:"Actions", key:"Actions",
                         render: ( _, current) =>
                          <Space size="middle" className='EditDelete'>
                              <Popconfirm
                                title="Are you sure to delete this Blog?"
                                onConfirm={()=> deletePost(current)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No">     
                                   <DeleteOutlined />
                              </Popconfirm>

                              <button className='publishButton' 
                                  onClick={()=>publishEvent(current)}>
                                    {(current?.is_published)?"UnPublish":"Publish"}
                              </button>
                          </Space>}]

  const searchData = (e) => {
    console.log(e.target.value)
    const emptyValue = ""
    // console.log(emptyValue)
    {!e ?  
      dispatch({
        type: Actions.GET_POST_REQUEST,
        payload: emptyValue
      }):
      dispatch({
        type: Actions.GET_POST_REQUEST,
        payload: e.target.value
      })
    }

  }

  return (<>
    <div>
      <div className='heading'>
      <div className='postText'>
        <h1>POSTS</h1>
      </div>
      <div className='drawer'>
        <Search
        placeholder="search your post"
        className='searchBar'
        onChange={searchData}
        style={{
          width: '60%',
        }}
      />  
      
      <Button type='primary' onClick={showDrawer} style={{borderRadius:'5px'}}>
        Create
      </Button>

       {createDraw && <Draw /> }
     
      </div>
    </div>

    {/* {isLoading? <Spin tip='Loading...' style={{marginLeft:'50%'}}/>: */}

    <Table className='mainTable' loading={isLoading}  columns={columns} dataSource={PostGetlist}></Table> 
    </div>
 </> )
}
export default Posts
