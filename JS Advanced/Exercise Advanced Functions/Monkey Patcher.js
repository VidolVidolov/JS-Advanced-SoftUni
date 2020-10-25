function solution(command) {

    let currObj = this;

    if (command === 'upvote') {
        currObj.upvotes++;
    } else if (command === 'downvote') {
        currObj.downvotes++;
    }
    let totalScore = currObj.upvotes - currObj.downvotes;
    let inflatedResults = Math.ceil(Math.max(currObj.upvotes, currObj.downvotes) * 0.25);
    let allVotesCount = currObj.upvotes + currObj.downvotes;
    let rating = 'new';
    let majority = allVotesCount * 0.66;
    if (allVotesCount < 10) {
        rating = 'new';
    } else if (currObj.upvotes <= majority && totalScore >= 0 && currObj.upvotes >= 100 || currObj.downvotes >= 100) {
        rating = 'controversial';
    } else if (totalScore < 0) {
        rating = 'unpopular';
    } else if (currObj.upvotes > allVotesCount * 0.66) {
        rating = 'hot'
    }
    if (allVotesCount > 50) {
        return [inflatedResults + currObj.upvotes, inflatedResults + currObj.downvotes, totalScore, rating];
    } else {
        return [currObj.upvotes, currObj.downvotes, totalScore, rating];
    }
}


// TESTING SOME EDGE CASES 
// let post = {
//     id: '1234',
//     author: 'author name',
//     content: 'these fields are irrelevant',
//     upvotes: 4,
//     downvotes: 5
// };

// // solution.call(post, 'upvote');
// // solution.call(post, 'downvote');
// let score = solution.call(post, 'score');
// // [127, 127, 0, 'controversial']
// //  for (let i = 0; i < 50; i++) {
// //     solution.call(post, 'downvote');
// //  }
// // score = solution.call(post, 'score'); 
// console.log(score)    // [139, 189, -50, 'unpopular']
// solution.call(post, 'downvote');
// score = solution.call(post, 'score');
// console.log(score)    // [139, 189, -50, 'unpopular']


// solution.call(post, 'upvote');
// solution.call(post, 'upvote');
// score = solution.call(post, 'score');
// console.log(score);

// for (let i = 0; i < 38; i++) {
//     solution.call(post, 'upvote');
// }
// score = solution.call(post, 'score');
// // expected = [44, 6, 38, 'hot'];
// console.log(score);

// solution.call(post, 'downvote');
// score = solution.call(post, 'score');
// console.log(score);

// post.upvotes = 132;
// post.downvotes = 68;

// score = solution.call(post, 'score');
// console.log(score);
