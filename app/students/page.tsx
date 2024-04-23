'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '../_components/studentTable/DataEngine/data-table';
import { ColumnWrapper } from '../_components/studentTable/DataEngine/column';
import { StudentDataType } from '../_components/studentTable/DataEngine/students.model';

async function fetchStudentData() {
  const res = await fetch("http://localhost:3001/api/student", { next: { revalidate: 0 } });
  return res.json();
}

export default function StudentsPage() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchStudentData();
      setStudentData(data.map((studentData:any) => ({
        id: Math.floor(Math.random() * (200 - 10)) + 10,
        ...studentData,
        // Convert date format here
        dateOfBirth: new Date(studentData.dateOfBirth).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      })));
    }

    fetchData();
  }, []);

  const isFetchAllSelectedRowModelHandler = (selectedRowModel: StudentDataType[]) => {
    // Handle selected row model logic here
  };

  const handleClick = () => {
    // Handle click logic here
  };

  return (
    <div className="p-10 w-full min-h-screen space-y-10 bg-blue-900 text-white">
      <div className='mb-5'>
        <h1 className='text-xl font-semibold'>List of Students</h1>
        <p>Here are the list of registered students...</p>
      </div>
      <div className="p-2">
        <DataTable
          isFetchAllSelectedRowModel={isFetchAllSelectedRowModelHandler}
          handleClick={handleClick}
          columns={ColumnWrapper()}
          data={studentData}
        />
      </div>
    </div>
  );
}
