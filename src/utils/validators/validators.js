export const required = value => {
    if (value) return undefined;
    return "Field is required";
}

export const maxLengthThunkCreator = (maxLength) => value => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined
}

export const minLengthThunkCreator = (minLength) => value => {
    if (value && value.length < minLength) return `Min length is ${minLength} symbols`;
    return undefined
}

