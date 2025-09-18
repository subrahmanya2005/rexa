"use client";
import React, { useState, useEffect } from "react";
// import { Search, Plus, Edit, Trash2, Filter,User } from "lucide-react";
import { Search, Plus, Edit, Trash2, User, X, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { checkRole } from '@/utils/roles'
import { redirect } from 'next/navigation'

// Types
interface Product {
  _id: string;
  name: string;
  description: string;
  category: "shoes" | "footwear" | "clothing" | "accessories" | "fragrance";
  price: number;
  imageUrl: string; // comes from backend
}

//


  


// API Base
const ADMIN_API_BASE = "http://localhost:3000";

const categories = [
  "shoes",
  "footwear",
  "clothing",
  "accessories",
  "fragrance",
] as const;

const AdminPanel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Form state (no image here, file is separate)
  const [formData, setFormData] = useState<Omit<Product, "_id" | "imageUrl">>({
    name: "",
    description: "",
    category: "shoes",
    price: 0,
  });
//Go to  the other web app
const router=useRouter()
const handleProductClick = (id: string) => {
  router.push(`/products/${id}`);
};


 // Fetch products from API (client-only)
useEffect(() => {
  const fetchProducts = async () => {
    const isAdmin = await checkRole('admin')
    console.log(isAdmin)
    try {
      const response = await fetch(`${ADMIN_API_BASE}/admin/api`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store", // ✅ prevent caching mismatch
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setProducts(json.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);


  // ✅ Add product
  const addProduct = async () => {
    if (!file) throw new Error("No image selected");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", String(formData.price));
    data.append("image", file);

    const res = await fetch(`${ADMIN_API_BASE}/admin/api`, {
      method: "POST",
      body: data,
    });

    if (!res.ok) throw new Error("Failed to add product");

    const result = await res.json();
    setProducts((prev) => [...prev, result.data]);
    return result.data;
  };

  // ✅ Update product
  const updateProduct = async (id: string) => {
    try {
      const response = await fetch(`${ADMIN_API_BASE}/admin/api/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const updated: Product = data.data ?? data;

      setProducts((prev) =>
        prev.map((product) => (product._id === id ? updated : product))
      );

      console.log("Product updated successfully:", updated);
      alert("Product updated successfully!");
      return updated;
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
      throw error;
    }
  };

  // ✅ Delete product
  const deleteProductAPI = async (id: string) => {
    try {
      const response = await fetch(`${ADMIN_API_BASE}/admin/api/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProducts((prev) => prev.filter((product) => product._id !== id));
      console.log("Product deleted successfully");
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
      throw error;
    }
  };

  // Filters
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  // Modal handlers
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      category: "shoes",
      price: 0,
    });
    setFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
    const product = products.find((p) => p._id === id) || null;
    setEditingProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
      });
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFile(null);
  };

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !formData.name ||
      !formData.description ||
      formData.price <= 0 ||
      !formData.category ||
      (!editingProduct && !file) // require file only for new product
    ) {
      alert(
        "⚠️ Please fill out all fields, select a category, and upload an image."
      );
      return;
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id);
      } else {
        await addProduct();
      }
      closeModal();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // ✅ Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === "file" && files && files[0]) {
      setFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || 0 : value,
      }));
    }
  };

 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      {/* <nav className="bg-blue-600 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-white text-xl sm:text-2xl font-bold">Rexa</h1>
              <span className="text-blue-200 text-sm ml-2 hidden sm:inline">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* <button
                onClick={fetchProducts}
                className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-200"
              > */}
                
            

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          {/* Always Visible Search and Add */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full text-sm"
              />
            </div>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              <Filter size={20} />
              {isMobileFiltersOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filter Section */}
          <div
            className={`${isMobileFiltersOpen ? "block" : "hidden"} lg:block`}
          >
            <div className="pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <label htmlFor="categoryFilter" className="text-gray-700 font-medium text-sm">
                  Filter by Category:
                </label>
                <select
                  id="categoryFilter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-auto border text-gray-700 border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Product Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-lg shadow-sm cursor-pointer"
                        onClick={() => handleProductClick(product._id)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://placehold.co/300x300?text=No+Image";
                        }}
                      />
                    </td>
                    <td 
                      className="px-6 py-4 cursor-pointer"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-900 max-w-xs line-clamp-2">
                        {product.description}
                      </div>
                    </td>
                    <td 
                      className="px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td 
                      className="px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <span className="text-sm font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(product._id);
                          }}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProductAPI(product._id);
                          }}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="divide-y divide-gray-200">
              {(filteredProducts ?? []).map((product) => (
                <div
                  key={product._id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-16 w-16 object-cover rounded-lg shadow-sm cursor-pointer"
                        onClick={() => handleProductClick(product._id)}
                        onError={(e) => {
                          if (
                            e.currentTarget.src !==
                            "https://placehold.co/300x300?text=No+Image"
                          ) {
                            e.currentTarget.src =
                              "https://placehold.co/300x300?text=No+Image";
                          }
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => handleProductClick(product._id)}
                        >
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                              {product.category}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:ml-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(product._id);
                            }}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                            title="Edit Product"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProductAPI(product._id);
                            }}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Product Count */}
        <div className="mt-4 text-sm text-gray-600 text-center sm:text-left">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Modal - NO BLACK BACKGROUND */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-300 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-lg transition-all duration-200"
                aria-label="Close modal"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border  placeholder-gray-700 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    required={!editingProduct}
                    className="w-full border  placeholder-gray-700 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                    placeholder="Enter detailed product description"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full border  placeholder-gray-700 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (Rs) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full border  placeholder-gray-700 border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;