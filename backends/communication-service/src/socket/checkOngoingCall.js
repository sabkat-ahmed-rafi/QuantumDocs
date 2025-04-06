const checkOngoingCall = async (io, socket) => {

  socket.on('start-call', (groupId, calledBy) => {
    ongoingCalls[groupId] = true;
    socket.join(groupId);
    io.to(groupId).emit('call-started', groupId);
  });

  socket.on('end-call', (groupId) => {
    delete ongoingCalls[groupId];
    socket.leave(groupId);
    io.to(groupId).emit('call-ended', groupId);
  });

  socket.on('check-call-status', (groupId, callback) => {
    callback(!!ongoingCalls[groupId]);
  });
};

module.exports = { checkOngoingCall }