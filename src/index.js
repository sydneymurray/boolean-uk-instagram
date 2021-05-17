//////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIBLES ARE DECLARED HERE ///////////////////////////////////////////////

let users = []
let posts = []
let currentUser = null
// let parentWrapper = null


//////////////////////////////////////////////////////////////////////////////////
// ALL FUNCTIONS ARE DECLARED HERE ///////////////////////////////////////////////


// DISPLAY THE MAIN PAGE
function displayMainPage(){

    retrieveUserArray().then(function(){
        displayTopBarHeader()})

    retrievePostArray().then(function (){
        displayMainSection()})
}

// RETRIEVE ALL USERS FROM JSON AND THEM STORE IN "users"
function retrieveUserArray(){
    return fetch("http://localhost:3000/users")
        .then(function (promise){
            return promise.json()})
        .then(function (userArray){
            users = userArray})
}

// RETRIEVE ALL POSTS AND STORE THENM IN 'posts'
function retrievePostArray(){
    return fetch("http://localhost:3000/posts")
        .then(function (promise){
            return promise.json()})
        .then(function (postsArray){
            posts = postsArray})
}

// DISLAY TOP HEADER BAR
function displayTopBarHeader(){
    // FIND THE ROOT CONTAINER DIV
    let rootContainer = document.querySelector("#root")
 
    // CREATE MAIN HEADER
    let mainHeader = document.createElement("header")
    mainHeader.setAttribute("class","main-header")
    rootContainer.append(mainHeader)
    
    // CREATE WRAPPER DIV
    let headerWrapperDiv = document.createElement("div")
    headerWrapperDiv.setAttribute("class","wrapper")
    mainHeader.append(headerWrapperDiv)
    
    // DISPLAY ALL THE USER CHIPS IN THE HEADER 
    displayAllUserChips(headerWrapperDiv)
}

// DISPLAY ALL USER CHIPS IN THE HEADER
function displayAllUserChips(wrapperDiv){
    for (user of users){
        let chipDiv = displayUserChip(user)
        wrapperDiv.append(chipDiv)
    }
}

// DISPLAY USERS NAME AND AVATAR
function displayUserChip(user){

    // CREATE A CHIP DIV
    let chipDiv = document.createElement("div")
    chipDiv.setAttribute("class","chip")

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

    // DISPLAY USERNAME
    let usernameSpan = document.createElement("span")
    usernameSpan.innerText = user.username
    chipDiv.append(usernameSpan)

    
    // CREATE AN EVENT HANDLER FOR USER SELECTION
    chipDiv.addEventListener("click", function(event){
                                     
        // Prevent Page Refresh on Button Click
        event.preventDefault()
       
        // IS A CHIP ALREADY ACTIVE? THEN DEACTIVATE IT
        activeChip = document.querySelector(".active")
        if (activeChip !== null)
            activeChip.classList.remove("active")
            
        // ACTIVATE CHIPDIV
        chipDiv.classList.add("active")  
            
        // MAKE USER THE CURRENT USER
        currentUser = user
    })
    return chipDiv
}

function displayMainSection(){
    // FIND THE ROOT CONTAINER DIV
    let rootContainer = document.querySelector("#root")

    // CREATE MAIN WRAPPER
    let mainWrapper = document.createElement("main")
    mainWrapper.setAttribute("class","wrapper")
    rootContainer.append(mainWrapper)
     
    // DISPLAY THE CREATE A NEW POST SECTION
    displayCreateNewPostSection()
    
    // CREATE & DISPLAY NEWS FEED SECTION
    displayAllPosts()
}  

// DISPLAY THE CREATE A NEW POST SECTION
function displayCreateNewPostSection(){
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
    imageInput.setAttribute("required","true")
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
    titleInput.setAttribute("required","true")
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
    contentTextArea.setAttribute("required","true")
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

    // CREATE AN EVENT LISTENER TO SUBMIT THE NEW POST
    submitButton.addEventListener("click", function(event){

        // Prevent Page Refresh on Button Click
        event.preventDefault()

        if (currentUser !== null)
            submitNewPost(imageInput.value,titleInput.value,contentTextArea.value,currentUser)
        newPostForm.reset();
        currentUser = user 
    })
}

// STORE A NEW POST
function submitNewPost(image,title,comment,user){
    fetch(`http://localhost:3000/posts`,{
        method:'POST',
        headers:{'Content-Type': 'Application/json'},
        body: JSON.stringify({
            id: posts.length+1,
            title: title,
            content: comment,
            image: {
                src: image,
                alt: title},
            likes: 0,
            userId: user.id
        })
    }).then(displayMainPage()) 
}


// DISPLAY NEWS FEED
function displayAllPosts(){

    // LOCATE THE MAIN WRAPPER
    let mainWrapper = document.querySelector("main")

    // CREATE FEED SECTION
    let newsFeedSection = document.createElement("section")
    newsFeedSection.setAttribute("class","feed")
    mainWrapper.append(newsFeedSection)

    // CREATE UNORDERED LIST ELEMENT FOR POSTS
    let postListStack = document.createElement("ul")
    postListStack.setAttribute("class","stack")
    newsFeedSection.append(postListStack)

    // DISPLAY EACH POST AS A LIST ITEM
    for (const post of posts) 
        displayNewsPost(post)
}

// DISPLAY A POST ITEM
function displayNewsPost(post){
    // LOCATE THE STACK DIV
    let postList = document.querySelector(".stack")

    // CREATE A LIST ITEM FOR THE CHIP
    let postListItem = document.createElement("li")
    postListItem.setAttribute("class","post")
    postList.append(postListItem)
    
    // FIND THE POSTING USER
    let user = users.find(function (user) {
        return user.id === post.userId;})
    
    // DISPLAY USERS NAME AND AVATAR
    let chipDiv = displayUserChip(user)
    postListItem.append(chipDiv)
    
    // DISPLAY POSTING USERS IMAGE
    let postImageDiv = postingUserImage(post)
    postListItem.append(postImageDiv)

    // DISPLAY LIKES TEXT
    let likesText = document.createElement("span")
    likesText.innerText = `${post.likes} Likes`
    postListItem.append(likesText)
    
    // DISPLAY LIKES HART
    let likesHart = document.createElement("span")
    likesHart.innerText = `♥`
    likesHart.setAttribute("class","hart")
    postListItem.append(likesHart)
     
    // CREATE A LIKES LISTENER
    likesHart.addEventListener("click", function(event){                          
        
        // Prevent Page Refresh on Button Click
        event.preventDefault()

        // INCREASE THE LIKES
        post.likes++ 

        // UPDATE THE LIKES INNER TEXT
        likesText.innerText = `${post.likes} Likes`
        console.log(post)

        fetch(`http://localhost:3000/posts/${post.id}`,{
            method:'PATCH',
            headers:{'Content-Type': 'Application/json'},
            body: JSON.stringify({
                likes: post.likes
            }) 
        }) 
        event.preventDefault()
    })

    // CREATE A DIV CONTAINER TO DISPLAY POST CONTENT
    let postContentDiv = displayPostContent(post)
    postListItem.append(postContentDiv)
    
    // CREATE A DIV CONTAINER TO DISPLAY POST COMMENTS
    let postCommentsDiv = displayPostComments(post)
    postListItem.append(postCommentsDiv)

    // DISPLAY A COMMENT FORM
    newCommentForm = createCommentForm(post,postCommentsDiv)
    postCommentsDiv.append(newCommentForm)
}

// DISPLAY POSTING USERS IMAGE
function postingUserImage(post){
    let postImageDiv = document.createElement("div")
    postImageDiv.setAttribute("class","post--image")

    // DISPLAY POST IMAGE
    let postImage = document.createElement("img")
    postImage.setAttribute("src",post.image.src)
    postImage.setAttribute("alt",post.image.alt)
    postImage.setAttribute("width","320px")
    postImageDiv.append(postImage)

    return postImageDiv
}

// CREATE A DIV CONTAINER TO DISPLAY POST CONTENT
function displayPostContent(post){
     let postContentDiv = document.createElement("div")
     postContentDiv.setAttribute("class","post--content")

     // DISPLAY POST HEADING 
     let postTitle = document.createElement("h2")
     postTitle.innerText = post.title
     postContentDiv.append(postTitle)
 
     // DISPLAY POST CONTENT
     let postContent = document.createElement("p")
     postContent.innerText = post.content
     postContentDiv.append(postContent)
     
     return postContentDiv
}

// CREATE A DIV CONTAINER TO DISPLAY POST COMMENTS
function displayPostComments(post){
   
    // CREATE A POST COMMENTS CONTAINER 
    let postCommentsDiv = document.createElement("div")
    postCommentsDiv.setAttribute("class","post--comments")  
   
    // CREATE COMMENTS HEADING
    let postCommentsH3 = document.createElement("h3")
    postCommentsH3.innerText = "Comments"
    postCommentsDiv.append(postCommentsH3)  
    
    // FIND AND DISPLAY EACH POST COMMENT
    for (const comment of post.comments) {
      postCommentDiv = displayPostComment(comment)
      postCommentsDiv.append(postCommentDiv)}

    return postCommentsDiv 
}

// DISPLAY USER COMMENTS 
function displayPostComment(comment){

    // CREATE A POST COMMENT DIV CONTAINER
    let postCommentDiv = document.createElement("div")
    postCommentDiv.setAttribute("class","post--comment")
       
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

    return postCommentDiv
}

// DISPLAY A COMMENT FORM
function createCommentForm(post,postCommentsDiv){
    let newCommentForm = document.createElement("form")
    newCommentForm.setAttribute("id","create-comment-form")
    newCommentForm.setAttribute("autocomplete","off")

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
    commentInput.setAttribute("required","true")
    newCommentForm.append(commentInput)

    // CREATE COMMENT SUBMIT BUTTON
    let commentButton = document.createElement("button")
    commentButton.setAttribute("type","submit")
    commentButton.innerText = "Comment"
    newCommentForm.append(commentButton)

    // CREATE AN EVENT LISTENER FOR THE SUBMIT BUTTON
    commentButton.addEventListener("click", function(event){

        // Prevent Page Refresh on Button Click
        event.preventDefault()
        
        // SUBMIT COMMENT ONLY IF THE USER IS LOGGED IN
        if (currentUser !== null){
            
            //FIND THE COMMENT FORM
            let commentForm = document.querySelector("#create-comment-form")
            
            // REMOVE THE COMMENT FORM
            commentForm.remove()

            // ADD THE NEW COMMENT
            newComment = updatePostComment(commentInput.value)
            postCommentsDiv.append(newComment)
            
            // RESTORE COMMENT FORM
            postCommentsDiv.append(commentForm)

            // UPDATE JSON WITH NEW COMMENT
            submitNewComment(commentInput.value,post)
            
            // CLEAR COMMENT BOX
            commentInput.value = "";
        } 
        else 
            alert("You must Log In before you can add comments")
    })
    return newCommentForm
}

function updatePostComment(commentInput){

    // CREATE A POST COMMENT DIV CONTAINER
    let postCommentDiv = document.createElement("div")
    postCommentDiv.setAttribute("class","post--comment")
       
    // CREATE AVATAR DIV CONATAINER
    let commentAvatarDiv = document.createElement("div")
    commentAvatarDiv.setAttribute("class","avatar-small")
    postCommentDiv.append(commentAvatarDiv)  

    // LOCATE THE POSTER 
    for (commenter of users)
        if (commenter.id === currentUser.userId)
            commentUser = commenter
           
    // DISPLAY POSTERS AVATAR
    let postCommentImage = document.createElement("img")
    postCommentImage.setAttribute("src",commentUser.avatar)
    postCommentImage.setAttribute("alt",commentUser.username)            
    postCommentImage.setAttribute("class","avatar-small")
    commentAvatarDiv.append(postCommentImage)
      
    // DISPLAY THE COMMENT
    let postComment = document.createElement("p")
    postComment.innerText = commentInput
    postCommentDiv.append(postComment)

    return postCommentDiv  
}


// SUBMIT THE COMMENT
function submitNewComment(comment,post){
    fetch(`http://localhost:3000/comments`,{
        method:'POST',
        headers:{'Content-Type': 'Application/json'},
        body: JSON.stringify({
            content: comment,
            userId: currentUser.id,
            postId: post.id            
        }) 
    })
}


/////////////////////////////////////////////////////////////////////////////
// MAIN PROGRAM STARTS HERE

displayMainPage()



/////////////////////////////////////////////////////////////////////////////
// SCRATCH PAD
/*





*/
