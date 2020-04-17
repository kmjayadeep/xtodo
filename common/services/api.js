const API_URL = '/api';

exports.fetchTasks = async () => {
  const res = await fetch(`${API_URL}/task`);
  const result = await res.json();
  return result;
};

// export async function fetchTasks2() {
//   const res = await fetch(`${API_URL}/task`);
//   const result = await res.json();
//   return result;
// }
