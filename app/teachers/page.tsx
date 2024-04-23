'use client'
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/app/_components/teacherTable/DataEngine/data-table';
import { ColumnWrapper } from '@/app/_components/teacherTable/DataEngine/column';
import { TeacherDataType } from '@/app/_components/teacherTable/DataEngine/teachers.model';

async function fetchStudentData() {
  const res = await fetch("http://localhost:3001/api/teacher", { next: { revalidate: 0 } });
  return res.json();
}

export default function StudentsPage() {
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchStudentData();
      setTeacherData(data.map((teacherData:any) => ({
        id: Math.floor(Math.random() * (200 - 10)) + 10,
        ...teacherData,
        // Convert date format here
        dateOfBirth: new Date(teacherData.dateOfBirth).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      })));
    }

    fetchData();
  }, []);

  const isFetchAllSelectedRowModelHandler = (selectedRowModel: TeacherDataType[]) => {
    // Handle selected row model logic here
  };

  const handleClick = () => {
    // Handle click logic here
  };

  return (
    <div className="p-10 w-full min-h-screen space-y-10 bg-blue-900 text-white">
      <div className='mb-5'>
        <h1 className='text-xl font-semibold'>List of Teachers</h1>
        <p>Here are the list of registered teachers...</p>
      </div>
      <div className="p-2">
        <DataTable
          isFetchAllSelectedRowModel={isFetchAllSelectedRowModelHandler}
          handleClick={handleClick}
          columns={ColumnWrapper()}
          data={teacherData}
        />
      </div>
    </div>
  );
}
