import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Edit3, Trash2, Eye, MapPin, Calendar, Tag, DollarSign, Plus } from 'lucide-react';

const MyProperties = () => {
  const { user } = useAuth();
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyProperties = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://homenest-server-one.vercel.app/properties/my?email=${user.email}`
      );
      setMyProperties(response.data);
    } catch (error) {
      console.error('Failed to fetch my properties:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyProperties();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://homenest-server-one.vercel.app/properties/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Property has been removed.', 'success');
              const remaining = myProperties.filter((prop) => prop._id !== id);
              setMyProperties(remaining);
            }
          })
          .catch((err) => {
            console.error('Delete failed:', err);
            Swal.fire('Error!', 'Failed to delete property.', 'error');
          });
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-base-content">Manage My Properties</h2>
          <p className="text-gray-500 mt-1">
            You have listed <span className="text-primary font-bold">{myProperties.length}</span> properties.
          </p>
        </div>
        <Link to="/dashboard/add-properties" className="btn btn-primary btn-md gap-2">
          <Plus size={20} /> Add New Property
        </Link>
      </div>

      {myProperties.length === 0 ? (
        <div className="bg-base-100 rounded-3xl p-20 text-center shadow-sm border border-base-200">
          <div className="bg-base-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Tag size={40} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold">No properties found</h3>
          <p className="text-gray-500 mt-2 mb-6">You haven't added any listings yet. Start today!</p>
          <Link to="/dashboard/add-properties" className="btn btn-outline btn-primary">
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {myProperties.map((property) => (
            <div
              key={property._id}
              className="group bg-base-100 rounded-2xl overflow-hidden border border-base-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Image Section with Badge */}
              <div className="relative">
                <img
                  src={property.imageLink}
                  alt={property.propertyName}
                  className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-primary font-semibold shadow-md px-3 py-3">
                    {property.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold truncate pr-2">{property.propertyName}</h2>
                  <div className="text-secondary font-bold text-lg flex items-center">
                    <DollarSign size={18} />
                    {property.price?.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
                  <MapPin size={14} className="flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>

                <div className="flex items-center justify-between border-t border-base-200 pt-4 mt-2">
                   <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={12} />
                      {new Date(property.createdAt).toLocaleDateString()}
                   </div>
                   
                   {/* Action Buttons */}
                   <div className="flex items-center gap-2">
                      <Link 
                        to={`/property-details/${property._id}`} 
                        className="btn btn-ghost btn-circle btn-sm tooltip" 
                        data-tip="View Details"
                      >
                        <Eye size={18} className="text-info" />
                      </Link>

                      <Link 
                        to={`/dashboard/update-property/${property._id}`} 
                        className="btn btn-ghost btn-circle btn-sm tooltip" 
                        data-tip="Edit Property"
                      >
                        <Edit3 size={18} className="text-success" />
                      </Link>

                      <button
                        onClick={() => handleDelete(property._id)}
                        className="btn btn-ghost btn-circle btn-sm tooltip"
                        data-tip="Delete Listing"
                      >
                        <Trash2 size={18} className="text-error" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;