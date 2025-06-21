import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface ItemData {
  item: string;
  quantity: number;
}

interface CustomerData {
  customer: string;
  totalSpent: number;
}

interface ReportData {
  mostSoldItems: ItemData[];
  leastSoldItems: ItemData[];
  topCustomers: CustomerData[];
  totalRevenue: number;
}

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [reportData, setReportData] = useState<ReportData>({
    mostSoldItems: [],
    leastSoldItems: [],
    topCustomers: [],
    totalRevenue: 0,
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/file-analysis/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileId: 12, // Replace with actual file ID
        filePath: 'D:\\BizLens-Backend\\uploads\\excel_files\\Book1.xlsx', // Replace with actual file path
      }),
    })
      .then((response) => response.json())
      .then((data: ReportData) => {
        setReportData(data);
      })
      .catch((error) => {
        console.error('Error fetching report data:', error);
      });
  }, []);

  const filteredReports = reportData.topCustomers.filter((customer) => {
    const matchesSearch = customer.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all';
    return matchesSearch && matchesFilter;
  });

  const mostSoldItemsChart = {
    labels: reportData.mostSoldItems.map((item) => item.item),
    datasets: [
      {
        label: 'Most Sold Items',
        data: reportData.mostSoldItems.map((item) => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const leastSoldItemsChart = {
    labels: reportData.leastSoldItems.map((item) => item.item),
    datasets: [
      {
        label: 'Least Sold Items',
        data: reportData.leastSoldItems.map((item) => item.quantity),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const topCustomersChart = {
    labels: reportData.topCustomers.map((customer) => customer.customer),
    datasets: [
      {
        label: 'Top Customers',
        data: reportData.topCustomers.map((customer) => customer.totalSpent),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalRevenueChart = {
    labels: ['Total Revenue'],
    datasets: [
      {
        label: 'Total Revenue',
        data: [reportData.totalRevenue],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Analysis Reports</h1>
          <p className="mt-4 text-xl text-gray-600">View and analyze your reports</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="all">All Types</option>
                <option value="sales">Sales</option>
                <option value="expenses">Expenses</option>
                <option value="analysis">Analysis</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="min-w-full divide-y divide-gray-200">
            <div className="bg-gray-50">
              <div className="grid grid-cols-3 gap-4 px-6 py-3">
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</div>
                <div className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</div>
              </div>
            </div>
            <div className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <motion.div key={report.customer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-900">{report.customer}</div>
                  <div className="text-sm text-gray-500">{report.totalSpent}</div>
                  <div className="text-sm text-gray-500">{'Customer'}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Most Sold Items</h2>
          <div className="w-full md:w-1/2 mx-auto">
            <Bar data={mostSoldItemsChart} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Least Sold Items</h2>
          <div className="w-full md:w-1/2 mx-auto">
            <Bar data={leastSoldItemsChart} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Customers</h2>
          <div className="w-full md:w-1/2 mx-auto">
            <Pie data={topCustomersChart} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Total Revenue</h2>
          <div className="w-full md:w-1/2 mx-auto">
            <Doughnut data={totalRevenueChart} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
