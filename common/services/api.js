const API_URL = '/api';

export async function fetchTasks() {
  const res = await fetch(`${API_URL}/task`);
  const result = await res.json();
  return result;
}

export async function addTask(task) {
  const res = await fetch(`${API_URL}/task`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(task),
  });
  const result = await res.json();
  return result;
}
