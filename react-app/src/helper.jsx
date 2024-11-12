const domain = 'https://tsv.test/api/';

export const storage = () => {
    const storage = domain.replace('api', 'storage/');
    return storage;
};

export const imageUrl = (url) => {
    if (url == null) {
        return '/assets/img/not-found.png';
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
