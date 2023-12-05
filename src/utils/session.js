const { default: mongoose } = require("mongoose");

async function withTransaction(callback) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Call the callback and wait for it to finish
      // If it's an async function, this will await the returned Promise
      const result = await callback(session);
  
      // If the callback completes without throwing, commit the transaction
      await session.commitTransaction();
  
      // Return the result to the caller
      return result;
    } catch (error) {
      // If the callback throws an error, abort the transaction
      await session.abortTransaction();
  
      // Throw the error again so it can be handled elsewhere
      throw error;
    } finally {
      // In any case, end the session
      session.endSession();
    }
  }

  module.exports = withTransaction;