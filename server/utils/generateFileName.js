import path from 'path';

export const generateFileName = (originalName) => {
  const timestamp = Date.now();
  const baseFileName = path.parse(originalName).name.replace(/\s+/g, '_');
  const fileExtension = path.extname(originalName);
  const uniqueFileName = `${baseFileName}_${timestamp}${fileExtension}`;

  return uniqueFileName;
};
