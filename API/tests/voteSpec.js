import myApp from '../src/vote';
const votesObj = {
  upvotes: ['ter@gmail.com'],
  downvotes: ['alb@gmail.com']
}

const myVote = new myApp(votesObj);

describe('Upvote array', () => {
  it('Should update upvote array in object with user email note in downvotes', () => {
    myVote.upvote('rich@gmail.com');
    expect(votesObj).toEqual({
      upvotes: [ 'ter@gmail.com', 'rich@gmail.com' ],
      downvotes: [ 'alb@gmail.com' ] });
    });

  it('Should update upvote array in object with user email in downvotes array', () => {
    myVote.upvote('alb@gmail.com');
    expect(votesObj).toEqual(
      { upvotes: [ 'ter@gmail.com', 'rich@gmail.com', 'alb@gmail.com' ],
        downvotes: [] });
  })
});