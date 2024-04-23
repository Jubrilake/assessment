import React from 'react';

export default async function StudentsPage() {
  const res = await fetch("http://localhost:3000/api/student", { next: { revalidate: 0 } });
  const data = await res.json();
  console.log(data);
  return (
    <div>{JSON.stringify(data)}</div>
  );
}
