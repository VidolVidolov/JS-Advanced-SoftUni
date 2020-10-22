class Article {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = { likes: [], dislikes: [] };
    }

    get likes() {
        if (this._likes.likes.length == 0) {
            return `${this.title} has 0 likes`;
        }
        if (this._likes.likes.length == 1) {
            return `${this._likes.likes[0]} likes this article!`;
        }

        return `${this._likes.likes[0]} and ${this._likes.likes.length - 1} others like this article!`
    }

    like(username) {

        if (this._likes.likes.includes(username)) {
            throw new Error(`You can't like the same article twice!`);
        }

        if (this.creator === username) {
            throw new Error(`You can't like your own articles!`);
        }
        this._likes.likes.push(username);
        return `${username} liked ${this.title}!`;
    }

    dislike(username) {
        if (!this._likes.likes.includes(username)) {
            throw new Error('You can\'t dislike this article!');
        }
        let index = this._likes.likes.indexOf(username);
        this._likes.likes.splice(index, 1);
        this._likes.dislikes.push(username);
        return `${username} disliked ${this.title}`;
    }


    comment(username, content, id) {
        let checker = this._comments.find(x => x.Id == id);
        if (!checker || id == undefined) {
            let commentsAndReplies = {
                Id: this._comments.length + 1,
                Username: username,
                Content: content,
                Replies: []
            };

            this._comments.push(commentsAndReplies);
            return `${username} commented on ${this.title}`;
        } else {
            checker.Replies.push({
                Id: `${checker.Id}.${checker.Replies.length + 1}`,
                Username: username,
                Content: content,
            });
            return `You replied successfully`;
        }
    }

    toString(sortingType) {
        let sorted = this.sort(sortingType, this._comments);

        let output = `Title: ${this.title}\n`;
        output += `Creator: ${this.creator}\n`;
        output += `Likes: ${this._likes.likes.length}\n`;
        output += 'Comments:\n';

        sorted.forEach(x => {
            output += `-- ${x.Id}. ${x.Username}: ${x.Content}\n`;
            if (x.Replies.length !== 0) {
                let sortedReplies = this.sort(sortingType, x.Replies);
                sortedReplies.forEach(x => {
                    output += `--- ${x.Id}. ${x.Username}: ${x.Content}\n`;
                })
            }
        });


        return output.trim();
    }


    sort(sortingType, target) {
        let sorted;
        if (sortingType === 'asc') {
            sorted = target.sort((a, b) => {
                let A = Object.values(a)[0];
                let B = Object.values(b)[0];
                return A - B;
            });
        } else if (sortingType === 'desc') {
            sorted = target.sort((a, b) => {
                let A = Object.values(a)[0];
                let B = Object.values(b)[0];
                return B - A;
            });
        } else if (sortingType === 'username') {
            sorted = target.sort((a, b) => {
                let A = Object.values(a)[1];
                let B = Object.values(b)[1];
                return A.localeCompare(B);
            });
        }
        return sorted;
    }
}


let art = new Article("My Article", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
// console.log(art.toString('asc'));
console.log(art.toString('username'));

console.log()
art.like("Zane");
console.log(art.toString('desc'));
