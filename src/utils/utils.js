export const objectFromArr = (arr) => {
    if (!Array.isArray(arr) || arr.length <= 0) return null
    const obj = {};
    arr.forEach(element => {
        obj[element] = null;
    });
    return obj;
}

export const capitalizeFirstLetter = (str) => {
    if (typeof str !== "string") return null
    const arr = str.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}

export const articlesMapToObject = (articlesMap) => {
    if (!articlesMap && !articlesMap instanceof Map && articlesMap.size <= 0) return null
    const articlesObject = {}
    for (const [key, value] of articlesMap) {
        articlesObject[key] = value;
    }
    return articlesObject
}


export const isPositiveInteger = (number) => {
    const parsedNumber = parseInt(number);
    return !isNaN(parsedNumber) && Number.isInteger(parsedNumber) && parsedNumber > 0 && parsedNumber.toString() === number.toString();
}

export const getArticleDate = (date) => {
    if (!date) return null;
    const articleDate = new Date(date);
    if (!articleDate.getTime()) return null;
    const newDate = new Date();

    if (newDate.getDate() === articleDate.getDate() && newDate.getMonth() === articleDate.getMonth() && newDate.getFullYear() === articleDate.getFullYear()) {
        const hoursDifference = newDate.getHours() - articleDate.getHours()
        const articleHour = articleDate.getHours().toString().length === 1 ? `0${articleDate.getHours()}` : articleDate.getHours()
        const articleMinutes = articleDate.getMinutes().toString().length === 1 ? `0${articleDate.getMinutes()}` : articleDate.getMinutes()
        if (Number(hoursDifference) > 1) return `${articleHour}:${articleMinutes}`

    }

    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    if ((newDate - articleDate) < oneDayInMilliseconds) return "Acum o zi"

    const day = articleDate.getDate();
    const month = articleDate.getMonth() + 1;
    const year = articleDate.getFullYear();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

export const getCategoryColor = (category) => {
    const colors = {
        politica: "#65a30d",
        economie: "#06b6d4",
        crima: "#9333ea",
        sport: "#e11d48",
        monden: "#ea580c",
        gastronomie: "#14b8a6",
        extern: "#22c55e",
        meteo: "#22615e",
        gospodarie: "#06b6d4",
        cultura: "#9333ea",
        social: "#22c55e",
        religie: "#06b6d4",
        sanatate: "#06b6d4"

    };
    return category ? colors[category?.toLowerCase()] : "#64748b";
};

const diacritics = {
    'Ă': 'A', 'ă': 'a',
    'Â': 'A', 'â': 'a',
    'Î': 'I', 'î': 'i',
    'Ș': 'S', 'ș': 's',
    'Ț': 'T', 'ț': 't'
};

export const replaceDiacritics = (text) => {
    if (typeof text !== "string") return text
    if (text.length === 0) return '';

    let result = '';
    for (let i = 0; i < text.length; i++) {
        const character = text[i];
        if (character in diacritics) {
            result += diacritics[character];
        } else {
            result += character;
        }
    }

    return result;
}

export const sanitizeUrl = (title) => {
    return title.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
}