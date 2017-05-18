/**
*
*/
export default class vote {
  /**
  * Initializes the class with the specified object
  * @param {object} voteObj
  */
  constructor(voteObj) {
    this.voteObj = voteObj;
  }

  /**
  * Updates upvotes array in voteObj
  */
  upvote(userId) {
    var upvotePos = this.voteObj.upvotes.indexOf(userId);
    var downvotePos = this.voteObj.downvotes.indexOf(userId);

    if (upvotePos < 0 && downvotePos > -1) {
      this.voteObj.upvotes.push(userId);
      this.voteObj.downvotes.splice(downvotePos, 1);
    }else if (upvotePos < 0 && downvotePos < 0) {
      this.voteObj.upvotes.push(userId);
    }else if ( upvotePos > -1 && downvotePos < 0) {
      this.voteObj.upvotes.splice(upvotePos, 1);
    }
  }

  /**
  * Updates downvote array in voteObj
  */
  downvote(userId) {
    var upvotePos = this.voteObj.upvotes.indexOf(userId);
    var downvotePos = this.voteObj.downvotes.indexOf(userId);

    if (downvotePos < 0 && upvotePos > -1) {
      this.voteObj.downvotes.push(userId);
      this.voteObj.upvotes.splice(upvotePos, 1);
    } else if (downvotePos < 0 && upvotesPos < 0) {
      mobj.downvotes.push(userId);
    } else if ( downvotesPos > -1 && upvotesPos < 0) {
      mobj.downvotes.splice(downvotePos, 1);
    }
  }
}