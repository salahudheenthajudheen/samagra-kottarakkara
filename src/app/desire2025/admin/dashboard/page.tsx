'use client';

import DashboardLayout from '../../../components/desire2025/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage schools, students, certifications, and more.
          </p>
        </div>

        {/* Dashboard stats and quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Schools</h2>
            <p className="text-3xl font-bold text-sage-600">10</p>
            <div className="mt-4">
              <Link 
                href="/desire2025/admin/schools"
                className="text-sage-600 hover:text-sage-700 text-sm font-medium"
              >
                View all schools →
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Students</h2>
            <p className="text-3xl font-bold text-sage-600">250</p>
            <div className="mt-4">
              <Link 
                href="/desire2025/admin/students"
                className="text-sage-600 hover:text-sage-700 text-sm font-medium"
              >
                View all students →
              </Link>
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Check-ins</h2>
            <p className="text-3xl font-bold text-sage-600">125</p>
            <div className="mt-4">
              <Link 
                href="/desire2025/admin/check-in"
                className="text-sage-600 hover:text-sage-700 text-sm font-medium"
              >
                Go to check-in →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick access tools */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link 
              href="/desire2025/admin/schools"
              className="bg-sage-50 hover:bg-sage-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-sage-700">Manage Schools</h3>
              <p className="text-sm text-gray-500 mt-1">Add, edit or remove schools</p>
            </Link>
            
            <Link 
              href="/desire2025/admin/students"
              className="bg-sage-50 hover:bg-sage-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-sage-700">Manage Students</h3>
              <p className="text-sm text-gray-500 mt-1">View and manage student data</p>
            </Link>
            
            <Link 
              href="/desire2025/admin/certificates"
              className="bg-sage-50 hover:bg-sage-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-sage-700">Certificates</h3>
              <p className="text-sm text-gray-500 mt-1">Manage certificate templates</p>
            </Link>
            
            <Link 
              href="/desire2025/admin/id-cards"
              className="bg-sage-50 hover:bg-sage-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-sage-700">ID Cards</h3>
              <p className="text-sm text-gray-500 mt-1">Manage ID card templates</p>
            </Link>
            
            <Link 
              href="/desire2025/admin/check-in"
              className="bg-sage-50 hover:bg-sage-100 p-4 rounded-lg transition-colors"
            >
              <h3 className="font-medium text-sage-700">Check-In</h3>
              <p className="text-sm text-gray-500 mt-1">Scan QR codes or search students</p>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 