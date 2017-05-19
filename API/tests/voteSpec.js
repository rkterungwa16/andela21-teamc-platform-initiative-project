import myApp from '../src/vote';
const votesObj = {
  upvotes: ['ter@gmail.com'],
  downvotes: ['alb@gmail.com']
}

const myVote = new myApp(votesObj.upvotes, votesObj.downvotes);

describe('Upvote array', () => {
  it('Should update upvote array in object with user email not in downvotes array and user email not in downvotes array', () => {
    myVote.upvote('rich@gmail.com');
    expect(votesObj).toEqual({
      upvotes: [ 'ter@gmail.com', 'rich@gmail.com' ],
      downvotes: [ 'alb@gmail.com' ] });
    });

  it('Should update upvote array in object with user email in downvotes array and user email not in upvotes array', () => {
    myVote.upvote('alb@gmail.com');
    expect(votesObj).toEqual(
      { upvotes: [ 'ter@gmail.com', 'rich@gmail.com', 'alb@gmail.com' ],
        downvotes: [] });
  });

  it('Should update downvote array in object with user email not in upvotes array and user email not in downvotes array', () => {
    myVote.downvote('ior@gmail.com');
    expect(votesObj).toEqual({
      upvotes: ['ter@gmail.com', 'rich@gmail.com', 'alb@gmail.com'],
      downvotes: ['ior@gmail.com']
    });
  });

  it('Should update downvote array in object with user email in upvotes array and user email not in downvotes array', () => {
    myVote.downvote('alb@gmail.com');
    expect(votesObj).toEqual({
      upvotes: ['ter@gmail.com', 'rich@gmail.com'],
      downvotes: ['ior@gmail.com', 'alb@gmail.com']
    });
  });

  it('Should update upvote array in object with user email in upvotes array', () => {
    myVote.upvote('ter@gmail.com');
    expect(votesObj).toEqual({
      upvotes: ['rich@gmail.com'],
      downvotes: ['ior@gmail.com', 'alb@gmail.com']
    });
  });

  it('Should update downvote array in object with user email in downvotes array', () => {
    myVote.downvote('alb@gmail.com');
    expect(votesObj).toEqual({
      upvotes: ['rich@gmail.com'],
      downvotes: ['ior@gmail.com']
    });
  });
});