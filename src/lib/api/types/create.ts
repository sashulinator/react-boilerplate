export type Create<T> = Omit<T, 'id' | 'rev' | 'createdBy' | 'updatedBy' | 'createDttm' | 'updateDttm'>
