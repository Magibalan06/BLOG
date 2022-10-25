import React, { useEffect, useState } from 'react';
import { Avatar, Button, Input, Layout, List, Skeleton, Form, Modal, Spin, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../../Redux/actions';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import InfiniteScroll from "react-infinite-scroll-component";


export const Dashboard = () => {    

  const [editIdValue, setEditIdVal] = useState({})

  const commentReducer = useSelector((state) => state.createComment)
  console.log(commentReducer)   

  // const deleteCommentReducer = useSelector((state) => state.deleteComment)
  // console.log('deleteComment',deleteCommentReducer)

  const buttonLoader = useSelector((state)=> state.buttonLoader)

  const updateCommentData = useSelector((state) => state.updateCommentData)
  // console.log('updateCommentData',updateCommentData)

  const isLoading = useSelector((state) => state.loader)    
  const postGetValues = useSelector((state)=> state.PublishGetlist)
  // console.log('postGetValues::::::',postGetValues)

  const publishShowOutDatas = useSelector((state) => state.publishShowOutDatas)
  // console.log('publishShowOutDatas',publishShowOutDatas)

  const { Content, Sider } = Layout;
  const publishUserDatails = useSelector((state) => state.publishUserDatails)

  var scrollMore = useSelector((state)=> state.scrollMore)
  console.log('scrollMore',scrollMore)

  const userId0 = localStorage.getItem('result')
  const userId = JSON.parse(userId0)
  // console.log("userId",userId?.data?.id)

  const hasMoreData = useSelector((state) => state.hasMoreData)
  // console.log('hasMoreData',hasMoreData)

  var editBoolean = false;
  var newPostId = {};
  var commentId = {};

  const { TextArea } = Input;
  const [form] = useForm()

  // const [editbutton, setEditButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCommentBoxVisible, setIsCommentBoxVisible] = useState(false)
  const [disable,setDisable] = useState(true)



  const userDetails = () => {
      setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: Actions.PUBLISH_SHOW_REQUEST,
      payload: scrollMore
    })
  },[dispatch,scrollMore]);


  const loadMoreData = () => {
    dispatch({
      type: Actions.SCROLL_MORE
    }) 
  }  

    useEffect(() => {
      dispatch({
        type: Actions.COUNT_VALUE,
      });
    }, []);


  const postShowOut = (item) => {
    console.log(item)
    dispatch({
      type: Actions.PUBLISH_SHOW_OUT_REQUEST,
      payload: item,
      post_id: editIdValue,
      
    })
    newPostId = item
    // console.log(newPostId)
    form.resetFields()
  }

  console.log('editIdValue after onClick',editIdValue)

  const onFinish = (values) => {
    
      //  var editCommentIndexOf = publishShowOutDatas.data.comments.filter(i=> i !== editIdValue)
      //  if(editCommentIndexOf !== 1) {
      //   publishShowOutDatas.data.comments.splice(editCommentIndexOf,1)
      //  }
      
      
      {editIdValue &&  (editIdValue.comment = values.comment) }

       console.log('editIdValue',editIdValue)
        // debugger

    {editIdValue?.id ? 
      
      dispatch({
        type: Actions.UPDATE_COMMENT_REQUEST,
        payload: values.comment,
        commentReducer: commentReducer,
        editIdValue: editIdValue,
        id: editIdValue,
        comment_id: editIdValue.id
      })
      
       :

      dispatch({
        type: Actions.CREATE_COMMENT_REQUEST,
        payload: values.comment,
        id: publishShowOutDatas.data.id,
        publishId: publishShowOutDatas
      })

      setEditIdVal(null)
      form.resetFields( )
    }  

    form.resetFields()
     editBoolean = false
    };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

  const deleteComment = (item) => {
    console.log('item',item)

    var publishShowOutDatasdatacomments = commentReducer
    // console.log(publishShowOutDatasdatacomments)

    var publishShowOutDatasdatacomments01 = publishShowOutDatasdatacomments.filter(i=> i !== item)

    dispatch({
      type: Actions.DELETE_COMMENT_REQUEST,
      payload: item.id,
      publishId: publishShowOutDatasdatacomments01
    })


  }

  const cancel = (e) => {
    console.log(e);
  };

 

  return (
    <div>

      <Layout
            className="site-layout-background-1">

            <Sider className="site-layout-background" width={'20%'} theme="light" style={{
           
              }}>
                   <h2 style={{margin:'15px 15px 0'}}>Recent blogs</h2>

                <div
                  id="scrollableDiv"
                  style={{
                    height: '88vh',
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                  }}
                >
                  
              <InfiniteScroll
                dataLength={postGetValues? postGetValues.length : 100 }
                next= {loadMoreData}
                hasMore={hasMoreData}
                loader={
                  <Skeleton
                    avatar
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                // endMessage={<Divider plain>End of Blog </Divider>}
                scrollableTarget="scrollableDiv"
              >
              {/* <h2 style={{margin:'22px 15px 0'}}>Recent blogs</h2> */}
              <div >
              
            <List
                itemLayout="horizontal"
                dataSource={postGetValues}
                className='listStylePublish'
                style={{cursor:'pointer'}}
                renderItem={(item) => (
                  <List.Item className='listItemStyle'>

                    <List.Item.Meta className='listItemMetaStyle'

                      style={{padding: '0 10px'}}
                      avatar = {item?.user?.profile_url ? <Avatar src={item?.user?.profile_url} /> : <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>USER</Avatar>}
                      title={item?.name}
                      description={`-${item?.user?.first_name}, ${moment(item?.created_at).format("DD-MMM-YYYY")}`}
                      itemLayout="horizontal"
                      
                      onClick={()=> postShowOut(item)}>

                     </List.Item.Meta>

                  </List.Item>
                )}
              />
              </div>
                    </InfiniteScroll>
                    </div>

            </Sider>

            {isLoading?<Spin tip='Loading...' style={{marginLeft:'35%', marginTop:'2%'}}/>:

            <Content className='contentBlogout' style={{height:'93vh', overflow:'scroll'}}>
              {/* {console.log('def',publishUserDatails )} */}

              {(publishShowOutDatas?.data) ?

              <div className='DashRightDiv'>

                <h1 className='publishShowOutDatasName'>{publishShowOutDatas?.data?.name}</h1>


                <div className='publishShowOutUserInfo' >

                  {publishUserDatails?.payload?.user?.profile_url ?
                   <Avatar  
                      className='avatarColor' 
                      src={publishUserDatails?.payload?.user?.profile_url}/> 

                    :

                    <Avatar  
                      className='avatarColor'  
                      style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                        USER
                    </Avatar>}

                  <div className='publishShowOutUserCreated'>

                    <h4 className='publishShowOutUserFirstName'
                      onClick={userDetails}>
                        {publishUserDatails?.payload?.user?.first_name} {publishUserDatails?.payload?.user?.last_name}
                    </h4>

                    <h4>{moment(publishUserDatails?.payload?.user?.updated_at).format("DD-MMM-YYYY")}</h4>

                  </div>

                     <Modal title="User Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} 
                        footer={[]}>

                          <p><b>NAME:</b>  {publishUserDatails?.payload?.user?.first_name} {publishUserDatails?.payload?.user?.last_name}</p>
                          <p><b>EMAIL:</b>  {publishUserDatails?.payload?.user?.email}</p>
                          <p><b>USER ID:</b> {publishUserDatails?.payload?.user?.id}</p>

                    </Modal>
                 </div>
              
              <div>
                 <p style={{textIndent: '50px', margin:'3% 5% 5% 5%', fontSize:'18px'}}>{publishShowOutDatas?.data?.content}</p>
                  <img src={publishShowOutDatas?.data?.image_url} style={{width:'70vw',height:'100vh', margin:'0 5% '}} alt="No Image"/>
            
            <Form 
              id='Form'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed} 
              autoComplete="off"
              form={form}>

              <Form.Item name="comment" className='commentTextArea' >

                <TextArea className='commentTextArea' rows={6} placeholder='Add a comment' 
                   onChange={(e) => {
                   e.target.value.trim("").length > 0 ?
                   setDisable(false) : setDisable(true)}}/>

              </Form.Item>

              <Form.Item>
                <Button type="primary"
                  loading={buttonLoader}  
                  htmlType="submit" 
                  className='commentButton'
                  disabled={disable}
                   > 

                    {editIdValue?.id ? "Update" : "Comment"} 

                </Button>
              </Form.Item>
            </Form>

            </div>

            <hr></hr>

          <div className='commentSide'>

            <h1 style={{fontSize: '25px'}}>Comments</h1>

            <List
                itemLayout="horizontal"
                dataSource={commentReducer}
                className='listStylePublish'
                renderItem={(item) => (

                  <List.Item className='listItemStyle' 
                  style={{borderBottom: '1px solid gray',
                           padding:' 10px 5px 5px'}}>

                    <List.Item.Meta className='listItemMetaStyle'
                    style={{padding: '5px 10px '}}

                    avatar = {item?.user?.profile_url ? 
                                <Avatar src={item?.user?.profile_url} /> 
                                :
                                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>USER</Avatar>}

                      description={` ${moment(item?.created_at).startOf('seconds').fromNow()}`}

                      title={`${item?.user?.first_name}`}
                      itemLayout="horizontal"

                      onClick={()=> {
                        console.log(item)
                        }} 
                      onMouseEnter={()=>console.log(item?.user?.email)}>

                      </List.Item.Meta>
                      
                      {(userId?.data?.email === item?.user?.email)? 

                      "":""}


                      {item?.comment}  

                    {(userId?.data?.email===item?.user?.email)?

                    <h4 className='EdidtDeleteComment'>
                       <EditOutlined className='editComment01' onClick={() => {
                          setIsCommentBoxVisible(true)
                          editBoolean = true;
                          form.setFieldsValue(item)
                          setEditIdVal(item)
                       }}/>

                    <Popconfirm
                      title="Are you sure to delete this Comment?"
                      onConfirm={()=> deleteComment(item)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No">

                        <DeleteOutlined className='editComment01'/>

                    </Popconfirm></h4>
                    
                    
                    :

                    <div 
                      style={{marginBottom: '25px'}}>
                    </div>  

                    }
                   
                    

                  </List.Item>
                  
                  
                )}
                
              />  
              </div> <hr/>
            </div>
            :
            <div><h1 className='selectABlog'>Select A blog</h1></div>
            }
            
        </Content>}
      
      </Layout>
    </div>
  )

}
export default Dashboard
