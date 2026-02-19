import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const DataTable = ({ columns, data, isLoading, actions }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-12">
                <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-[#1e3a5f]" />
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 bg-white rounded-lg shadow">
                No data available.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#1e3a5f] text-white">
                        {columns.map((col) => (
                            <th key={col.key || col.label} className="p-4 font-semibold text-sm uppercase tracking-wider">
                                {col.label}
                            </th>
                        ))}
                        {actions && <th className="p-4 font-semibold text-sm uppercase tracking-wider text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((row, index) => (
                        <tr key={row.id || index} className="hover:bg-gray-50 transition-colors">
                            {columns.map((col) => (
                                <td key={`${row.id || index}-${col.key}`} className="p-4 text-gray-700">
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                            {actions && (
                                <td className="p-4 text-right space-x-2 whitespace-nowrap">
                                    {actions(row)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
