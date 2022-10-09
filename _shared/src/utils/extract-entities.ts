export const extractEntities = (items: any): any[] => {
    return items
        .map((item: any) => {
            if (!item.toEntity) return;
            return item.toEntity();
        })
        .filter(Boolean);
};
