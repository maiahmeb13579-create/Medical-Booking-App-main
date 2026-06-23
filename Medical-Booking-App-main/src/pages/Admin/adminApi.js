// ده شكل تقريبي للملف، عدليه حسب الـ API بتاعك
import axios from 'axios';

const API_URL = "http://localhost:5000/api"; // أو رابط السيرفر بتاعك

export const adminApi = {
  // 1. جلب كل المستخدمين
  getUsers: async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  // 2. جلب كل التخصصات
  getSpecialties: async () => {
    const response = await axios.get(`${API_URL}/specialties`);
    return response.data;
  },

  // 3. حظر مستخدم (Block)
  blockUser: async (id) => {
    const response = await axios.patch(`${API_URL}/users/${id}/block`);
    return response.data;
  },

  // 4. إلغاء الحظر (Unblock)
  unblockUser: async (id) => {
    const response = await axios.patch(`${API_URL}/users/${id}/unblock`);
    return response.data;
  }
};