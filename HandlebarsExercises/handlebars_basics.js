$(function() {
  var post = {
    title: "My Post",
    published_date: "August 25, 2015",
    body: "This is my latest and greatest post",
  },
      posts = [
    {
      title: "Second Post",
      published_date: "August 30, 2015",
      body: "Another greate post"
    },
    {
      title: "Third Post",
      published_date: "August 31, 2015",
      body: "Best post ever!"
    }
  ];
  post.body = "<p>" + post.body + "</p>";
  post.tags = ["javascript", "jQuery", "html", "css"];
  posts.push(post);
  console.log(posts);
  
  var post_template = Handlebars.compile($("#posts").html());
  Handlebars.registerPartial("tag", $("#tag").html());
  $("body").append(post_template({ posts: posts }));
});
