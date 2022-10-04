const SEPARATE_SYMBOL = ';';

export const convertIdsParamToArray = (id: string | string[]) => (typeof id === 'string' ? [id] : id);

export const convertIdsParamToString = (id: string | string[]) =>
    typeof id === 'string' ? id : id.join(SEPARATE_SYMBOL);

export const convertIdsStringToArray = (ids: string) => ids.split(SEPARATE_SYMBOL);
