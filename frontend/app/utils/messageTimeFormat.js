const messageTimeFormat = async (isoString) => {
    const date = new Date(isoString);

    const time = date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
  
    return `${time} - ${day} ${month}`;
};

export default messageTimeFormat;