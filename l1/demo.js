// const posts=[
//     {id:1,title:'Post One',body:'This is post one',commentId:1,likeId:1},
//     {id:2,title:'Post Two',body:'This is post two',commentId:2,likeId:2},
//     {id:3,title:'Post Three',body:'This is post three',commentId:3,likeId:3},
//     {id:4,title:'Post Four',body:'This is post four',commentId:4,likeId:4},
// ]

// const comments=[
//     {commentId:1,comments:[{userId:1,comment:'This is comment one'},{userId:2,comment:'This is comment two'}]},
//     {commentId:2,comments:[{userId:1,comment:'This is comment one'},{userId:2,comment:'This is comment two'}]},
//     {commentId:3,comments:[{userId:1,comment:'This is comment one'},{userId:2,comment:'This is comment two'}]},
//     {commentId:4,comments:[{userId:1,comment:'This is comment one'},{userId:2,comment:'This is comment two'}]},
// ]

// const likes=[
//     {likeId:1,likes:[{userId:1},{userId:2}]},
//     {likeId:2,likes:[{userId:1},{userId:2}]},
//     {likeId:3,likes:[{userId:1},{userId:2}]},
//     {likeId:4,likes:[{userId:1},{userId:2}]},
// ]

// const GetPostDetails =

const socialApp = () => {
  var users = [],
    posts = [],
    comments = [],
    likes = [];
  var currentUser = undefined;
  return {
    addUser: (user) => {
      users.push(user);
      console.info(user.id + " created");
    },
    loginUser: (id, password) => {
      const user = users.find(
        (user) => user.id === id && user.password === password
      );
      if (user) {
        currentUser = user;
        console.log("login success");
      } else {
        console.log("login failed");
      }
    },
    logoutUser: () => {
      currentUser = undefined;
    },
    allComments: () => {
        console.table(comments);
    },
    allLikes: () => {
        console.table(likes);
    },
    homePage: () => {
      var currentUserPosts = [];
      if (currentUser) {
        console.log("welcome to home page");
        if (currentUserPosts.length != 0) console.table(posts);

        return {
          getAllPosts: () => {
            currentUserPosts = posts.filter(
              (post) => post.userId === currentUser.id
            );
            console.table(currentUserPosts);
            return posts;
          },
          getAllDetailsOfPost: (id) => {
            const getPost = () => {
              var post = posts.find((post) => post.id === id);
              //   console.log({ post });
              const getComment = () => {
                var comment = comments.map(
                  (comment) => {
                    if(comment.postId === id)
                    {
                        return comment.comments
                    }
                }
                );
                console.log({comment});
                const getPostLikes = () => {
                  var like = likes.filter((like) => like.postId === id);
                    console.log({ like });
                  const {title,body}=post
                  return (getAllData = () => ({
                    title,
                    body,
                    comment,
                    like: like.length,
                  }));
                };
                return getPostLikes();
              };

              return getComment();
            };
            return getPost;
          },
          createPost: (post) => {
            const id = posts.length + 1;
            const userId = currentUser.id;
            const { title, body } = post;
            if (!title && !body) {
              console.log("please enter title and body");
              return;
            }
            posts.push({ id, userId, title, body, commentId: [], likeId: [] });
            console.info(post.title + " created a post");
          },
          deletePost: (id) => (posts = posts.filter((post) => post.id !== id)),
          commentPost: (id, comment) => {
            const commentId = comments.length + 1;
            comments.push({
              postId:id,
              userId: currentUser.id,
              commentId,
              comments: comment,
            });
            const post = posts.find((post) => post.id === id);
            post.commentId.push(commentId);
            console.info("commented");
          },
          likePost: (id) => {
            const likeId = likes.length + 1;
            likes.push({ postId:id,userId:currentUser.id,likeId, likes: currentUser.id });
            console.info("liked");
          },
        };
      } else {
        console.log("please login");
      }
    },
  };
};

const app = socialApp();
app.addUser({ id: 1, password: "1234" });
app.loginUser(1, "1234");
const homePage = app.homePage();
homePage.createPost({ title: "post one", body: "this is post one" });
homePage.createPost({ title: "post two", body: "this is post two" });
homePage.commentPost(1, "this is comment one");
homePage.commentPost(1, "this is comment 2");
homePage.commentPost(1, "this is comment 3");
homePage.likePost(1);
homePage.likePost(1);
homePage.likePost(1);
homePage.getAllPosts();
// app.allComments();


console.table(homePage.getAllDetailsOfPost(1)()());





