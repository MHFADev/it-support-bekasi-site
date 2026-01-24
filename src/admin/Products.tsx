import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { uploadImageToSupabase, initializeStorageBucket } from '../lib/supabase-storage';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Loader2,
  Image as ImageIcon,
  Check,
  Cpu,
  HardDrive,
  Monitor,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Specification {
  label: string;
  value: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  image_path?: string;
  category: string;
  stock_status: string;
  specifications: Specification[];
  created_at?: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    image_path: '',
    stock_status: 'in_stock',
  });
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initializeStorageBucket();
    fetchProducts();
    
    const channel = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setProducts((prev) => {
              if (prev.some(p => p.id === payload.new.id)) return prev;
              return [payload.new as Product, ...prev];
            });
            toast.success('✨ Produk baru ditambahkan');
          } else if (payload.eventType === 'UPDATE') {
            setProducts((prev) =>
              prev.map((p) => (p.id === payload.new.id ? (payload.new as Product) : p))
            );
            toast.success('✅ Produk diperbarui');
          } else if (payload.eventType === 'DELETE') {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
            toast.success('🗑️ Produk dihapus');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal mengambil data produk');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const handleOpenModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image_url: product.image_url,
        image_path: product.image_path || '',
        stock_status: product.stock_status,
      });
      setSpecifications(product.specifications || []);
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        image_path: '',
        stock_status: 'in_stock',
      });
      setSpecifications([
        { label: 'Processor', value: '' },
        { label: 'RAM', value: '' },
        { label: 'Storage', value: '' },
        { label: 'Display', value: '' }
      ]);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { label: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index: number, field: keyof Specification, value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const convertToWebP = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          // Maintain aspect ratio while limiting max dimension
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = (height / width) * maxDim;
              width = maxDim;
            } else {
              width = (width / height) * maxDim;
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const fileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
              const webpFile = new File([blob], fileName, { type: 'image/webp' });
              resolve(webpFile);
            } else {
              reject(new Error('Canvas toBlob failed'));
            }
          }, 'image/webp', 0.8); // 0.8 quality for good balance
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image_url;
      let finalImagePath = formData.image_path;

      if (imageFile) {
        toast.loading('Mengompres dan mengunggah gambar...', { id: 'upload' });
        try {
          // Mandatory WebP Conversion
          const webpFile = await convertToWebP(imageFile);
          const uploadResult = await uploadImageToSupabase(webpFile);
          finalImageUrl = uploadResult.url;
          finalImagePath = uploadResult.path;
          toast.success('Gambar (WebP) berhasil diunggah', { id: 'upload' });
        } catch (uploadError: any) {
          toast.error(`Upload gagal: ${uploadError.message}`, { id: 'upload' });
          throw uploadError;
        }
      }

      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: finalImageUrl,
        image_path: finalImagePath,
        stock_status: formData.stock_status,
        specifications: specifications.filter(s => s.label && s.value),
        updated_at: new Date().toISOString(),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
        toast.success('Produk berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
        toast.success('Produk berhasil ditambahkan');
      }

      setIsModalOpen(false);
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      if (error) throw error;
      toast.success('Produk berhasil dihapus');
    } catch (error: any) {
      toast.error('Gagal menghapus produk');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'in_stock' ? 'out_of_stock' : 'in_stock';
      const { error } = await supabase
        .from('products')
        .update({ 
          stock_status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      toast.error('Gagal mengubah status');
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manajemen Inventaris</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola produk laptop dan hardware IT Solutions Anda.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <Plus size={20} />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Stats Quick View (Mock for better look) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Produk', value: products.length, icon: ImageIcon, color: 'blue' },
          { label: 'Stok Tersedia', value: products.filter(p => p.stock_status === 'in_stock').length, icon: Check, color: 'green' },
          { label: 'Stok Habis', value: products.filter(p => p.stock_status !== 'in_stock').length, icon: AlertCircle, color: 'red' },
          { label: 'Kategori', value: new Set(products.map(p => p.category)).size, icon: Search, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan nama atau kategori..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900/50 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4 text-left">Detail Produk</th>
                <th className="px-6 py-4 text-left">Kategori</th>
                <th className="px-6 py-4 text-left">Harga</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-600" size={40} />
                    <p className="mt-4 text-gray-500">Memuat data...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <Search size={32} />
                    </div>
                    <p className="text-gray-500 font-medium">Tidak ada produk yang sesuai dengan pencarian Anda.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 flex-shrink-0 border border-gray-100 dark:border-slate-600 shadow-sm">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <ImageIcon size={24} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{product.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                        {product.category || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 dark:text-white">
                        Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(product.id, product.stock_status)}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                          product.stock_status === 'in_stock' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${product.stock_status === 'in_stock' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        {product.stock_status === 'in_stock' ? 'Ready Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:border-blue-600 transition-all shadow-sm"
                          title="Edit Produk"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-red-600 hover:border-red-600 transition-all shadow-sm"
                          title="Hapus Produk"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-200 dark:border-slate-700 animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingProduct ? 'Edit Informasi Produk' : 'Buat Produk Baru'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Lengkapi detail spesifikasi untuk hasil terbaik di e-commerce.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-slate-900 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Basic Info */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Nama Produk</label>
                      <input 
                        required
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white transition-all"
                        placeholder="Contoh: MacBook Pro M3 Max"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Harga (Rp)</label>
                        <input 
                          required
                          type="number" 
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white transition-all"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Kategori</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white transition-all appearance-none"
                        >
                          <option value="">Pilih Kategori</option>
                          <option value="Laptop">Laptop</option>
                          <option value="PC Desktop">PC Desktop</option>
                          <option value="Aksesoris">Aksesoris</option>
                          <option value="Hardware">Hardware</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Deskripsi Lengkap</label>
                      <textarea 
                        required
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white transition-all resize-none"
                        placeholder="Berikan deskripsi produk yang menarik..."
                      />
                    </div>
                  </div>

                  {/* Right Column: Image & Status */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Gambar Produk</label>
                      <div className="relative group">
                        <div className="aspect-video rounded-3xl border-2 border-dashed border-gray-200 dark:border-slate-700 overflow-hidden bg-gray-50 dark:bg-slate-900 flex items-center justify-center transition-all group-hover:border-blue-500/50">
                          {imageFile ? (
                            <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                          ) : formData.image_url ? (
                            <img src={formData.image_url} alt="Current" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                              <ImageIcon size={48} />
                              <span className="text-sm font-semibold">Belum ada gambar</span>
                            </div>
                          )}
                          
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                            <input 
                              type="file" 
                              id="product-image-upload"
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && setImageFile(e.target.files[0])}
                              className="hidden"
                            />
                            <label 
                              htmlFor="product-image-upload"
                              className="px-4 py-2 bg-white text-gray-900 rounded-xl font-bold text-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                            >
                              Ganti Gambar
                            </label>
                            {(imageFile || formData.image_url) && (
                              <button 
                                type="button"
                                onClick={() => { setImageFile(null); setFormData({...formData, image_url: ''}) }}
                                className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-xl"
                              >
                                Hapus
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Status Ketersediaan</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'in_stock', label: 'Tersedia', icon: Check, color: 'green' },
                          { id: 'out_of_stock', label: 'Habis', icon: X, color: 'red' }
                        ].map((status) => (
                          <button
                            key={status.id}
                            type="button"
                            onClick={() => setFormData({...formData, stock_status: status.id})}
                            className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-bold ${
                              formData.stock_status === status.id 
                                ? `bg-${status.color}-50 dark:bg-${status.color}-900/20 border-${status.color}-500 text-${status.color}-600 dark:text-${status.color}-400`
                                : 'bg-gray-50 dark:bg-slate-900 border-transparent text-gray-400'
                            }`}
                          >
                            <status.icon size={18} />
                            <span>{status.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications Section */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Cpu className="text-blue-500" size={20} />
                        Spesifikasi Teknis
                      </h4>
                      <p className="text-sm text-gray-500">Tambahkan detail hardware seperti Processor, RAM, GPU, dll.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={addSpecification}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white transition-all"
                    >
                      + Tambah Baris
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex gap-2 items-center bg-gray-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-gray-100 dark:border-slate-700 animate-in slide-in-from-left duration-300">
                        <input 
                          type="text" 
                          placeholder="Label (ex: RAM)"
                          value={spec.label}
                          onChange={(e) => updateSpecification(index, 'label', e.target.value)}
                          className="flex-1 bg-white dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm dark:text-white outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input 
                          type="text" 
                          placeholder="Value (ex: 16GB)"
                          value={spec.value}
                          onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                          className="flex-1 bg-white dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm dark:text-white outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button 
                          type="button"
                          onClick={() => removeSpecification(index)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-8 py-6 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 transition-all"
                >
                  Batal
                </button>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Memproses Data...</span>
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      <span>{editingProduct ? 'Simpan Perubahan' : 'Terbitkan Produk'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;

