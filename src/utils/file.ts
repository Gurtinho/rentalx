import fs from 'fs';

const deleteFile = async (filename: string): Promise<any> => {
    try {
        await fs.promises.stat(filename);
        await fs.promises.unlink(filename);
    } catch {
        return;
    }
};

export { deleteFile };