const domain = 'https://mytsv.com/api/';

export const storage = () => {
    const storage = domain.replace('api', 'storage/');
    return storage;
};

export const imageUrl = (url) => {
    if (url == null) {
        return '/_Assets/not_found.jpg';
    } else if (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('blob:')) {
        return url;
    } else {
        return storage() + url;
    }
}

export const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), wait);
    };
};

export default {
    imageUrl,
    debounce
}
