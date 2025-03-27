const handleVideoCall = async (io, socket) => {

  // Handle WebRTC offer
  socket.on('sendOffer', (offer, groupId, userId) => {
    console.log('Received offer from:', userId);
    socket.to(groupId).broadcast.emit('receiveOffer', offer, userId);
  });

  // Handle WebRTC answer
  socket.on('sendAnswer', (answer, groupId, userId) => {
    console.log('Received answer from:', userId);
    socket.to(groupId).broadcast.emit('receiveAnswer', answer, userId);
  });

  // Handle ICE candidates
  socket.on('sendIceCandidate', (candidate, groupId) => {
    socket.to(groupId).broadcast.emit('receiveIceCandidate', candidate);
  });

};

module.exports = { handleVideoCall };