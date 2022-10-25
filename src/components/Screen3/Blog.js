import { Button, Popconfirm, Skeleton, Spin } from 'antd';
import React, { useEffect } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../../Redux/actions';
import Draw  from './Drawer';
import Loader from './Loader';


export default function Blog() {
  const EditPostLoader = useSelector((state)=> state.EditPostLoader)
  const isLoading = useSelector((state) => state.loader)    
  const PublishLoader = useSelector((state) => state.PublishLoader)

    const {id} = useParams()
    const navigate = useNavigate();
    var postGetList = useSelector((state)=> state.blogDetails);

    // console.log('postGetList', postGetList)
    // console.log(postGetList?.payload) 

    const dispatch = useDispatch();  
    const createDraw = useSelector((state) => state.createDraw) 
    
    useEffect(() => {
      dispatch({
        type: Actions.SHOW_BLOG_REQUEST,
        payload: id,
        postGetList: postGetList
      })
    },[])
    
    const showDrawer = () => {
        dispatch({
            type: Actions.CREATE_DRAW,
            payload: true
        })
    }
    const publishEventBlog = (postGetList) => {
      console.log(postGetList?.is_published)
          dispatch({
            type: Actions.PUBLISH_REQUEST,
            payload: postGetList,
          })
   
    }

    const confirm = (e) => {
      console.log(e);
      // console.log('delete::::',postGetList)
                dispatch({
                    type: Actions.DELETE_POST_REQUEST,
                    payload: postGetList.id,
                    null: ""
                })
                navigate(-1)
    };
    
    const cancel = (e) => {
      console.log(e);
    };
  return (<>
  
    <div className='back'>
        <Button className='backButton' onClick={()=> navigate(-1)}>Back</Button>
        <div className='operation'>
          <Popconfirm
            title="Are you sure to delete this Blog?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">

              <DeleteOutlined style={{marginRight:'10px'}} />

            </Popconfirm>

                <Button type='primary' loader={EditPostLoader}  onClick={showDrawer}>Edit</Button> 

                {createDraw && <Draw/>}

               <Button
                  loading={PublishLoader}
                    style={{marginLeft:'10px'}}
                    type='primary'
                      onClick={()=>publishEventBlog(postGetList)}>
                        {
                        (postGetList?.is_published) ?
                        "UnPublish":
                        "Publish"
                        }
               </Button>
          </div>


    </div>


        {isLoading?  
        
        <Loader/>
        
      :  
      
        <div className='blogDetails'>
          <div className='blogImage'>
            <img src={`${postGetList?.image_url}`} alt={`image`} style={{width:'88vw',margin:'0 5%'}}/>
          </div>
          <div className='blogName'>
            <h1>{postGetList?.name}</h1>
          </div>
          <div className='blogContent'>
            {postGetList?.content}
          </div>
        </div> }



   
    
  </>)
}
