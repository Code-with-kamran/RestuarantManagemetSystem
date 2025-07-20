'use client'
import React, { useState } from "react";
import {  Upload, X, HelpCircle } from "lucide-react";
import Image from 'next/image';

interface FormData {
  productName: string;
  sku?: string;
  unit?: string;
  brand?: string;
  category: string;
  subCategory?: string;
  alertQuantity?: string;
  productDescription?: string;
  weight?: string;
  customField1?: string;
  customField2?: string;
  customField3?: string;
  customField4?: string;
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
  });

  const [selectedFileName, setSelectedFileName] = useState<string>("No file chosen");
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);

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
      setProductImageFile(file);
      setSelectedFileName(file.name);

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
    setSelectedFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key as keyof FormData] as string | Blob);
    });

    if (productImageFile) {
      dataToSend.append("product_image", productImageFile);
    }

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch("http://localhost:3001/MOCK_PRODUCTS", {
        method: "POST",
        body: dataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product added successfully:", result);
        // Using a custom message box instead of alert()
        // You would implement a modal or toast notification here
        alert("Product added successfully!"); // Placeholder for custom message box
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
        setSelectedFileName("No file chosen");
      } else {
        const errorData = await response.json();
        console.error("Failed to add product:", errorData);
        // Using a custom message box instead of alert()
        alert(`Failed to add product: ${errorData.message || response.statusText}`); // Placeholder for custom message box
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Using a custom message box instead of alert()
      alert("An error occurred while submitting the form."); // Placeholder for custom message box
    }
  };

  return (
    <div
      className="h-[calc(100vh-100px)] overflow-auto mt-6 ml-6  flex text-[var(--color-foreground)] bg-[var(--color-background)]"
      
    >
      <div className="flex-1 h-screenflex flex-col overflow-auto custom-scrollbar">
        <main className="flex-1 overflow-auto pr-6 pb-6 ">
          <div className="min-w-6xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <h1
                className="text-2xl font-semibold text-[var(--color-primary, #2563eb)]"
                 // Default text-gray-900
              >
                Add New Product
              </h1>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              id="add-product-form"
              className="rounded-lg shadow-sm border bg-[var(--color-card-background)]"
              
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Product Image */}
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium"
                       // Default text-gray-700
                    >
                      Product Image
                    </label>
                    <div
                      className="border-2 border-dashed rounded-lg p-8 text-center relative"
                       // Default border-gray-300
                    >
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
                            className="absolute top-2 right-2 rounded-full p-1"
                           
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <Upload
                          className="w-12 h-12 mx-auto mb-4"
                         // Default text-gray-400
                        />
                      )}
                      <input
                        type="file"
                        id="product-image-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleProductImageChange}
                      />
                      <label
                        htmlFor="product-image-upload"
                        className="px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200"
                       
                      >
                        Upload
                      </label>
                      <p
                        className="text-xs mt-2"
                      >
                        Max File Size : 5MB
                      </p>
                      <p
                        className="text-xs"
                      >
                        Aspect ratio should be 1:1
                      </p>
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="space-y-2 flex gap-6 flex-col">
                    <div>
                      <label
                        className="block text-sm font-medium"
                      >
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={formData.productName}
                        onChange={handleInputChange}
                        className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                      
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        className="text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Unit</span>
                        <HelpCircle
                          className="w-4 h-4"
                        />
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleInputChange}
                        className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                     
                      >
                        <option value="">Please Select</option>
                        <option value="pcs">Pcs</option>
                        <option value="kg">KG</option>
                      </select>
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="space-y-2 flex flex-col gap-6">
                    <div>
                      <label
                        className="text-sm font-medium flex items-center space-x-1"
                       
                      >
                        <span>SKU:</span>
                        <HelpCircle
                          className="w-4 h-4"
                        />
                      </label>
                      <input
                        type="text"
                        name="sku"
                        placeholder="Product SKU"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                     
                      />
                    </div>
                    {/* Brand */}
                    <div className="space-y-2">
                      <div>
                        <label
                          className="text-sm font-medium flex items-center space-x-1 mb-2.5"
                        >
                          <span>Brand</span>
                          <HelpCircle
                            className="w-4 h-4"
                          />
                        </label>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                         
                        >
                          <option value="">Please Select</option>
                          <option value="brandA">Brand A</option>
                          <option value="brandB">Brand B</option>
                        </select>
                      </div>
                    </div>
                  </div>

                 

                  {/* Barcode Type */}
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium"
                    >
                      Barcode Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                     
                    >
                      <option>Code 128 (C128)</option>
                    </select>
                  </div>

                  {/* Sub Category */}
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium"
                    >
                      Sub Category:
                    </label>
                    <select
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleInputChange}
                      className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                    
                    >
                      <option value="">Please Select</option>
                      <option value="drinks">Drinks</option>
                      <option value="food">Food</option>
                    </select>
                  </div>

                  {/* Business Locations */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium flex items-center space-x-1"
                    >
                      <span>Business Locations:</span>
                      <HelpCircle
                        className="w-4 h-4"
                      />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                      >
                        <span>Sadax (BL001)</span>
                        <X className="w-3 h-3 cursor-pointer" />
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium"
                     
                    >
                      Category :
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                  
                    >
                      <option value="">Please Select</option>
                      <option value="beverages">Beverages</option>
                      <option value="bakery">Bakery</option>
                    </select>
                  </div>

                  {/* Alert Quantity */}
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium flex items-center space-x-1"
                    >
                      <span>Alert Quantity</span>
                      <HelpCircle
                        className="w-4 h-4"
                      />
                    </label>
                    <input
                      type="text"
                      name="alertQuantity"
                      placeholder="Alert Quantity"
                      value={formData.alertQuantity}
                      onChange={handleInputChange}
                      className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                    
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
                      className=" bg-[var(--color-card-background)] w-4 h-4 rounded focus:ring-2"
                     
                    />
                    <span
                      className="text-sm font-medium flex items-center space-x-1"
                    >
                      <span>Manage Stock?</span>
                      <HelpCircle
                        className="w-4 h-4"
                      />
                    </span>
                  </label>
                  <p
                    className="text-sm ml-6"
                  >
                    Enable stock management at product level
                  </p>
                </div>

                {/* Product Description and Brochure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label
                      className="bg-[var(--color-card-background)]block text-sm font-medium"
                    >
                      Product Description
                    </label>
                    <textarea
                      name="productDescription"
                      placeholder="Write description ..."
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-[var(--color-card-background)] w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent resize-none"
                     
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="block text-sm font-medium"
                    >
                      Product brochure:
                    </label>
                    <div
                      className="border rounded-lg p-4"
                   
                    >
                      <div className="flex items-center justify-between">
                        <input
                          type="file"
                          onChange={handleBrochureFileChange}
                          className=" bg-[var(--color-card-background)] hidden"
                          id="brochure-upload"
                          accept=".pdf,.csv,.zip,.doc,.docx,.jpeg"
                        />
                        <label
                          htmlFor="brochure-upload"
                          className="px-4 py-2 rounded cursor-pointer transition-colors duration-200"
                          
                        >
                          Choose File
                        </label>
                        <span
                          className="text-sm"
                        >
                          {selectedFileName}
                        </span>
                      </div>
                      <div
                        className="mt-2 text-xs"
                      >
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
                        className="w-4 bg-[var(--color-card-background)] h-4 rounded focus:ring-2"
                      
                      />
                      <span
                        className="text-sm font-medium flex items-center space-x-1"
                      >
                        <span>
                          Enable Product description, IMEI or Serial Number
                        </span>
                        <HelpCircle
                          className="w-4 h-4"
                        />
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
                        className="bg-[var(--color-card-background)] w-4 h-4 rounded focus:ring-2"
                      />
                      <span
                        className="bg-[var(--color-card-background)] text-sm font-medium flex items-center space-x-1"
                      >
                        <span>Not for Selling</span>
                        <HelpCircle
                          className="w-4 h-4"
                        />
                      </span>
                    </label>
                  </div>
                </div>

      
               
              </div>
              <div
                className="flex justify-end p-6 border-t"
              >
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  
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
