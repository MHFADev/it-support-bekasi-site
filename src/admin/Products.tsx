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
  Check
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  image_path?: string;
  category: string;
  stock_status: string;
  specifications: any[];
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initializeStorageBucket();
    fetchProducts();
    
    // Setup realtime subscription for products
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
          console.log('📡 Realtime change detected:', payload);
          
          if (payload.eventType === 'INSERT') {
            setProducts((prev) => {
              if (prev.some(p => p.id === payload.new.id)) {
                return prev;
              }
              return [payload.new as Product, ...prev];
            });
            toast.success('✨ Produk baru ditambahkan', { icon: '📦' });
          } else if (payload.eventType === 'UPDATE') {
            setProducts((prev) =>
              prev.map((p) => (p.id === payload.new.id ? (payload.new as Product) : p))
            );
            toast.success('✅ Produk diperbarui', { icon: '📝' });
          } else if (payload.eventType === 'DELETE') {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
            toast.success('🗑️ Produk dihapus', { icon: '✅' });
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Realtime subscription status:', status);
        if (status === 'SUBSCRIBED') {
          console.log('✅ Successfully subscribed to products realtime updates');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('❌ Realtime subscription error');
          toast.error('Realtime updates gagal. Refresh halaman untuk melihat perubahan.');
        }
      });

    return () => {
      console.log('🔌 Unsubscribing from realtime channel');
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
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image_url;
      let finalImagePath = formData.image_path;

      if (imageFile) {
        toast.loading('Mengoptimalkan & mengunggah gambar...', { id: 'upload' });
        
        try {
          const uploadResult = await uploadImageToSupabase(imageFile);
          finalImageUrl = uploadResult.url;
          finalImagePath = uploadResult.path;
          toast.success('Gambar berhasil diunggah', { id: 'upload' });
        } catch (uploadError: any) {
          console.error('Upload error details:', uploadError);
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
      console.error('Delete error:', error);
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
      
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, stock_status: newStatus } : p
      ));
      
      toast.success(`Status berubah ke ${newStatus === 'in_stock' ? 'Stok Ada' : 'Habis'}`);
    } catch (error: any) {
      console.error('Toggle status error:', error);
      toast.error('Gagal mengubah status');
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Produk</h1>
          <p className="text-muted-foreground">Tambah, edit, atau hapus inventaris laptop dan hardware.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={async () => {
              if (confirm('PERINGATAN: Ini akan menghapus SEMUA produk dari database. Apakah Anda yakin?')) {
                const { error } = await supabase.from('products').delete().neq('id', '0');
                if (error) toast.error('Gagal menghapus semua produk');
                else toast.success('Semua produk berhasil dihapus');
              }
            }}
            className="px-4 py-2 border border-destructive/20 text-destructive hover:bg-destructive/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
          >
            Hapus Semua
          </button>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary/25"
          >
            <Plus size={20} />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Cari produk..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-accent/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-accent/30 text-muted-foreground text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Produk</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold">Harga</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin mx-auto text-primary" size={32} />
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Tidak ada produk ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-accent/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-accent/20 border border-border flex items-center justify-center">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{product.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-accent/50 rounded-full text-xs font-medium text-muted-foreground">
                        {product.category || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(product.id, product.stock_status)}
                        className={`flex items-center space-x-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 ${
                          product.stock_status === 'in_stock' 
                            ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                            : 'text-destructive bg-destructive/10 hover:bg-destructive/20'
                        }`}
                        title="Klik untuk ubah status"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${product.stock_status === 'in_stock' ? 'bg-green-500' : 'bg-destructive'}`}></div>
                        <span>{product.stock_status === 'in_stock' ? 'Stok Ada' : 'Habis'}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={18} />
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between bg-card">
              <h3 className="text-xl font-bold text-foreground">{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Nama Produk</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 bg-accent/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                    placeholder="Contoh: Laptop ASUS Vivobook"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Harga (Rp)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 bg-accent/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Deskripsi</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 bg-accent/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none text-foreground"
                  placeholder="Detail spesifikasi dan kondisi..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Kategori</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 bg-accent/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Laptop">Laptop</option>
                    <option value="PC Desktop">PC Desktop</option>
                    <option value="Aksesoris">Aksesoris</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Status Stok</label>
                  <select 
                    value={formData.stock_status}
                    onChange={(e) => setFormData({...formData, stock_status: e.target.value})}
                    className="w-full px-4 py-2 bg-accent/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-foreground"
                  >
                    <option value="in_stock">Stok Ada</option>
                    <option value="out_of_stock">Habis</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <ImageIcon size={16} className="text-primary" />
                  Gambar Produk
                  <span className="text-destructive">*</span>
                </label>
                <div className="flex items-center gap-6">
                  <div className="w-40 h-40 rounded-3xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-accent/30 transition-all hover:border-primary/50 relative group">
                    {imageFile ? (
                      <>
                        <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button 
                            type="button"
                            onClick={() => setImageFile(null)}
                            className="bg-destructive text-white p-2 rounded-full hover:bg-destructive/80 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </>
                    ) : formData.image_url ? (
                      <>
                        <img src={formData.image_url} alt="Current" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">Gambar Saat Ini</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="text-muted-foreground/30" size={32} />
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input 
                      type="file" 
                      id="product-image"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            alert('Ukuran file terlalu besar. Maksimal 10MB.');
                            return;
                          }
                          setImageFile(file);
                        }
                      }}
                      className="hidden"
                    />
                    <label 
                      htmlFor="product-image"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-xl text-sm font-bold uppercase tracking-widest cursor-pointer hover:bg-primary/20 transition-all shadow-sm"
                    >
                      <ImageIcon size={18} />
                      {imageFile || formData.image_url ? 'Ganti Gambar' : 'Pilih Gambar'}
                    </label>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                      ✓ Format: JPG, PNG, atau WebP<br />
                      ✓ Maksimal 10MB<br />
                      ✓ Resolusi optimal: 800x800px<br />
                      <span className="text-primary">→ Gambar akan dioptimalkan otomatis</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-xl hover:bg-accent/50 transition-colors font-semibold text-foreground"
                >
                  Batal
                </button>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      <span>{editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}</span>
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
