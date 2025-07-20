"use client";
import React, { useState } from "react";
import { ChevronDown, Upload, X, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
interface FormData {
  productName: string;
  sku?: string; // Made optional
  unit?: string; // Made optional
  brand?: string; // Made optional
  category: string;
  subCategory?: string; // Made optional
  alertQuantity?: string; // Made optional
  productDescription?: string; // Made optional
  weight?: string; // Made optional
  customField1?: string; // Already optional
  customField2?: string; // Already optional
  customField3?: string; // Already optional
  customField4?: string; // Already optional
  manageStock?: boolean;
  enableProductDescription?: boolean;
  notForSelling?: boolean;
}

const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    sku: "",
    unit: "",
    brand: "",
    category: "",
    subCategory: "",
    alertQuantity: "",
    productDescription: "",
    weight: "",
    customField1: "",
    customField2: "",
    customField3: "",
    customField4: "",
    manageStock: false,
    enableProductDescription: false,
    notForSelling: false,
    // product_image: null,
  });

  const [selectedFileName, setSelectedFileName] = useState<string>("No file chosen");
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null); // State for image preview
  const [productImageFile, setProductImageFile] = useState<File | null>(null); // State to hold the actual image file

  const handleInputChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImageFile(file); // Store the actual file
      setSelectedFileName(file.name);

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProductImageFile(null);
      setSelectedFileName("No file chosen");
      setProductImagePreview(null);
    }
  };

  const handleBrochureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // This state is for the brochure file name display, not for previewing
    setSelectedFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    const dataToSend = new FormData();
    // Append all form data
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key as keyof FormData] as string | Blob);
    });

    // Append the image file if it exists
    if (productImageFile) {
      dataToSend.append("product_image", productImageFile);
    }
    // You might also want to append the brochure file here if you plan to upload it
    // if (brochureFile) {
    //   dataToSend.append("product_brochure", brochureFile);
    // }


    console.log("Submitting form data:", formData); // Log current state

    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:3001/MOCK_PRODUCTS", {
        method: "POST",
        // When sending FormData, don't set Content-Type header manually,
        // the browser will set it automatically with the correct boundary.
        body: dataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added successfully:", result);
        alert("Product added successfully!");
        // Optionally, reset form or redirect
        setFormData({
          productName: "",
          sku: "",
          unit: "",
          brand: "",
          category: "",
          subCategory: "",
          alertQuantity: "",
          productDescription: "",
          weight: "",
          customField1: "",
          customField2: "",
          customField3: "",
          customField4: "",
          manageStock: false,
          enableProductDescription: false,
          notForSelling: false,
        });
        setProductImageFile(null);
        setProductImagePreview(null);
        setSelectedFileName("No file chosen"); // Reset brochure file name as well
      } else {
        const errorData = await response.json();
        console.error("Failed to add product:", errorData);
        alert(`Failed to add product: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <Link href="/dashboard">Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">
                Add new product
              </h1>
              <div className="flex items-center space-x-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                  <span onSubmit={handleSubmit} >submite</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Form */}
            {/* Added onSubmit handler to the form element */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Product Image */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative">
                      {productImagePreview ? (
                        <div className="relative w-full h-48 mb-4">
                          <Image
                            src={productImagePreview}
                            alt="Product Preview"
                          width={100}
                          height={100}
                            className="object-contain w-full h-full rounded-lg mx-auto"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setProductImagePreview(null);
                              setProductImageFile(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      )}
                      <input
                        type="file"
                        id="product-image-upload"
                        className="hidden"
                        accept="image/*" // Accept all image types
                        onChange={handleProductImageChange}
                      />
                      <label
                        htmlFor="product-image-upload"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
                      >
                        Upload
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Max File Size : 5MB
                      </p>
                      <p className="text-xs text-gray-500">
                        Aspect ratio should be 1:1
                      </p>
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="space-y-2 flex gap-6 flex-col">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                        <span>Unit</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Please Select</option>
                        {/* Add more options here based on your units */}
                        <option value="pcs">Pcs</option>
                        <option value="kg">KG</option>
                      </select>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="space-y-2 flex flex-col gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                        <span>SKU:</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </label>
                      <input
                        type="text"
                        name="sku"
                        placeholder="Product SKU"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {/* Brand */}
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-1 mb-2.5">
                          <span>Brand</span>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </label>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Please Select</option>
                          {/* Add more options here based on your brands */}
                          <option value="brandA">Brand A</option>
                          <option value="brandB">Brand B</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Unit (Duplicate - keeping for now based on your original code) */}
                  <div className="space-y-2">
                    <label className=" text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <span>Unit</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </label>
                    <select
                      name="unit" // This is a duplicate `unit` field from above
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Please Select</option>
                      {/* Add more options here */}
                    </select>
                  </div>

                  {/* Barcode Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Barcode Type <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Code 128 (C128)</option>
                    </select>
                  </div>

                  {/* Sub Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Category:
                    </label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Please Select</option>
                      {/* Add more options here */}
                    </select>
                  </div>

                  {/* Business Locations */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <span>Business Locations:</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                        <span>Sadax (BL001)</span>
                        <X className="w-3 h-3 cursor-pointer" />
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Category :
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Please Select</option>
                      {/* Add more options here */}
                    </select>
                  </div>

                  {/* Alert Quantity */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <span>Alert Quantity</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </label>
                    <input
                      type="text"
                      name="alertQuantity"
                      placeholder="Alert Quantity"
                      value={formData.alertQuantity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Manage Stock Checkbox */}
                <div className="mt-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="manageStock"
                      checked={formData.manageStock}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <span>Manage Stock?</span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </span>
                  </label>
                  <p className="text-sm text-gray-500 ml-6">
                    Enable stock management at product level
                  </p>
                </div>

                {/* Product Description and Brochure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Description
                    </label>
                    <textarea
                      name="productDescription"
                      placeholder="Write description ..."
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product brochure:
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <input
                          type="file"
                          onChange={handleBrochureFileChange} // Updated to brochure handler
                          className="hidden"
                          id="brochure-upload"
                          accept=".pdf,.csv,.zip,.doc,.docx,.jpeg"
                        />
                        <label
                          htmlFor="brochure-upload"
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-200"
                        >
                          Choose File
                        </label>
                        <span className="text-sm text-gray-500">
                          {selectedFileName}
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Max File Size : 5MB</p>
                        <p>
                          Allowed File : .pdf, csv, .zip, .doc, .docx, .jpeg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Checkboxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="enableProductDescription"
                        checked={formData.enableProductDescription}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                        <span>
                          Enable Product description, IMEI or Serial Number
                        </span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="notForSelling"
                        checked={formData.notForSelling}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                        <span>Not for Selling</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                      </span>
                    </label>
                  </div>
                </div>

                {/* Custom Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Weight:
                    </label>
                    <input
                      type="text"
                      name="weight"
                      placeholder="Weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Field1:
                    </label>
                    <input
                      type="text"
                      name="customField1"
                      placeholder="Custom Field1"
                      value={formData.customField1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Field2:
                    </label>
                    <input
                      type="text"
                      name="customField2"
                      placeholder="Custom Field2"
                      value={formData.customField2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Field3:
                    </label>
                    <input
                      type="text"
                      name="customField3"
                      placeholder="Custom Field3"
                      value={formData.customField3}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Custom Field4:
                    </label>
                    <input
                      type="text"
                      name="customField4"
                      placeholder="Custom Field4"
                      value={formData.customField4}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Service Staff Timer */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service staff timer/Preparation time (In minutes)
                  </label>
                </div>
              </div>
              <div className="flex justify-end p-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProductPage;