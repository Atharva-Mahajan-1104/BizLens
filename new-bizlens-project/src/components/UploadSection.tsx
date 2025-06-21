import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileCheck, AlertCircle, LogIn, Shield } from 'lucide-react';
import { useAuth } from '../utils/AuthContext'; // Import useAuth
import axios from 'axios'; // Import axios

export default function UploadSection() {
  const { isAuthenticated } = useAuth(); // Get authentication status
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadStatus('uploading');

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    // Send file to backend
    axios.post('/api/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      },
    })
    .then(response => {
      setUploadStatus('success');
      console.log('File uploaded successfully:', response.data);
    })
    .catch(error => {
      setUploadStatus('error');
      console.error('Error uploading file:', error);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
  });

  return (
    <section id="upload-section" className="py-16 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">Upload Your Bills</h2>
          <p className="mt-4 text-lg text-gray-600">
            Drag and drop your files or click to browse
          </p>
        </motion.div>

        {isAuthenticated ? (
          <motion.div
            whileHover={{ scale: isDragActive ? 1.05 : 1 }}
            className="max-w-3xl mx-auto"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
              }`}
            >
              <input {...getInputProps()} />
              <Upload
                className={`mx-auto h-12 w-12 ${
                  isDragActive ? 'text-primary-500' : 'text-gray-400'
                }`}
              />
              <p className="mt-4 text-sm text-gray-600">
                Support for PDF, XLS, XLSX, and CSV files
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <LogIn className="mx-auto h-12 w-12 text-primary-500 mb-4" />
            <p className="text-lg text-gray-600 mb-4">
              Please <a href="/login" className="text-primary-600 underline">login</a> to upload files.
            </p>
            <Shield className="mx-auto h-12 w-12 text-primary-500 mb-4" />
            <p className="text-lg text-gray-600">
              Your data is secure with us.
            </p>
          </motion.div>
        )}

        {uploadStatus !== 'idle' && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              {uploadStatus === 'uploading' && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Uploading...</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="bg-primary-600 h-2 rounded-full"
                    />
                  </div>
                </>
              )}

              {uploadStatus === 'success' && (
                <div className="flex items-center text-green-600">
                  <FileCheck className="h-5 w-5 mr-2" />
                  <span>Upload completed successfully!</span>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Error uploading file. Please try again.</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your data is encrypted and secure. Read our privacy policy to learn more.</p>
        </div>
      </div>
    </section>
  );
}
