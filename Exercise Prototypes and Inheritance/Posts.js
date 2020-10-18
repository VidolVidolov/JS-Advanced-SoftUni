function solve() {

    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            let parentString = super.toString();
            let output = `${parentString}\nRating: ${this.likes - this.dislikes}\n`
            if (this.comments.length != 0) {
                output += `Comments:\n`;
                this.comments.forEach(x => output += ` * ${x}\n`);
            }
            return output.trim();
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view() {
            this.views++;
            return this;
        }

        toString() {
            let parentString = super.toString();
            let output = `${parentString}\nViews: ${this.views}`;
            return output;
        }
    }

    return { Post, SocialMediaPost, BlogPost }
}

solve();

let app = solve();
let post = new app.Post("Post", "Content");

console.log(post.toString());

// Post: Post
// Content: Content

let scm = new app.SocialMediaPost("TestTitle", "TestContent", 25, 30);

scm.addComment("Good post");
scm.addComment("Very good post");
scm.addComment("Wow!");

console.log(scm.toString());

// Post: TestTitle
// Content: TestContent
// Rating: -5
// Comments:
//  * Good post
//  * Very good post
//  * Wow!
let blog = new app.BlogPost("My blog", "Cats content", 75);
blog.view();
blog.view();
console.log(blog.toString());
