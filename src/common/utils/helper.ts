import { Op } from "sequelize";

export const generateRandomPassword = () => {
    const specialChars = ['@', '#', '$', '%', '&', '!'];

    const smallChars = Math.random().toString(36).slice(2, 6);

    const bigChars = Math.random().toString(36).slice(2, 6).toUpperCase();

    const randomNum = Math.floor(Math.random()*specialChars.length);

    return `${specialChars[randomNum]}${smallChars}${bigChars}${randomNum}`;
};


export const getRoleDescription = (role: string[]) => {
    const descriptions: string[] = [];

    if (role.includes('MANAGE_CONTENT')) {
      descriptions.push('Content Manager');
    }
  
    if (role.includes('MANAGE_COURSES')) {
      descriptions.push('Courses Manager');
    }
  
  
    if (descriptions.length === 1) return descriptions[0];
  
    const last = descriptions.pop();
    return `${descriptions.join(', ')} and ${last}`;
}

export const generateOtp = () => {
  return Math.random().toString().slice(2, 8);
};

export const getSearchConditions = (searchValue: string, searchColumns: string[]): Record<symbol, unknown> => {
  const searchQuery = {
    [Op.iLike]: `%${searchValue}%`
  };

  const searchConditions = searchColumns.map(val => ({[val]: searchQuery}));

  return {
    [Op.or]: searchConditions
  };
}


export const referenceGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 20; i++) {
  const randomIndex = Math.floor(Math.random() * characters.length);
  result += characters[randomIndex];
  }

  return result;
}



export const calculateMinutesAgo = (minutes: number) => {
  if (minutes < 0) throw new Error('Negative minutes value not allowed');

  const currentDate = new Date();

  return new Date(currentDate.getTime() - minutes * 60000);
}