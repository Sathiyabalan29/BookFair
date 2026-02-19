import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import DataTable from '../../components/common/DataTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await adminService.deleteUser(userId);
                fetchUsers();
                alert('User deleted successfully');
            } catch (error) {
                console.error("Error deleting user", error);
                alert('Failed to delete user.');
            }
        }
    };

    const columns = [
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        {
            label: 'Role', key: 'role', render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-bold ${row.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                    {row.role}
                </span>
            )
        },
        { label: 'Business', key: 'businessName' },
        { label: 'BRN', key: 'businessRegisterNumber' },
        { label: 'Phone', key: 'phoneNumber' },
    ];

    const actions = (row) => (
        <div className="flex space-x-2 justify-end">
            <button
                onClick={() => handleDeleteUser(row.id)}
                className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded transition-colors"
                title="Delete User"
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#1e3a5f]">
                    User Management
                </h1>
            </div>

            <DataTable
                columns={columns}
                data={users}
                isLoading={loading}
                actions={actions}
            />
        </div>
    );
};

export default Users;
