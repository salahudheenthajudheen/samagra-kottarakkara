'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/desire2025/DashboardLayout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { QRCodeCanvas } from 'qrcode.react';

// Mock type definitions
interface Student {
  id: string;
  name: string;
  class?: string;
  school_id: string;
  photo_url?: string;
}

// Mock data functions
const getStudents = async (): Promise<Student[]> => {
  // Return mock data
  return [
    { id: '1', name: 'John Doe', class: '10A', school_id: 'school1', photo_url: '' },
    { id: '2', name: 'Jane Smith', class: '12B', school_id: 'school1', photo_url: '' },
    { id: '3', name: 'Alice Johnson', class: '11C', school_id: 'school2', photo_url: '' }
  ];
};

const checkInStudent = async (studentId: string, eventId: string): Promise<boolean> => {
  // Mock successful check-in
  console.log(`Checked in student ${studentId} for event ${eventId}`);
  return true;
};

export default function CheckInPage() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState(false);
  const [eventId, setEventId] = useState('event-' + new Date().toISOString().split('T')[0]);
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (students && searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = students.filter(
        (student) => student.name.toLowerCase().includes(query)
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [searchQuery, students]);

  const handleCheckIn = async (student: Student) => {
    try {
      setLoading(true);
      
      const result = await checkInStudent(student.id, eventId);
      
      if (result) {
        setSelectedStudent(student);
        setCheckedIn(true);
      } else {
        setError('Failed to check in student');
      }
    } catch (err) {
      console.error('Error checking in student:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleQRScan = async (data: string) => {
    if (!data || !students) return;
    
    try {
      const studentId = data;
      const student = students.find((s) => s.id === studentId);
      
      if (student) {
        await handleCheckIn(student);
        setScanMode(false);
      } else {
        setError('Student not found');
      }
    } catch (err) {
      console.error('Error processing QR code:', err);
      setError('Failed to process QR code');
    }
  };

  const resetCheckIn = () => {
    setSelectedStudent(null);
    setCheckedIn(false);
    setSearchQuery('');
  };

  return (
    <ProtectedRoute requireAdmin>
      <DashboardLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Student Check-In</h1>
          <p className="mt-1 text-sm text-gray-500">
            Check in students for events using name search or QR code
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
            <button
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              &times;
            </button>
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Event Details</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label
                htmlFor="eventId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event ID
              </label>
              <input
                type="text"
                id="eventId"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
          </div>
        </div>

        {checkedIn && selectedStudent ? (
          <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
              <h2 className="text-lg font-medium text-green-700">
                Check-In Successful
              </h2>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                {selectedStudent.photo_url ? (
                  <img
                    src={selectedStudent.photo_url}
                    alt={selectedStudent.name}
                    className="h-16 w-16 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full mr-4 bg-sage-200 flex items-center justify-center">
                    <span className="text-sage-600 text-xl font-medium">
                      {selectedStudent.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium">{selectedStudent.name}</h3>
                  <p className="text-gray-500">
                    {selectedStudent.class ? `Class: ${selectedStudent.class}` : ''}
                  </p>
                </div>
              </div>
              <button
                onClick={resetCheckIn}
                className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                Check In Another Student
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  {scanMode ? 'Scan QR Code' : 'Find Student'}
                </h2>
                <button
                  onClick={() => setScanMode(!scanMode)}
                  className="px-3 py-1 border border-sage-300 rounded-md text-sm font-medium text-sage-700 hover:bg-sage-50"
                >
                  {scanMode ? 'Search By Name' : 'Scan QR Code'}
                </button>
              </div>
            </div>
            
            {scanMode ? (
              <div className="p-6">
                <div className="mb-4 max-w-md mx-auto">
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '300px', 
                      backgroundColor: '#f3f4f6', 
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <p className="text-gray-500">Camera access required</p>
                  </div>
                  <p className="text-center text-gray-500 mt-2">
                    Point camera at student QR code
                  </p>
                </div>
                {/* In a real implementation, you would need to add QR code scanning logic here */}
              </div>
            ) : (
              <div className="p-6">
                <div className="mb-4">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Search Students
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                    placeholder="Enter student name..."
                  />
                </div>
                
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner"></div>
                    <p className="mt-2 text-gray-500">Loading students...</p>
                  </div>
                ) : filteredStudents.length > 0 ? (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Search Results
                    </h3>
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200 max-h-96 overflow-y-auto">
                      {filteredStudents.map((student) => (
                        <li key={student.id} className="p-4 hover:bg-gray-50">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              {student.photo_url ? (
                                <img
                                  src={student.photo_url}
                                  alt={student.name}
                                  className="h-10 w-10 rounded-full mr-3 object-cover"
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full mr-3 bg-sage-200 flex items-center justify-center">
                                  <span className="text-sage-600 font-medium">
                                    {student.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {student.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {student.class || 'No class specified'}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleCheckIn(student)}
                              className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-sage-500"
                            >
                              Check In
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : searchQuery.trim() ? (
                  <p className="text-center text-gray-500 py-4">
                    No students found matching "{searchQuery}"
                  </p>
                ) : null}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Generate Student QR Codes
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4">
              Generate QR codes for students to speed up the check-in process.
              Students can present these codes at events for quick check-in.
            </p>
            <a
              href="/desire2025/admin/students"
              className="inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            >
              View Students to Generate QR Codes
            </a>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}