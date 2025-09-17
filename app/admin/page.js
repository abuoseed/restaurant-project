"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle } from "lucide-react";

export default function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "main"
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        setMessage({ type: "error", text: "Please select an image file" });
        return;
      }
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "File size must be less than 5MB" });
        return;
      }
      setFile(selectedFile);
      setMessage({ type: "success", text: `Selected: ${selectedFile.name}` });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setMessage({ type: "error", text: "Please select an image file" });
      return;
    }

    if (!formData.name || !formData.price || !formData.category) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("file", file);

      const response = await fetch("/api/foods", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ 
          type: "success", 
          text: `Food "${formData.name}" added successfully!` 
        });
        // Reset form
        setFormData({ name: "", description: "", price: "", category: "main" });
        setFile(null);
        document.getElementById("file-input").value = "";
      } else {
        setMessage({ 
          type: "error", 
          text: result.error || "Failed to add food item" 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: "Network error. Please try again." 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">
            Add new food items to your restaurant menu
          </p>
        </motion.div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Add New Food Item
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Food Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Food Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Beef Burger"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the dish..."
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-2">
                    Price *
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="19.99"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="appetizers">Appetizers</option>
                    <option value="main">Main Courses</option>
                    <option value="desserts">Desserts</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="file-input" className="block text-sm font-medium mb-2">
                  Food Image *
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload an image
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </label>
                </div>
                {file && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>

              {/* Message */}
              {message.text && (
                <div className={`flex items-center gap-2 p-3 rounded-md ${
                  message.type === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {message.type === "success" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Add Food Item"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 p-6 bg-card rounded-lg border"
        >
          <h3 className="font-semibold mb-3">How to use:</h3>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Fill in the food name, description, and price</li>
            <li>Select a category (appetizers, main, desserts, beverages)</li>
            <li>Upload a high-quality image of the dish</li>
            <li>Click &quot;Add Food Item&quot; to save to Supabase</li>
            <li>The item will appear on your website immediately</li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
}
