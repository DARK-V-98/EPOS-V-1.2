import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Package,
  Upload,
  X,
  Plus,
  Trash2
} from 'lucide-react';

export default function AddProduct() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/products" className="btn-ghost p-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-display font-bold"
          >
            Add New Product
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Fill in the product details below
          </motion.p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            Save as Draft
          </button>
          <button className="btn-primary">
            <Save className="w-4 h-4" />
            <span>Save Product</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-6">Basic Information</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name *</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">SKU / Item Code *</label>
                  <input
                    type="text"
                    placeholder="e.g., IPH-15PM-256"
                    className="input-field font-mono"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Barcode</label>
                  <input
                    type="text"
                    placeholder="Scan or enter barcode"
                    className="input-field font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select className="input-field">
                    <option value="">Select category</option>
                    <option>Smartphones</option>
                    <option>Laptops</option>
                    <option>Audio</option>
                    <option>Tablets</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <select className="input-field">
                    <option value="">Select brand</option>
                    <option>Apple</option>
                    <option>Samsung</option>
                    <option>Sony</option>
                    <option>Google</option>
                    <option>Dell</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  rows={4}
                  placeholder="Enter product description..."
                  className="input-field resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-6">Pricing & Tax</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Cost Price *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input-field pl-8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Selling Price *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input-field pl-8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tax Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0"
                    className="input-field pr-8"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Unit</label>
                <select className="input-field">
                  <option>Pieces (pcs)</option>
                  <option>Kilograms (kg)</option>
                  <option>Liters (l)</option>
                  <option>Boxes</option>
                  <option>Cartons</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Inventory */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-6">Inventory</h2>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Initial Stock</label>
                <input
                  type="number"
                  placeholder="0"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Minimum Stock Level *</label>
                <input
                  type="number"
                  placeholder="10"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Warehouse</label>
                <select className="input-field">
                  <option>Main Warehouse</option>
                  <option>Store A</option>
                  <option>Store B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Batch Number</label>
                <input
                  type="text"
                  placeholder="Optional"
                  className="input-field"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
              <input
                type="date"
                className="input-field max-w-xs"
              />
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4">Product Images</h2>
            
            <div className="space-y-4">
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive/90 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-foreground">Upload Images</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4">Status</h2>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  defaultChecked
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-offset-0"
                />
                <div>
                  <p className="font-medium text-sm">Active</p>
                  <p className="text-xs text-muted-foreground">Product is visible and can be sold</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-offset-0"
                />
                <div>
                  <p className="font-medium text-sm">Inactive</p>
                  <p className="text-xs text-muted-foreground">Product is hidden from listings</p>
                </div>
              </label>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-card p-6"
          >
            <h2 className="font-display font-semibold text-lg mb-4">Quick Actions</h2>
            
            <div className="space-y-2">
              <button className="btn-ghost w-full justify-start text-sm">
                <Plus className="w-4 h-4" />
                <span>Duplicate Product</span>
              </button>
              <button className="btn-ghost w-full justify-start text-sm">
                <Package className="w-4 h-4" />
                <span>Add to Purchase Order</span>
              </button>
              <button className="btn-ghost w-full justify-start text-sm text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4" />
                <span>Delete Product</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
