let currentEntityId = 0;

export const entityId = {
    getCurrentId: () => currentEntityId,
    getNextId: () => currentEntityId++,
};
