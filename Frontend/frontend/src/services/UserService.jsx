import toast from "react-hot-toast";

export default async function login(e) {
  e.preventDefault()

  let response = await fetch('http://localhost:8000/api/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: e.target.email.value,
      password: e.target.your_pass.value,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('authToken', JSON.stringify(data));
    toast.success('Login successful');
    console.log('Token successfully stored')
    return data;
  } else {

    const errorData = await response.json();
    toast.error('Invalid user credentials!');
    console.error('Error occurred:', errorData);
    throw new Error('Invalid user credentials');
  }
}

export function getlocal() {
  let response = localStorage.getItem('authToken');
  console.log(response);
  return response ? JSON.parse(response).access : null;
}
