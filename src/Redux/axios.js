import axios from 'axios';

export  function postRequest(url,payload) {
    return axios.post(url,payload).then((response) => response);
}


export function loginRequest(params) {
  // debugger
    console.log("params in Axios",params);
    var data = JSON.stringify({
      email: `${params.email}`,
      password: `${params.password}`,
    });
    console.log('data',data)
  
    var config = {
      method: "post",
      url: "https://react-assignment-api.herokuapp.com/api/login",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      data: data, 
    };
  
    return axios(config).then(function (response) { console.log(response);
      return response;
    });
  }

export function logoutRequest(params) {
  // debugger
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  // console.log('config',config)
  var config = {
    method: 'delete',
    url: 'https://react-assignment-api.herokuapp.com/api/logout',
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`,
    }
  };
  // console.log('config',config)
  return axios(config).then(function (response) { return response})
}

export function getPostRequest(params) {
  // debugger
  // var data= new FormData()
  console.log('params',params)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  // console.log('autho3',autho3)
  var config = {
    method: 'get',
    url: `https://react-assignment-api.herokuapp.com/api/posts?limit=1000&page=1&sort=name&order=asc&search=${params.payload}`,
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
  };
    // console.log('data',config)
  return axios(config).then(function(response) { console.log('reaponse',response.data); return (response.data)})
}

export function getCreateValuesRequest(params) {
  // debugger
  var form = new FormData();
  // console.log('params::::::',params.payload.name)
  // console.log('image',params.payload.image_url.file.originFileObj)
    form.append("name", params.payload.name)
    form.append("content", params.payload.content)
    form.append("image", params.payload.image_url.file.originFileObj)
  // console.log('form',form)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'post',
    url: 'https://react-assignment-api.herokuapp.com/api/posts',
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
      // ...form.getHeaders()
    },
    data : form
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}

export function deleteValuesRequest(params) {
  // debugger
  console.log('params',params)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'delete',
    url: 'https://react-assignment-api.herokuapp.com/api/posts/'.concat(params),
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data: params
  };
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}
export function showBlogValuesRequest (params) {
  console.log('params showBlogRequest',params)
  // debugger
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'get',
    url: 'https://react-assignment-api.herokuapp.com/api/posts/'.concat(params),
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    // data : params
  }; 
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}

export function editDataRequest (params) {
  // debugger
  console.log('params',params);
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var form = new FormData();
  form.append("name", params.payload.name);
  form.append("content", params.payload.content);
  {if(params.payload.image_url){
    form.append("image",params.payload.image_url.file.originFileObj)
  }
  }
  // form.append('image',params.payload.image_url.file.originFileObj)
  form.append("_method", "patch");
  // console.log('form',form)

  var config = {
    method: 'post',
    url: 'https://react-assignment-api.herokuapp.com/api/posts/'.concat(params.objectId),
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data : form
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}

export function publishDataRequest (params) {
  // debugger
  console.log('params',params)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'post',
    url: `https://react-assignment-api.herokuapp.com/api/posts/${params.payload.id}/publish/${!params.payload.is_published}`,
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data: params,
    params: {
      id: params.payload.id,
      claps_count: params.payload.claps_count,
      comments: params.payload.comments,
      created_at: params.payload.created_at,
      image_url: params.payload.image_url,
      is_published: !params.payload.is_published,
      name: params.payload.name,
      updated_at: params.payload.updated_at,
      content: params.payload.content
    }
    };
  return axios(config).then(function (response) { 
    console.log('response:::',response);
     return response;
  })
}
export function publishShowRequest (params) {
  console.log('params',params)
  // debugger
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'get',
    url: `https://react-assignment-api.herokuapp.com/api/public/posts?offset=${params.payload}`,
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    // data : params
  };
  return axios(config).then(function (response) {
    console.log(response)
    return response.data;
 })
}

export function publishShowOutRequest (params) {
  console.log('params',params)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'get',
    url: `https://react-assignment-api.herokuapp.com/api/public/posts/${params}`,
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data : params
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}

export function updateProfileRequest (params) {
  // debugger
  console.log('params',params)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var data = new FormData();
  // console.log('image_url',params.payload.image_url)
  data.append('first_name', params.payload.first_name);
  data.append('last_name', params.payload.last_name);
  data.append('image', params.payload.image_url.file.originFileObj);
  // console.log('params',params)
  data.append('_method', 'patch');
  
  var config = {
    method: 'post',
    url: 'https://react-assignment-api.herokuapp.com/api/update/profile',
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data : data
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}

export function createCommentRequest(params) {
  // debugger
  console.log('params',params)
  var data = JSON.stringify({
    comment: `${params.payload}`
  })
  // console.log('data',data)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'post',
    url: `https://react-assignment-api.herokuapp.com/api/posts/${params.id}/comments`,
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data : data
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response.data)})
}

export function deleteCommentrequest(params) {
  // debugger
  console.log('params',params)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'delete',
    url: `https://react-assignment-api.herokuapp.com/api/posts/comments/${params}`,
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data : params
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}

export function updateCommentRequest(params) {
  // debugger
  console.log('params',params)
  var data = JSON.stringify({
    comment: `${params.payload}`
  })
  // console.log(data)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'patch',
    url: 'https://react-assignment-api.herokuapp.com/api/posts/comments/'.concat(params.comment_id),
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    },
    data : data
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}

export function validateUserRequest(params) {
  console.log('params',params)
  const Autho = localStorage.getItem('result');
  const autho2 = JSON.parse(Autho);
  const autho3 = autho2.headers.authorization;
  var config = {
    method: 'get',
    url: 'https://react-assignment-api.herokuapp.com/api/validate-user',
    headers: { 
      'Content-Type': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest', 
      'Authorization': `${autho3}`, 
    }
  };
  // console.log('config',config)
  return axios(config).then(function(response) { console.log('response:::',response); return (response)})
}