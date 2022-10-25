import Actions from './actions';

const initialState = {
    loader: false,
    EditPostLoader: false,
    list:[],
    logIn: null,
    postList: [],
    PostGetlist: [],
    blogDetails: {},
    createDraw: false,
    PublishGetlist: [],
    publishShowOutDatas: [],
    publishUserDatails: [],
    emptyDraw: {},
    updateCommentOpen: [],
    scrollMore:  1,  
    hasMoreData: true,
    validateUserValues: null,
    buttonLoader: false,
    createComment:[],
    deleteComment:[],
    Comment: [],
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.ADD_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case Actions.ADD_SUCCESS: {   
            return {
              ...state,
              list: action.payload,
              loader: false
            }
        }
        case Actions.ADD_FAILURE: {
           return {
            ...state,
            loader: false
           }
        }
        case Actions.LOGIN_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case Actions.LOGIN_SUCCESS: {
            return {
                logIn: action.payload,
                loader: false
            }
        }
        case Actions.LOGIN_FAILURE: {
           return {
            ...state,
            loader: false
           }
        }
        case Actions.DELETE_USER_REQUEST: {
            return {
                ...state,
                loader: true
            }
        }
        case Actions.DELETE_USER_FAILURE: {
            return {
                ...state,
                loader: false
            }
        }
        case Actions.GET_POST_REQUEST: {
            return {
                ...state,
                loader: true
              }
          }
          case Actions.GET_POST_SUCCESS: {
            // console.log(action.payload)
            // console.log(state.PostGetlist) 
            return {
              ...state,
              PostGetlist: action.payload.data,
              loader: false
            }
          }    
          case Actions.GET_POST_FAILURE: {
            return {
              ...state,
              loader: false
            }
          }
          case Actions.UPLOAD_DATA_REQUEST:{
            return{
              ...state,
              loader: true
            }
          }
          case Actions.UPLOAD_DATA_SUCCESS: {
            // console.log(...action.payload)
            // console.log(action.payload)
            // console.log(...state.PostGetlist)
            // console.log(state.PostGetlist)
            return{
              ...state,
              PostGetlist: [...state.PostGetlist,action.payload.data] ,
              loader: false
            }
          }
          case Actions.UPLOAD_DATA_FAILURE: {
            return {
              ...state,
              loader: false
            }
          }
          case Actions.DELETE_POST_REQUEST : {
            return {
                ...state,
                loader: true
            }
          }
          case Actions.DELETE_POST_SUCCESS : {
            // console.log(action.payload)
            // console.log(state.PostGetlist)
            // console.log(...state.PostGetlist)
            return {
                ...state,
                PostGetlist: [...state.PostGetlist],
                loader: false
            }
          }
          case Actions.DELETE_POST_FAILURE : {
            return {
                ...state,
                loader: true
            }
          }
          case Actions.EDIT_DATA_REQUEST: {
            return {
              ...state,
              EditPostLoader: true
            }
          }
          case Actions.EDIT_DATA_SUCCESS: {
            // console.log(action.payload)
            // console.log(state.blogDetails)
            return {
              ...state,
              blogDetails: action.payload.data,
              EditPostLoader: false
            }
          }
          case Actions.EDIT_DATA_FAILURE: {
            return {
              ...state,
              EditPostLoader: false
            }
          }
          case Actions.CREATE_DRAW : {
            return {
                ...state,
                createDraw: true,
            }
          }
          case Actions.CLOSE_DRAW : {
            return {
                ...state,
                createDraw: false,
            }
          }
          case Actions.SHOW_BLOG_REQUEST: {
            return{ 
              ...state,
              loader: true
          }
          }
          case Actions.SHOW_BLOG_SUCCESS: {
            return{ 
              ...state,
              blogDetails: action.payload.data,
              loader: false
          }
          }
          case Actions.PUBLISH_REQUEST: {
            return {
              loader: true,
              PublishLoader: true
            }
          }
          case Actions.PUBLISH_SUCCESS: {
            // console.log(state.PostGetlist)
            // console.log(...state.PostGetlist)
            // console.log(state.blogDetails)
            // console.log(action.payload.config.params)
            return {
              loader: false,
              blogDetails: action.payload.config.params,
              // PostGetlist: action.paylaod.config.params,
              PublishLoader: false
            }
          }
          case Actions.PUBLISH_FAILURE: {
            return {
              loader: false,
              PublishLoader: false
            }
          }
          case Actions.DRAW_NULL: {
            return {
              ...state,
              blogDetails: action.payload 
            }  
          }
          case Actions.PUBLISH_SHOW_REQUEST: {
            return {
              ...state,
              hasMoreData: true,
            }
          }
          case Actions.PUBLISH_SHOW_SUCCESS: {
            if(state.scrollMore === 1) {
              return{
                ...state,
                PublishGetlist: [...action.payload]
              };
            }
            else {
              if(action.payload.length < 10) {
                if (action.payload.length === 0) {
                  return{
                    ...state,
                    hasMoreData: false
                  };
                }
                else{
                  return{
                    ...state,
                    PublishGetlist: [...state.PublishGetlist, ...action.payload],
                    hasMoreData: false
                  };
                }
              }
              else{
                return{
                  ...state,
                  PublishGetlist: [...state.PublishGetlist, ...action.payload],
                } 
              } 
            }
          }
          case Actions.PUBLISH_SHOW_FAILURE: {
            return {
              ...state,
              loader: false
            }
          }
          case Actions.PUBLISH_SHOW_OUT_REQUEST: {
            return {
              ...state,
              loader: true
            }
          }
          case Actions.PUBLISH_SHOW_OUT_SUCCESS: {
            // console.log(action.payload)
            return {
              ...state,
              publishShowOutDatas: action.payload,
              createComment: action.payload.data.comments,
              publishUserDatails: action.user,
              loader: false
            }
          }
          case Actions.PUBLISH_SHOW_OUT_FAILURE: {
            return {
              ...state,
              loader: false
            }
          }
          case Actions.CREATE_COMMENT_REQUEST: {
            return{
              ...state,
              buttonLoader: true
            }
          }
          case Actions.CREATE_COMMENT_SUCCESS: {
            console.log(...action.payload)
            // console.log(action.payload)
            // console.log(...state.publishShowOutDatas.data.comments)
            // console.log(state.publishShowOutDatas.data.comments)
            console.log(...state.createComment)
            return {
              ...state,
              createComment: [...state.createComment,...action.payload],
              buttonLoader: false
            }
          }
          case Actions.CREATE_COMMENT_FAILURE: {
            return{
              ...state,
              buttonLoader: false
            }
          }
          case Actions.UPDATE_COMMENT_OPEN: {
            return {
              ...state,
              updateCommentOpen: action.payload
            }
          }
          case Actions.UPDATE_COMMENT_REQUEST: {
            return {
              ...state,
            }
          }
          case Actions.UPDATE_COMMENT_SUCCESS: {
            console.log(action.payload)
            console.log(...state.publishShowOutDatas.data.comments)
            console.log(state.createComment)
            console.log(...state.createComment)
            console.log('action.payload.commentReducer',action.payload.commentReducer)
            console.log('action.payload.editIdValue',action.payload.editIdValue)
            return {
              ...state,
              createComment: [...action.payload.commentReducer],
            }
          }
          case Actions.UPDATE_COMMENT_FAILURE: {
            return {
              ...state,
            }
          }
          case Actions.DELETE_COMMENT_REQUEST: {
            return {
              ...state
            }
          }
          case Actions.DELETE_COMMENT_FAILURE: {
            return {
              ...state
            }
          }
          case Actions.DELETE_COMMENT_SUCCESS: {
            // console.log(state.createComment)
            // console.log(action.payload)
            // console.log(state.publishShowOutDatas)
            // console.log(...state.publishShowOutDatas.data.comments)
            // console.log('deleteComment',state.deleteComment)
            return{
              ...state,
              createComment: [...action.payload.publishId],
              // deleteComment: [...state.createComment,...action.payload],
            }
          }
          case Actions.SCROLL_MORE: {
            return {
              ...state,
              scrollMore : state.scrollMore + 1
            }
          }
          case Actions.COUNT_VALUE: {
            return {
              ...state,
              scrollMore: 1
            }
          }
          case Actions.UPDATE_PROFILE_REQUEST: {
            return {
              ...state
            }
          }
          case Actions.UPDATE_PROFILE_SUCCESS: {
            return{
              ...state,
            }
          }
          case Actions.UPDATE_PROFILE_FAILURE: {
            return{
              ...state
            }
          }
          case Actions.VALIDATE_USER_FAILURE: {
            return {
              ...state
            }
          }
          case Actions.VALIDATE_USER_SUCCESS: {
            return {
              ...state,
              validateUserValues: action.payload
            }
          }
          case Actions.VALIDATE_USER_FAILURE: {
            return {
              ...state
            }
          }
        default:
        return state
    }
}

export default reducer