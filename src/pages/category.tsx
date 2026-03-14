import { useState } from "react"
import { demoCategories, type Category } from "@/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { Search, FolderTree, Pencil, Trash2 } from "lucide-react"

const emptyCategory: Omit<Category, "id"> = {
  name: "",
  slug: "",
  description: "",
  productCount: 0,
}

export function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>(() => [...demoCategories])
  const [search, setSearch] = useState("")

  const [createOpen, setCreateOpen] = useState(false)
  const [editCategory, setEditCategory] = useState<Category | null>(null)
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null)
  const [form, setForm] = useState(emptyCategory)

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setForm(emptyCategory)
    setCreateOpen(true)
  }

  const openEdit = (c: Category) => {
    setEditCategory(c)
    setForm({
      name: c.name,
      slug: c.slug,
      description: c.description,
      productCount: c.productCount,
    })
  }

  const handleCreate = () => {
    const newId = Math.max(0, ...categories.map((c) => c.id)) + 1
    setCategories([...categories, { ...form, id: newId }])
    setCreateOpen(false)
    setForm(emptyCategory)
  }

  const handleUpdate = () => {
    if (!editCategory) return
    setCategories(categories.map((c) => (c.id === editCategory.id ? { ...form, id: c.id } : c)))
    setEditCategory(null)
    setForm(emptyCategory)
  }

  const handleDelete = () => {
    if (!deleteCategory) return
    setCategories(categories.filter((c) => c.id !== deleteCategory.id))
    setDeleteCategory(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Categories
        </h1>
        <p className="text-muted-foreground mt-1">
          Organize products by category.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-5 w-5" />
            All categories
          </CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or slug..."
                className="pl-9 w-full sm:w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={openCreate}>Add category</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <Table className="min-w-[500px]">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="font-mono text-muted-foreground">{cat.slug}</TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">{cat.description}</TableCell>
                  <TableCell className="text-right">{cat.productCount}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(cat)} className="gap-1">
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteCategory(cat)}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
            <p className="text-sm text-muted-foreground">Create a new category.</p>
          </DialogHeader>
          <form className="space-y-4 pt-2" onSubmit={(e) => { e.preventDefault(); handleCreate(); }}>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Category name" required />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="category-slug" required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
            </div>
            <div className="space-y-2">
              <Label>Product count</Label>
              <Input type="number" min="0" value={form.productCount} onChange={(e) => setForm({ ...form, productCount: Number(e.target.value) || 0 })} placeholder="0" />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Modal */}
      <Dialog open={!!editCategory} onOpenChange={(o) => !o && setEditCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <p className="text-sm text-muted-foreground">Update category details.</p>
          </DialogHeader>
          <form className="space-y-4 pt-2" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Category name" required />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="category-slug" required />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
            </div>
            <div className="space-y-2">
              <Label>Product count</Label>
              <Input type="number" min="0" value={form.productCount} onChange={(e) => setForm({ ...form, productCount: Number(e.target.value) || 0 })} />
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={!!deleteCategory} onOpenChange={(o) => !o && setDeleteCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete category</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <strong>{deleteCategory?.name}</strong>? This action cannot be undone.
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
