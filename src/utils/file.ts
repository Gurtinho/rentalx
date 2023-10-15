import fs from 'fs';

const deleteFile = async (filename: string): Promise<boolean> => {
    try {
        await fs.promises.stat(filename);
        await fs.promises.unlink(filename);
    } catch {
        return;
    }
};

export { deleteFile };