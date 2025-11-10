import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/properties', {
                    params: {
                        search: searchTerm,
                        sort: sortOrder
                    }
                });
                setProperties(response.data);
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            }
            setLoading(false);
        };

        fetchProperties();
    }, [searchTerm, sortOrder]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchInput = e.target.elements.search.value;
        setSearchTerm(searchInput);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <section className="text-center">
                <h2 className="text-4xl font-bold mb-4">All Properties</h2>
                <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
                    Browse our complete collection of properties. Use the search and sort
                    options to find exactly what you're looking for.
                </p>
            </section>

            {/* Search & Sort Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 p-4 bg-base-200 rounded-lg shadow">

                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="flex-grow w-full md:w-auto">
                    <div className="form-control">
                        <div className="input-group w-full">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search by Property Name..."
                                className="input input-bordered w-full"
                            />
                            <button type="submit" className="btn btn-primary text-white">
                                Search
                            </button>
                        </div>
                    </div>
                </form>

                {/* Sort Dropdown */}
                <div className="form-control w-full md:w-auto md:min-w-xs">
                    <select
                        className="select select-bordered"
                        value={sortOrder}
                        onChange={handleSortChange}
                    >
                        <option value="">Sort by (Default)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>

            {/* Properties Grid */}
            <section>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {properties.length === 0 ? (
                            <p className="text-center text-xl text-gray-500">
                                No properties found matching your criteria.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {properties.map(property => (
                                    <PropertyCard key={property._id} property={property} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default AllProperties;
