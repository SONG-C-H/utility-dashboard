import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter } from 'recharts';

const UtilityDashboard = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('electricity');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Sample data for demonstration
        const sampleData = [
          {
            date: '25/07/15(월)',
            shortDate: '07/15',
            dayOfWeek: '월',
            lowLoadElecUsage: 1200,
            maxLoadElecUsage: 2800,
            midLoadElecUsage: 1800,
            totalElecUsage: 5800,
            waterUsage: 450,
            heatingBoilerUsage: 120,
            hotWaterBoilerUsage: 280,
            chillerHeaterUsage: 340,
            occupancy: 75,
            minTemp: 22,
            maxTemp: 28,
            avgTemp: 25
          },
          {
            date: '25/07/16(화)',
            shortDate: '07/16',
            dayOfWeek: '화',
            lowLoadElecUsage: 1150,
            maxLoadElecUsage: 2650,
            midLoadElecUsage: 1700,
            totalElecUsage: 5500,
            waterUsage: 420,
            heatingBoilerUsage: 110,
            hotWaterBoilerUsage: 260,
            chillerHeaterUsage: 320,
            occupancy: 68,
            minTemp: 21,
            maxTemp: 27,
            avgTemp: 24
          },
          {
            date: '25/07/17(수)',
            shortDate: '07/17',
            dayOfWeek: '수',
            lowLoadElecUsage: 1300,
            maxLoadElecUsage: 2900,
            midLoadElecUsage: 1950,
            totalElecUsage: 6150,
            waterUsage: 480,
            heatingBoilerUsage: 130,
            hotWaterBoilerUsage: 300,
            chillerHeaterUsage: 360,
            occupancy: 82,
            minTemp: 23,
            maxTemp: 29,
            avgTemp: 26
          },
          {
            date: '25/07/18(목)',
            shortDate: '07/18',
            dayOfWeek: '목',
            lowLoadElecUsage: 1180,
            maxLoadElecUsage: 2750,
            midLoadElecUsage: 1820,
            totalElecUsage: 5750,
            waterUsage: 440,
            heatingBoilerUsage: 115,
            hotWaterBoilerUsage: 275,
            chillerHeaterUsage: 330,
            occupancy: 71,
            minTemp: 22,
            maxTemp: 28,
            avgTemp: 25
          },
          {
            date: '25/07/19(금)',
            shortDate: '07/19',
            dayOfWeek: '금',
            lowLoadElecUsage: 1400,
            maxLoadElecUsage: 3200,
            midLoadElecUsage: 2100,
            totalElecUsage: 6700,
            waterUsage: 520,
            heatingBoilerUsage: 140,
            hotWaterBoilerUsage: 320,
            chillerHeaterUsage: 380,
            occupancy: 89,
            minTemp: 24,
            maxTemp: 30,
            avgTemp: 27
          },
          {
            date: '25/07/20(토)',
            shortDate: '07/20',
            dayOfWeek: '토',
            lowLoadElecUsage: 1550,
            maxLoadElecUsage: 3500,
            midLoadElecUsage: 2300,
            totalElecUsage: 7350,
            waterUsage: 580,
            heatingBoilerUsage: 160,
            hotWaterBoilerUsage: 360,
            chillerHeaterUsage: 420,
            occupancy: 95,
            minTemp: 25,
            maxTemp: 31,
            avgTemp: 28
          },
          {
            date: '25/07/21(일)',
            shortDate: '07/21',
            dayOfWeek: '일',
            lowLoadElecUsage: 1520,
            maxLoadElecUsage: 3400,
            midLoadElecUsage: 2250,
            totalElecUsage: 7170,
            waterUsage: 560,
            heatingBoilerUsage: 155,
            hotWaterBoilerUsage: 350,
            chillerHeaterUsage: 410,
            occupancy: 92,
            minTemp: 24,
            maxTemp: 30,
            avgTemp: 27
          }
        ];
        
        setData(sampleData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  const formatTooltip = (value, name) => {
    if (name.includes('Usage') || name.includes('Temp')) {
      return [`${value.toLocaleString()}`, name];
    }
    return [`${value}%`, name];
  };

  const electricityData = data.map(d => ({
    date: d.shortDate,
    dayOfWeek: d.dayOfWeek,
    '경부하': d.lowLoadElecUsage,
    '최대부하': d.maxLoadElecUsage,
    '중부하': d.midLoadElecUsage,
    '총 전력': d.totalElecUsage
  }));

  const utilizationData = data.map(d => ({
    date: d.shortDate,
    dayOfWeek: d.dayOfWeek,
    '객실점유율': d.occupancy,
    '평균기온': d.avgTemp,
    '총 전력 사용량': d.totalElecUsage / 1000
  }));

  const gasData = data.map(d => ({
    date: d.shortDate,
    dayOfWeek: d.dayOfWeek,
    '난방보일러': d.heatingBoilerUsage,
    '온수보일러': d.hotWaterBoilerUsage,
    '냉온수기': d.chillerHeaterUsage
  }));

  const correlationData = data.map(d => ({
    occupancy: d.occupancy,
    electricity: d.totalElecUsage,
    temperature: d.avgTemp,
    date: d.shortDate
  }));

  const tabs = [
    { id: 'electricity', name: '전력 사용량', icon: '⚡' },
    { id: 'gas', name: '가스 사용량', icon: '🔥' },
    { id: 'utilization', name: '점유율 & 기온', icon: '📊' },
    { id: 'correlation', name: '상관관계', icon: '📈' }
  ];

  const totalElectricity = data.reduce((sum, d) => sum + d.totalElecUsage, 0);
  const avgOccupancy = data.reduce((sum, d) => sum + d.occupancy, 0) / data.length;
  const maxElectricity = Math.max(...data.map(d => d.totalElecUsage));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            호텔 유틸리티 사용량 대시보드
          </h1>
          <p className="text-slate-300 text-lg">2025년 7월 일일 전력, 가스, 수도 사용량 분석</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">총 전력 사용량</p>
                <p className="text-3xl font-bold text-white">{totalElectricity.toLocaleString()}</p>
                <p className="text-blue-200 text-sm">kWh</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm font-medium">평균 객실 점유율</p>
                <p className="text-3xl font-bold text-white">{avgOccupancy.toFixed(1)}%</p>
                <p className="text-emerald-200 text-sm">일평균</p>
              </div>
              <div className="bg-emerald-500 p-3 rounded-full">
                <span className="text-2xl">🏨</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">최대 전력 사용량</p>
                <p className="text-3xl font-bold text-white">{maxElectricity.toLocaleString()}</p>
                <p className="text-orange-200 text-sm">kWh/일</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-1 mb-8 bg-slate-800 p-2 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700">
          {activeTab === 'electricity' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">일일 전력 사용량 추이</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={electricityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip formatter={formatTooltip} contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="경부하" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} />
                  <Line type="monotone" dataKey="최대부하" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', r: 4 }} />
                  <Line type="monotone" dataKey="중부하" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
                  <Line type="monotone" dataKey="총 전력" stroke="#F59E0B" strokeWidth={3} dot={{ fill: '#F59E0B', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'gas' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">일일 가스 사용량 (시설별)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={gasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip formatter={formatTooltip} contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="난방보일러" fill="#DC2626" />
                  <Bar dataKey="온수보일러" fill="#2563EB" />
                  <Bar dataKey="냉온수기" fill="#059669" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'utilization' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">객실 점유율과 기온 변화</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={utilizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                  <YAxis yAxisId="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip formatter={formatTooltip} contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="객실점유율" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 5 }} />
                  <Line yAxisId="right" type="monotone" dataKey="평균기온" stroke="#F97316" strokeWidth={2} dot={{ fill: '#F97316', r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="총 전력 사용량" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#06B6D4', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'correlation' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center">점유율과 전력 사용량 상관관계</h2>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={correlationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" dataKey="occupancy" name="점유율" unit="%" stroke="#9CA3AF" domain={[0, 100]} />
                  <YAxis type="number" dataKey="electricity" name="전력사용량" unit="kWh" stroke="#9CA3AF" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [name === 'electricity' ? `${value.toLocaleString()} kWh` : name === 'occupancy' ? `${value}%` : `${value}°C`, name === 'electricity' ? '전력사용량' : name === 'occupancy' ? '점유율' : '평균기온']} contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  <Scatter dataKey="electricity" fill="#3B82F6" />
                </ScatterChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center text-slate-300">
                <p>X축: 객실 점유율 (%), Y축: 총 전력 사용량 (kWh)</p>
                <p className="text-sm text-slate-400 mt-1">점유율이 높을수록 전력 사용량이 증가하는 경향을 확인할 수 있습니다.</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-blue-300">주요 인사이트</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>주말(토,일)에 전력 사용량이 상대적으로 높음</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>객실 점유율과 전력 사용량 간 양의 상관관계</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-400 mt-1">•</span>
                <span>기온이 높은 날 냉방으로 인한 전력 사용량 증가</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-amber-300">운영 권장사항</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>피크 시간대 전력 사용량 분산 검토</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>가스 설비별 효율성 점검 필요</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 mt-1">•</span>
                <span>주말 고점유율 시 에너지 절약 방안 모색</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilityDashboard;
