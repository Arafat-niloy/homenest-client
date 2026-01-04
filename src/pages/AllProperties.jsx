import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search, Filter, SortAsc, MapPin, Tag, DollarSign } from "lucide-react"; // Icons for professional UI

const AllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for Search, Filter, Sort and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // Backend expects these params to handle filtering and sorting
        const response = await axios.get("https://homenest-server-one.vercel.app/properties", {
          params: {
            search: searchTerm,
            category: category,
            sort: sortOrder,
            minPrice: minPrice,
            maxPrice: maxPrice,
          },
        });
        setProperties(response.data);
        setCurrentPage(1); // Reset to first page on new search/filter
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
      setLoading(false);
    };

    fetchProperties();
  }, [searchTerm, category, sortOrder, minPrice, maxPrice]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const handleReset = () => {
    setSearchTerm("");
    setCategory("");
    setSortOrder("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Explore Extraordinary Properties
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          From luxury villas to modern apartments, find the perfect place that fits your lifestyle and budget.
        </p>
      </section>

      {/* Advanced Filter & Search Bar */}
      <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name/location..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Tag className="absolute left-3 top-3 text-gray-400" size={20} />
            <select 
              className="select select-bordered w-full pl-10"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          {/* Sort Option */}
          <div className="relative">
            <SortAsc className="absolute left-3 top-3 text-gray-400" size={20} />
            <select 
              className="select select-bordered w-full pl-10"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex gap-2">
             <input
              type="number"
              placeholder="Min $"
              className="input input-bordered w-1/2"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max $"
              className="input input-bordered w-1/2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
            <button onClick={handleReset} className="btn btn-ghost btn-sm text-error">Reset Filters</button>
        </div>
      </div>

      {/* Properties Grid */}
      <section>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {currentItems.length === 0 ? (
              <div className="text-center py-20">
                <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-2xl font-semibold text-gray-500">
                  No properties found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="join border border-primary">
            <button 
              className={`join-item btn ${currentPage === 1 ? 'btn-disabled' : ''}`}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${currentPage === index + 1 ? 'btn-primary' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              className={`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProperties;