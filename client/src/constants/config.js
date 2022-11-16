// API NOTIFICATION MESSAGE
exports.API_NOTIFICATION_MESSAGE = {
    success: {
        title: "success",
        message: "Data Successfully loaded"
    },
    requestFailure: {
        title: "error",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "error",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkFailure :{
        title: "error",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    },
}

exports.SERVICE_URLS = {
    userSignup : { url: '/signup', method: 'POST'},
    userLogin: { url: '/login', method: 'POST' },
    userLogout: {url: '/logout', method: "POST"},
    uploadFile: { url: 'file/upload', method: 'POST' },
    createPost: { url: 'create', method: 'POST' },
    getAllPosts: { url: '/posts', method: "GET", params: true },
    getPostById: { url: 'post', method: "Get", query: true },
    updatePost: { url: 'update', method: 'PUT', query: true },
    deletePost: { url: 'delete', method: "DELETE", query: true },
    newComment: { url: '/newcomment', method: "POST" },
    getAllComments: { url: '/comments', method: "GET", query: true},
    deleteComment: { url: '/comment/delete', method: "DELETE", query: true }
}