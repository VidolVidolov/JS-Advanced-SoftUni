function solve() {

    class Article {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Title: ${this.title}\nContent: ${this.content}`;
        }
    }

    class ShortReports extends Article {
        constructor(title, content, originalResearches) {
            super(title, content);
            this.originalResearches = originalResearches;
            this.comments = [];
        }

        get content() {
            return this._content;
        }

        set content(content) {
            if (!(content.length < 150)) {
                throw new Error('Short reports content should be less then 150 symbols.');
            }
            this._content = content;
        }

        get originalResearches() {
            return this._originalResearches;
        }

        set originalResearches(originalResearches) {
            if (!originalResearches['title'] || !originalResearches['author']) {
                throw new Error('The original research should have author and title.');
            }
            this._originalResearches = originalResearches;
        }

        addComment(comment) {
            this.comments.push(comment);
            return `The comment is added.`;
        }

        toString() {
            let generalOuput = `${super.toString()}\n`;
            let currnetOutput = `Original Research: ${this.originalResearches.title} by ${this.originalResearches.author}\n`;
            let result = generalOuput + currnetOutput;
            if (this.comments.length > 0) {
                result += 'Comments:\n';
                this.comments.forEach(x => {
                    result += `${x}\n`;
                });
            }
            return result.trim();
        }
    }

    class BookReview extends Article {
        constructor(title, content, book) {
            super(title, content);
            this.book = book;
            this.clients = [];
        }

        addClient(clientName, orderDescription) {
            if (this.clients.find(x => x.clientName == clientName) != undefined) {
                throw new Error(`This client has already ordered this review.`);
            } else {
                this.clients.push({ clientName, orderDescription });
                return `${clientName} has ordered a review for ${this.book.name}`;
            }
            
        }

        toString() {
            let generalOuput = `${super.toString()}\n`;
            let currnetOutput = `Book: ${this.book.name}\n`;
            let result = generalOuput + currnetOutput;
            if (this.clients.length > 0) {
                result += 'Orders:\n';
                this.clients.forEach(x => {
                    let person = Object.keys(x);
                    result += `${x[person[0]]} - ${x[person[1]]}\n`;
                });
            }
            return result.trim();
        }
    }

    return {
        Article,
        ShortReports,
        BookReview,
    }
}

let classes = solve()
let book = new classes.BookReview('The Great Gatsby is so much more than a love story', 'The Great Gatsby is in many ways similar to Romeo and Juliet, yet I believe that it is so much more than just a love story. It is also a reflection on the hollowness of a life of leisure. ...', { name: 'The Great Gatsby', author: 'F Scott Fitzgerald' });
book.addClient('The Guardian', '100 symbols');
book.addClient('The Guardian', '100 symbols');