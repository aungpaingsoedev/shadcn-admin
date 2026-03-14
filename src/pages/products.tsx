import { useState } from "react"
import { Link } from "react-router-dom"
import { demoProducts, demoCategories, getCategoryById, type Product } from "@/lib/demo-data"
import { getProductImageUrl } from "@/lib/product-images"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Search, Package, Pencil, Trash2, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const statusVariant: Record<Product["status"], "success" | "warning" | "destructive"> = {
  in_stock: "success",
  low_stock: "warning",
  out_of_stock: "destructive",
}

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  sku: "",
  categoryId: 1,
  price: 0,
  stock: 0,
  status: "in_stock",
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(() => [...demoProducts])
  const [search, setSearch] = useState("")

  const [createOpen, setCreateOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)
  const [form, setForm] = useState(emptyProduct)

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm(emptyProduct)
    setCreateOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setForm({
      name: p.name,
      sku: p.sku,
      categoryId: p.categoryId,
      price: p.price,
      stock: p.stock,
      status: p.status,
    })
  }

  const handleCreate = () => {
    const newId = Math.max(0, ...products.map((p) => p.id)) + 1
    setProducts([...products, { ...form, id: newId }])
    setCreateOpen(false)
    setForm(emptyProduct)
  }

  const handleUpdate = () => {
    if (!editProduct) return
    setProducts(products.map((p) => (p.id === editProduct.id ? { ...form, id: p.id } : p)))
    setEditProduct(null)
    setForm(emptyProduct)
  }

  const handleDelete = () => {
    if (!deleteProduct) return
    setProducts(products.filter((p) => p.id !== deleteProduct.id))
    setDeleteProduct(null)
  }

  const categories = demoCategories

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Products
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your product catalog.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All products
          </CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or SKU..."
                className="pl-9 w-full sm:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={openCreate}>Add product</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => {
                const category = getCategoryById(product.categoryId)
                return (
                  <TableRow key={product.id}>
                    <TableCell className="w-16 p-2">
                      <Link to={`/products/${product.id}`} className="block aspect-square w-12 overflow-hidden rounded-md bg-muted">
                        <img
                          src={getProductImageUrl(product.id, product.categoryId, 96)}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link to={`/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-muted-foreground">{product.sku}</TableCell>
                    <TableCell>{category?.name ?? "—"}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[product.status]}>
                        {product.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(product)} className="gap-1">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteProduct(product)}
                        className="gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add product</DialogTitle>
            <p className="text-sm text-muted-foreground">Create a new product.</p>
          </DialogHeader>
          <form className="space-y-4 pt-2" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" required />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="SKU-001" required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
                className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" step="0.01" min="0" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) || 0 })} placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Product["status"] })}
                className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
              >
                <option value="in_stock">In stock</option>
                <option value="low_stock">Low stock</option>
                <option value="out_of_stock">Out of stock</option>
              </select>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={!!editProduct} onOpenChange={(o) => !o && setEditProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
            <p className="text-sm text-muted-foreground">Update product details.</p>
          </DialogHeader>
          <form className="space-y-4 pt-2" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" required />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} placeholder="SKU-001" required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
                className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price</Label>
                <Input type="number" step="0.01" min="0" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Product["status"] })}
                className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
              >
                <option value="in_stock">In stock</option>
                <option value="low_stock">Low stock</option>
                <option value="out_of_stock">Out of stock</option>
              </select>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteProduct} onOpenChange={(o) => !o && setDeleteProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete product</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <strong>{deleteProduct?.name}</strong>? This action cannot be undone.
            </p>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="button" variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
