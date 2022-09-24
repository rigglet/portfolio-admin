export function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
};

export const getIconList = (allIcons) => {  
    let arrIcons = [];
    for (const icon in allIcons) {
      arrIcons.push(icon);
    }
    return arrIcons;
  }