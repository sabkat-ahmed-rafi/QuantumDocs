const getAvatarUrl = (name = "X") => {
    const initials = name.charAt(0).toUpperCase();
    return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`;
};

export default getAvatarUrl;