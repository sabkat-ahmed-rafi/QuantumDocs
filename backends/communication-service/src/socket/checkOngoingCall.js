const GroupCall = require('../models/groupCallSchema');


const checkOngoingCall = async (io, socket) => {

  socket.on('start-call', async (groupId, startedBy) => {
    console.log(groupId, startedBy);
    try {
      let call = await GroupCall.findOne({ groupId });

      if (!call) {
        // No existing call record, create one
        call = await GroupCall.create({
          groupId,
          ongoing: true,
          startedBy: startedBy,
        });
      } else {
        // Update existing call status to ongoing
        call.ongoing = true;
        call.startedBy = startedBy;
        call.createdAt = Date.now();
        await call.save();
      }

      io.to(groupId).emit('call-started', groupId);
    } catch (error) {
      console.log('Error starting call:', error);
    }


  });

  socket.on('end-call', async (groupId) => {
  
    try {
      await GroupCall.findOneAndUpdate(
        { groupId },
        { ongoing: false },
        { new: true }
      );

      io.to(groupId).emit('call-ended', groupId);
    } catch (error) {
      console.log('Error ending call:', error);
    }

  });

  socket.on('check-call-status', async (groupId, callback) => {
    try {
      const call = await GroupCall.findOne({ groupId });
      callback(call?.ongoing || false);
    } catch (error) {
      console.error('Error checking call status:', error);
      callback(false);
    }
  });
};

module.exports = { checkOngoingCall }