import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, UploadCloud, CheckCircle, Clock } from 'lucide-react';

const initialDocs = [
  { id: 1, name: 'Offer Letter', type: 'PDF', status: 'Verified', date: 'Jan 05, 2024', size: '1.2 MB', data: null },
  { id: 2, name: 'Aadhar Card', type: 'JPG', status: 'Verified', date: 'Jan 08, 2024', size: '450 KB', data: null },
  { id: 3, name: 'PAN Card', type: 'PDF', status: 'Verified', date: 'Jan 08, 2024', size: '2.1 MB', data: null },
  { id: 4, name: 'Degree Certificate', type: 'PDF', status: 'Pending Review', date: 'Jul 01, 2026', size: '3.4 MB', data: null },
];

export default function MyDocuments() {
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('hrms_my_docs');
    return saved ? JSON.parse(saved) : initialDocs;
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('hrms_my_docs', JSON.stringify(documents));
  }, [documents]);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newDoc = {
        id: Date.now(),
        name: file.name.split('.').slice(0, -1).join('.'),
        type: file.name.split('.').pop().toUpperCase(),
        status: 'Pending Review',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        size: formatSize(file.size),
        data: event.target.result // Base64 data for download
      };
      setDocuments([newDoc, ...documents]);
    };
    reader.readAsDataURL(file);
    
    // Reset input so the same file can be uploaded again if needed
    e.target.value = '';
  };

  const handleDownload = (doc) => {
    if (doc.data) {
      const a = document.createElement('a');
      a.href = doc.data;
      a.download = `${doc.name}.${doc.type.toLowerCase()}`;
      a.click();
    } else {
      alert("This is a mock document without actual file data.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Documents</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and upload your official employee documents.</p>
        </div>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <UploadCloud className="w-5 h-5" /> Upload Document
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Document Name</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type / Size</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Upload Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">{doc.type}</span>
                    <span className="text-xs text-gray-400 ml-2">({doc.size})</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">
                    {doc.date}
                  </td>
                  <td className="py-4 px-6">
                    {doc.status === 'Verified' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                        <CheckCircle className="w-3.5 h-3.5" /> {doc.status}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                        <Clock className="w-3.5 h-3.5" /> {doc.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button onClick={() => handleDownload(doc)} className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors" title="Download">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
