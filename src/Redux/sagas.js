import { loginRequest, postRequest, logoutRequest, getPostRequest, getCreateValuesRequest, deleteValuesRequest, showBlogValuesRequest, editDataRequest, publishDataRequest, publishShowRequest, publishShowOutRequest,updateProfileRequest, createCommentRequest, deleteCommentrequest, updateCommentRequest, validateUserRequest  } from './axios';
import { takeEvery, put, call } from 'redux-saga/effects';
import Actions from './actions';
import { message } from 'antd';
// import { Navigate } from 'react-router-dom';

function* postList (param) {
    console.log('param',param)
    
    try {
        const response = yield call (() => 
        postRequest("https://react-assignment-api.herokuapp.com/api/register",param.payload)
        )
        yield put ({ 
          type: Actions.ADD_SUCCESS,
          payload: response.data})
      // localStorage.getItem('CreateValues')
        
    }
    catch (error) {
        yield put ({ type: Actions.ADD_FAILURE})
    }
}

function* loginList(params) {
  console.log(params);
  // debugger
    try {
      const result = yield call(() => loginRequest(params.payload));
      // const getPostList = yield call (() => getPostRequest(params))

      yield put({
        type: Actions.LOGIN_SUCCESS,
        payload: result,
      });
     
      localStorage.setItem("result", JSON.stringify(result));
      params.navigate('/login/posts')
      console.log('Successfully Login')
    } catch (error) {
      yield put({ type: Actions.LOGIN_FAILURE });
    }
}

function* logoutList(params) {
  // debugger
  try {
    
    console.log('params',params)
    const logOut = yield call (() => logoutRequest(params.payload))
    console.log('logOut',logOut)
    yield put ({
      type: Actions.DELETE_USER_SUCCESS,
      payload: logOut,
    });
    message.success('Logout Successfully');
    localStorage.removeItem('result')
    params.navigate('/')
    
  } catch (error) {
    yield put ({ type: Actions.DELETE_USER_FAILURE })
    message.error('Logout Failed');;  
  }
}

function* getPost(params) {
  // debugger
  console.log('params',params)
  try {
    const getPostList = yield call (() => getPostRequest(params))
    yield put ({
      type: Actions.GET_POST_SUCCESS, 
      payload: getPostList
    });   
    
  }catch (error) {
      yield put ({ type: Actions.GET_POST_FAILURE, message:error.message });
  }
}

function* getCreateValues (params) {
  console.log('params',params)
  try {
    const createValues = yield call (() => getCreateValuesRequest(params))
    console.log('createValues', createValues)
    yield put ({
      type: Actions.UPLOAD_DATA_SUCCESS,
      payload: createValues
    });
    // yield put ({
    //   type: Actions.GET_POST_REQUEST,
    //   payload: params.null
    // });
    message.success('Successfully created');
    }catch (error) {
      yield put ({
        type: Actions.UPLOAD_DATA_FAILURE ,message:error.message
      })
      message.error('Failed to create a blog');
    }
}

function* deletePostRequest(params) {
  // debugger
  console.log('params',params)
  try {
    const deleteValues = yield call (() => deleteValuesRequest(params.payload))
    console.log('deleteValues',deleteValues)
    yield put ({
      type: Actions.DELETE_POST_SUCCESS,
      payload: params.PostGetlist
    })
    // yield put({ 
    //   type: Actions.GET_POST_REQUEST,
    //   payload: params.null
    // })
    message.success('Deleted Successfully');
  }catch (error) {
      yield put ({
        type: Actions.DELETE_POST_FAILURE , message:error.message
      })
      message.error('Failed to Delete');
    }
  }

  function* showBlogDetails(params) {
    // debugger
    console.log('params', params)
    try {
      const showBlogValues = yield call (() => showBlogValuesRequest(params.payload))
      yield put ({
        type: Actions.SHOW_BLOG_SUCCESS,
        payload: showBlogValues
      })
      console.log(showBlogValues)
      
    }catch (error) {
      yield call ({
        type: Actions.SHOW_BLOG_FAILURE , message:error.message
      })
    }
  }

  function* editData(params) {
    // debugger
    console.log('params',params);
    try{
      const editDataValues = yield call (() => editDataRequest(params))
      const showBlogValues = yield call (() => showBlogValuesRequest(params.id))
      console.log('editDataValues',editDataValues)
      console.log('showBlogValues',showBlogValues)
      yield put ({
        type: Actions.EDIT_DATA_SUCCESS,
        payload: showBlogValues
      })
      // yield put ({
      //   type: Actions.SHOW_BLOG_REQUEST,
      //   payload: params.objectId
      // })
      message.success('Edited Successfully');
      
    }catch (error) {
      yield call ({
        type: Actions.EDIT_DATA_FAILURE , message:error.message
      })
      message.error('Failed to Edit');
    }
  }

  function* publishData (params) {
    // debugger
    console.log('params',params);
    try{
      const publishDataValues = yield call (()=> publishDataRequest(params))
      // const getPostList = yield call (() => getPostRequest(params.PostGetlist))
      console.log('publishDataValues',publishDataValues)
      // console.log('getPostList',getPostList)
      yield put ({
        type: Actions.PUBLISH_SUCCESS,
        payload: publishDataValues
      })
      message.success(publishDataValues.data.message)
    }catch (error) {
      yield call ({
        type: Actions.PUBLISH_FAILURE, message:error.message
      })
    }
  }

  function* publishShow (params) {
    console.log('params',params)
    // debugger
    try {
      const publishShowValues = yield call (() => publishShowRequest(params))
      console.log('publishShowValues' , publishShowValues)
      yield put ({
        type: Actions.PUBLISH_SHOW_SUCCESS,
        payload: publishShowValues
      })
      console.log('publishShowValues',publishShowValues)
    }catch (error) {
      yield put ({
      type: Actions.PUBLISH_SHOW_FAILURE,
      message: error.message
    })  
    }
  }

  function* publishShowOut (params) {
    console.log('params',params)
    try {
      const publishShowOutValues = yield call (() => publishShowOutRequest(params.payload.id))
      console.log('publishShowOutValues',publishShowOutValues)
      yield put ({
        type: Actions.PUBLISH_SHOW_OUT_SUCCESS,
        payload: publishShowOutValues,
        user: params
      })
    }
    catch (error) {
      yield call ({
      type: Actions.PUBLISH_SHOW_OUT_FAILURE})
    }
  }

  function* updateProfile(params) {
    // debugger
    console.log('params',params)
    try {
      const updateProfileValues =  yield call (() => updateProfileRequest(params))
      console.log('updateProfileValues',updateProfileValues)
      yield put ({
        type: Actions.UPDATE_PROFILE_SUCCESS,
        payload: updateProfileValues
      })
      yield put ({
        type: Actions.VALIDATE_USER_REQUEST,
        payload: params
      })
      message.success('Profile Updated');
    } catch (error) {
      yield call ({
        type: Actions.UPDATE_PROFILE_FAILURE
      })
      message.error('Failed to update profile');
    }
  }

  function* createComment (params) {
    // debugger
    console.log('params', params)
    try {
      const createCommentValues = yield call (() => createCommentRequest(params))
      console.log('createCommentValues',createCommentValues)
      yield put ({
        type: Actions.CREATE_COMMENT_SUCCESS,
        payload: createCommentValues
      })
      // yield put({
      //   type: Actions.PUBLISH_SHOW_OUT_REQUEST,
      //   payload: params.publishId.data
      // })
    }catch(error) {
      yield put ({
        type: Actions.CREATE_COMMENT_FAILURE
      })}
    }
  
    function* deleteComment (params) {
      console.log('params',params)
      try {
        const deleteCommentValues = yield call (() => deleteCommentrequest (params.payload))
        console.log('deleteCommentValues',deleteCommentValues)
        yield put ({
          type: Actions.DELETE_COMMENT_SUCCESS,
          payload: params
        })
        // yield put ({
        //   type: Actions.PUBLISH_SHOW_OUT_REQUEST,
        //   payload: params.publishId.data

        // })
        message.success('Comment Deleted');
      } catch (error) {
        yield call ({
          type: Actions.DELETE_COMMENT_FAILURE, message:error.message
        })
        message.error('Failed to Delete');
      }
    }

    function* updateComment (params) {
      // debugger
      const id =  params?.id
      console.log('params',params)
      try {

        const updateCommentValues = yield call (() => updateCommentRequest (params))
        console.log('updateCommentValues',updateCommentValues)
        yield put ({
          type: Actions.UPDATE_COMMENT_SUCCESS,
          payload: params
        })

        // yield put ({
        //   type: Actions.PUBLISH_SHOW_OUT_REQUEST,
        //   payload: {id}
        // })
        message.success('Comment Updated');
        
      }catch (error) {
        yield call ({
          type: Actions.UPDATE_COMMENT_FAILURE, message: error.message
        })
        message.error('Failed to Update');
      }
    }

    function* validateUser (params) {
      try {
        // debugger
        const validateUserValues = yield call (() => validateUserRequest(params))
        console.log('validateUserValues',validateUserValues)
        yield put ({
          type: Actions.VALIDATE_USER_SUCCESS,
          payload: validateUserValues
        })

        
      }catch(error) {
        yield put ({
          type: Actions.VALIDATE_USER_FAILURE, message:error.message
        })

        localStorage.removeItem('result')
        message.error('Token Expired')
        params.navigate('/')
      }
    }

export default function* handleFunctions() {
    yield takeEvery (Actions.ADD_REQUEST,postList)
    yield takeEvery (Actions.LOGIN_REQUEST,loginList)
    yield takeEvery (Actions.DELETE_USER_REQUEST,logoutList)
    yield takeEvery (Actions.GET_POST_REQUEST,getPost)
    yield takeEvery (Actions.UPLOAD_DATA_REQUEST,getCreateValues)
    yield takeEvery (Actions.DELETE_POST_REQUEST,deletePostRequest)
    yield takeEvery (Actions.SHOW_BLOG_REQUEST,showBlogDetails)
    yield takeEvery (Actions.EDIT_DATA_REQUEST,editData)
    yield takeEvery (Actions.PUBLISH_REQUEST,publishData)
    yield takeEvery (Actions.PUBLISH_SHOW_REQUEST,publishShow)
    yield takeEvery (Actions.PUBLISH_SHOW_OUT_REQUEST,publishShowOut)
    yield takeEvery (Actions.UPDATE_PROFILE_REQUEST,updateProfile)
    yield takeEvery (Actions.CREATE_COMMENT_REQUEST,createComment)
    yield takeEvery (Actions.DELETE_COMMENT_REQUEST,deleteComment)
    yield takeEvery (Actions.UPDATE_COMMENT_REQUEST,updateComment)
    yield takeEvery (Actions.VALIDATE_USER_REQUEST,validateUser)
}

