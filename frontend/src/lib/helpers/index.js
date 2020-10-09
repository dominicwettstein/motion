// Small helper functions

export const getCustomizedDate = (date) => {
  const postDate = new Date(date);
  const currentDate = new Date(Date.now());
  if (currentDate - postDate < 1000 * 60) {
    return 'just now';
  } else if (currentDate - postDate < 1000 * 60 * 60) {
    return `${Math.floor((currentDate - postDate) / 1000 / 60)} min ago`;
  } else if (postDate.toDateString() === currentDate.toDateString()) {
    return `${Math.floor((currentDate - postDate) / 1000 / 60 / 60)} h ago`;
  } else {
    return postDate.toDateString();
  }
};
