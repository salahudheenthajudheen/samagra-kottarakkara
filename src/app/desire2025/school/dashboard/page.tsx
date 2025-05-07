'use client';

import DashboardLayout from '../../../components/desire2025/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Link from 'next/link';

export default function SchoolDashboardPage() {
  // Mock data
  const schoolName = "Demo School";
  const studentCount = 42;
  
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">School Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to {schoolName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Students</h2>
            <p className="text-3xl font-bold text-sage-600">{studentCount}</p>
            <p className="text-sm text-gray-500 mt-1">Registered students</p>
            <div className="mt-4">
              <Link 
                href="/desire2025/school/students"
                className="text-sage-600 hover:text-sage-700 text-sm font-medium"
              >
                View all students →
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h2>
            <div className="mt-4">
              <Link 
                href="/desire2025/school/add-student"
                className="block mb-2 text-sage-600 hover:text-sage-700 text-sm font-medium"
              >
                Add New Student →
              </Link>
              <Link 
                href="/desire2025/school/students"
                className="block text-sage-600 hover:text-sage-700 text-sm font-medium"
              >
                Manage Students →
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 