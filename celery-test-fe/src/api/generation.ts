import axios from "axios";

const API_BASE = "http://localhost:8000"; // replace in prod

export const generateAssets = async (userId: string, params: unknown) => {
  const res = await axios.post(`${API_BASE}/generate/`, {
    user_id: userId,
    params,
  });
  return res.data.task_id;
};

export const getTaskStatus = async (taskId: string) => {
  const res = await axios.get(`${API_BASE}/task-status/${taskId}`);
  return res.data;
};
