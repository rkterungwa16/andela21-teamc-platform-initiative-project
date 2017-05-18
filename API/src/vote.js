/**
*
*/
export default class vote {
  /**
  * Initializes the class with the specified object
  * @param {object} voteObj
  */
  constructor(upvotes, downvotes) {
    this.upvotes = upvotes;
    this.downvotes = downvotes;
  }

  /**
  * Updates upvotes array in voteObj
  */
  upvote(userId) {
    const upvotePos = this.upvotes.indexOf(userId);
    const downvotePos = this.downvotes.indexOf(userId);

    if (upvotePos < 0 && downvotePos > -1) {
      this.upvotes.push(userId);
      this.downvotes.splice(downvotePos, 1);
    } else if (upvotePos < 0 && downvotePos < 0) {
      this.upvotes.push(userId);
    } else if (upvotePos > -1 && downvotePos < 0) {
      this.upvotes.splice(upvotePos, 1);
    }
  }

  /**
  * Updates downvote array in voteObj
  */
  downvote(userId) {
    const upvotePos = this.upvotes.indexOf(userId);
    const downvotePos = this.downvotes.indexOf(userId);

    if (downvotePos < 0 && upvotePos > -1) {
      this.downvotes.push(userId);
      this.upvotes.splice(upvotePos, 1);
    } else if (downvotePos < 0 && upvotePos < 0) {
      this.downvotes.push(userId);
    } else if ( downvotePos > -1 && upvotePos < 0) {
      this.downvotes.splice(downvotePos, 1);
    }
  }
}