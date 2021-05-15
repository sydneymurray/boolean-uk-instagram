//////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIBLES ARE DECLARED HERE ///////////////////////////////////////////////

let users = []
let posts = []
let currentUser = null
let parentWrapper = null


/////////////////////////////////////////////////////////////////////////////
// MAIN PROGRAM STARTS HERE

// RETRIEVE USER ARRAY FROM JSON and store in users
fetch("http://localhost:3000/users")
    .then(function (promise){
            return promise.json()
        })
        .then(function (retrievedArray){
            users = retrievedArray 

            // NOW RETRIEVE ALL POSTS FROM JSON AND STORE IN posts
            displayAllUsers(users)       
        })







//////////////////////////////////////////////////////////////////////////////////
// ALL FUNCTIONS ARE DECLARED HERE ///////////////////////////////////////////////


// DISPLAY THE MAIN PAGE
function displayMainPage(){
    displayHeader()
    displayMain()
}



function displayHeader(){
    // FIND THE ROOT CONTAINER DIV
    let rootContainer = document.querySelector("#root")
 
    // CREATE MAIN HEADER
    let mainHeader = document.createElement("header")
    mainHeader.setAttribute("class","main-header")
    rootContainer.append(mainHeader)
    
    // CREATE WRAPPER DIV
    let headerWrapperDiv = document.createElement("div")
    headerWrapperDiv.setAttribute("class","wrapper headerWrapper")
    mainHeader.append(headerWrapperDiv)

    // TELL DISPLAY WHERE ALL USERS FUNCTION HERE TO DISPLAY THEM
    parentWrapper = headerWrapperDiv
    
    // RETRIEVE USER ARRAY FROM JSON & DISPLAY THEM
    retrieveUserArray()
}

// RETRIEVE USER ARRAY FROM JSON & DISPLAY THEM
function retrieveUserArray(){
    fetch("http://localhost:3000/users")
        .then(function (promise){
            return promise.json()
        })
        .then(function (retrievedArray){
            users = retrievedArray 
            displayAllUsers(users)       
        })
}

// DISPLAY ALL USERS IN HEADER
function displayAllUsers(users){
    for (user of users)
        displayUser(user)
}

// DISPLAY USER
function displayUser(user){
    // CREATE A CHIP DIV
    let chipDiv = document.createElement("div")
    chipDiv.setAttribute("class","chip")

    // USE the parentWrapper VARIABLE TO KNOW WHERE TO DISPLAY THE USERS 
    parentWrapper.append(chipDiv)

    // CREATE AN AVATAR DIV
    let smallAvatarDiv = document.createElement("div")
    smallAvatarDiv.setAttribute("class","avatar-small")
    chipDiv.append(smallAvatarDiv)

    // CREATE AN IMAGE TAG AND DISPLAY AVATAR
    let smallAvatar = document.createElement("img")
    smallAvatar.setAttribute("class","avatar-small")
    smallAvatar.setAttribute("src",user.avatar)
    smallAvatar.setAttribute("alt",user.username)
    smallAvatarDiv.append(smallAvatar)

    // SHOW USERNAME
    let usernameSpan = document.createElement("span")
    usernameSpan.innerText = user.username
    chipDiv.append(usernameSpan)
}

function displayMain(){
    // FIND THE ROOT CONTAINER DIV
    let rootContainer = document.querySelector("#root")

    // CREATE MAIN SECTION
    let mainSection = document.createElement("main")
    mainSection.setAttribute("class","wrapper mainWrapper")
    rootContainer.append(mainSection)
     
    // CREATE A NEW POST SECTION
    displayCreateNewPost()
    
    // CREATE & DISPLAY NEWS FEED SECTION
    displayNewsFeed()
}  

// CREATE A NEW POST SECTION
function displayCreateNewPost(){
    let mainSection = document.querySelector("main")
    let createNewPostSection = document.createElement("section")
    createNewPostSection.setAttribute("class","create-post-section")
    mainSection.append(createNewPostSection)
    
    // CREATE FORM 
    let newPostForm = document.createElement("form")
    newPostForm.setAttribute("id","create-post-form")
    newPostForm.setAttribute("autocomplete","off")
    createNewPostSection.append(newPostForm)

    // CREATE HEADING H2
    let heading = document.createElement("h2")
    heading.innerText = "Create a post"

    // CREATE IMAGE LABEL
    let imageLabel = document.createElement("label")
    imageLabel.setAttribute("for","image")
    imageLabel.innerText = "Image"
    newPostForm.append(imageLabel)

    // CREATE IMAGE INPUT
    let imageInput = document.createElement("input")
    imageInput.setAttribute("id","image")
    imageInput.setAttribute("name","image")
    imageInput.setAttribute("type","text")
    newPostForm.append(imageInput)

    // CREATE TITLE LABEL
    let tileLabel = document.createElement("label")
    tileLabel.setAttribute("for","title")
    tileLabel.innerText = "Title"
    newPostForm.append(tileLabel)

    // CREATE TITLE INPUT
    let titleInput = document.createElement("input")
    titleInput.setAttribute("id","title")
    titleInput.setAttribute("name","title")
    titleInput.setAttribute("type","text")
    newPostForm.append(titleInput)
 
    // CREATE CONTENT LABEL 
    let contentLabel = document.createElement("label")
    contentLabel.setAttribute("for","content")
    contentLabel.innerText = "Content"
    newPostForm.append(contentLabel)

    // CREATE A CONTENT TEXT AREA
    let contentTextArea = document.createElement("textarea")
    contentTextArea.setAttribute("id","content")
    contentTextArea.setAttribute("name","content")
    contentTextArea.setAttribute("rows","2")
    contentTextArea.setAttribute("coloumns","30")
    newPostForm.append(contentTextArea)
  
    // CREATE A DIV FOR ACTION BUTTONS
    let newPostFormDiv = document.createElement("div")
    newPostFormDiv.setAttribute("class","action-btns")
    newPostForm.append(newPostFormDiv)   

    // CREATE A PREVIEW BUTTON
    let previewButton = document.createElement("button")
    previewButton.setAttribute("id","preview-btn")
    previewButton.setAttribute("type","button")
    previewButton.innerText = "Preview"
    newPostFormDiv.append(previewButton)

    // CREATE A SUBMIT BUTTON
    let submitButton = document.createElement("button")
    submitButton.setAttribute("type","submit")
    submitButton.innerText = "Submit"
    newPostFormDiv.append(submitButton)
}

// RETRIEVE NEWS FEED FROM JSON ARRAY AND DISPLAY THEM
function displayNewsFeed(){
    fetch("http://localhost:3000/posts")
        .then(function (promise){
            return promise.json()
        })
        .then(function (postsArray){
            displayAllPosts(postsArray)
        })
}


// DISPLAY NEWS FEED
function displayAllPosts(postsArray){
    // LOCATE MAIN SECTION
    let mainSection = document.querySelector("main")

    // CREATE FEED SECTION
    let newsFeedSection = document.createElement("section")
    newsFeedSection.setAttribute("class","feed")
    mainSection.append(newsFeedSection)

    // CREATE UNORDERED LIST ELEMENT FOR COMMENTS
    let postList = document.createElement("ul")
    postList.setAttribute("class","stack")
    newsFeedSection.append(postList)

    // DISPLAY EACH POST AS A LIST ITEM
    for (const post of postsArray) 
        displayNewsPost(post)

}

// DISPLAY A POST ITEM
function displayNewsPost(post){
    // LOCATE THE STACK DIV
    let postList = document.querySelector(".stack")

    // CREATE A LIST ITME FOR THE CHIP
    let postListItem = document.createElement("li")
    postListItem.setAttribute("class","post")
    postList.append(postListItem)
    
    // FIND USERID FROM POST
    let user = users.find(function (user) {
        return user.id === post.userId;})
    
    // TELL DISPLAY USER WHERE TO DISPLAY THE CHIP
    parentWrapper = postListItem
    displayUser(user)
    
    // CREATE A DIV CONTAINER FOR POST IMAGE
    let postImageDiv = document.createElement("div")
    postImageDiv.setAttribute("class","post--image")
    postListItem.append(postImageDiv)

    // DISPLAY POST IMAGE
    let postImage = document.createElement("img")
    postImage.setAttribute("src",post.image.src)
    postImage.setAttribute("alt",post.image.alt)
    postImage.setAttribute("width","320px")
    postImageDiv.append(postImage)

    // CREATE CONTAINER DIV FOR CONTENT
    let postContentDiv = document.createElement("div")
    postContentDiv.setAttribute("class","post--content")
    postListItem.append(postContentDiv)

    // DISPLAY POST HEADING 
    let postTitle = document.createElement("h2")
    postTitle.innerText = post.title
    postContentDiv.append(postTitle)
    
    // DISPLAY POST CONTENT
    let postContent = document.createElement("p")
    postContent.innerText = post.content
    postContentDiv.append(postContent)

    // CREATE POST COMMENTS CONTAINER 
    let postCommentsDiv = document.createElement("div")
    postCommentsDiv.setAttribute("class","post--comments")
    postListItem.append(postCommentsDiv)   
    
    // CREATE COMMENTS HEADING
    let postCommentsH3 = document.createElement("h3")
    postCommentsH3.innerText = "Comments"
    postCommentsDiv.append(postCommentsH3)      

    // DISPLAY USER COMMENTS 
    let commentUser = null
    for (const comment of post.comments) {
        if(user.id === post.userId){

            // CREATE A POST COMMENT DIV CONTAINER
            let postCommentDiv = document.createElement("div")
            postCommentDiv.setAttribute("class","post--comment")
            postCommentsDiv.append(postCommentDiv)  
            
            // CREATE AVATAR DIV CONATAINER
            let commentAvatarDiv = document.createElement("div")
            commentAvatarDiv.setAttribute("class","avatar-small")
            postCommentDiv.append(commentAvatarDiv)  

            // LOCATE THE POSTER 
            for (commenter of users)
                if (commenter.id === comment.userId)
                      commentUser = commenter
            
            // DISPLAY POSTERS AVATAR
            let postCommentImage = document.createElement("img")
            postCommentImage.setAttribute("src",commentUser.avatar)
            postCommentImage.setAttribute("alt",commentUser.username)            
            postCommentImage.setAttribute("class","avatar-small")
            commentAvatarDiv.append(postCommentImage)
            
            // DISPLAY THE COMMENT
            let postComment = document.createElement("p")
            postComment.innerText = comment.content
            postCommentDiv.append(postComment)
        }
    }

    //CREATE A COMMENT FORM
    let newCommentForm = document.createElement("form")
    newCommentForm.setAttribute("id","create-comment-form")
    newCommentForm.setAttribute("autocomplete","off")
    postCommentsDiv.append(newCommentForm)

    // CREATE COMMENT LABEL
    let commentLabel = document.createElement("label")
    commentLabel.setAttribute("for","comment")
    commentLabel.innerText = "Add comment"
    newCommentForm.append(commentLabel)

    // CREATE COMMENT INPUT
    let commentInput = document.createElement("input")
    commentInput.setAttribute("id","comment")
    commentInput.setAttribute("name","comment")
    commentInput.setAttribute("type","text")
    newCommentForm.append(commentInput)

    // CREATE COMMENT SUBMIT BUTTON
    let commentButton = document.createElement("button")
    commentButton.setAttribute("type","submit")
    commentButton.innerText = "Comment"
    newCommentForm.append(commentButton)
}


/////////////////////////////////////////////////////////////////////////////
// MAIN PRGRAM STARTS HERE

displayMainPage()




/////////////////////////////////////////////////////////////////////////////
// SCRATCH PAD
/*





*/
