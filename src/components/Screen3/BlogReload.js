import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Actions from '../../Redux/actions'

export const BlogReload = () => {
    const isLoading = useSelector((state) => state.loader)    
    const {id} = useParams()
    const postGetList = useSelector((state) => state.blogDetails);
    console.log('postGetList', postGetList)
    const dispatch = useDispatch();  

    useEffect (() => {
        dispatch({
            type: Actions.SHOW_BLOG_REQUEST,
            payload: id
        })
    },[])


  return (<>
    {isLoading? <Spin tip='Loading...' style={{marginLeft:'50%'}}/> : 
  
  
  <div className='blogDetails'>
    <div className='blogImage'>
        <img src={`${postGetList?.data?.image_url}`} alt={`image`} style={{width:'88vw',margin:'0 5%'}}/>
    </div>
    <div className='blogName'>
        
        <h1>{postGetList?.data?.name}</h1>
    </div>
    <div className='blogContent'>
        {postGetList?.data?.content}
    </div>
  </div>}

  </>)

      {/* {isLoading ? <Skeleton /> : <BlogReload/> } */}


}
export default BlogReload