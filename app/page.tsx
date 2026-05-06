"use client";
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // جلب البيانات مباشرة من Postgres (عبر API داخلي أو عمل fetch)
    fetch('/api/circles').then(res => res.json()).then(setReports);
  }, []);

  return (
    <main dir="rtl" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        body { background: #f5f0e8; }
        .table-card { background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #1a5c5c; color: white; padding: 12px; }
        td { padding: 10px; border-bottom: 1px solid #eee; text-align: center; }
        .badge { color: #c0392b; font-weight: bold; font-size: 0.8rem; }
        .btn-wa { background: #25d366; color: white; border: none; padding: 5px 15px; border-radius: 20px; cursor: pointer; }
      `}</style>

      <h2 style={{ textAlign: 'center', color: '#1a5c5c' }}>📋 تقارير الأتمتة الذكية</h2>
      
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>اسم الحلقة</th>
              <th>الملاحظة</th>
              <th>تنبيه</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r: any, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 'bold' }}>{r.circle_name}</td>
                <td className="badge">{r.reason}</td>
                <td>
                  <button className="btn-wa" onClick={() => window.open(`https://wa.me/966575260502?text=${encodeURIComponent('نرجو مراجعة حلقة: ' + r.circle_name)}`)}>
                    واتساب
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
