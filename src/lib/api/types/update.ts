export type Update<T> = Omit<T, 'rev' | 'createdBy' | 'updatedBy' | 'createDttm' | 'updateDttm'>
