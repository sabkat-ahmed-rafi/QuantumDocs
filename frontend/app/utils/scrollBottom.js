const scrollBottom = (messageEndRef) => {
    if(messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
};

export default scrollBottom;