import { Link, useParams } from "react-router-dom"
import { demoProducts, getCategoryById } from "@/lib/demo-data"
import { getProductImageUrl } from "@/lib/product-images"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import type { Product } from "@/lib/demo-data"

const statusVariant: Record<Product["status"], "success" | "warning" | "destructive"> = {
  in_stock: "success",
  low_stock: "warning",
  out_of_stock: "destructive",
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = id ? demoProducts.find((p) => p.id === Number(id)) : undefined
  const category = product ? getCategoryById(product.categoryId) : undefined

  if (!product) {
    return (
      <div className="space-y-6">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products">
          <Button variant="outline" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/products">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="aspect-square bg-muted">
            <img
              src={getProductImageUrl(product.id, product.categoryId, 600)}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{category?.name}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">SKU: {product.sku}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant={statusVariant[product.status]}>
              {product.status.replace("_", " ")}
            </Badge>
          </div>

          <Card>
            <CardContent className="pt-6">
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Category</dt>
                  <dd className="mt-0.5 text-foreground">{category?.name ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Stock</dt>
                  <dd className="mt-0.5 text-foreground">{product.stock} units</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">SKU</dt>
                  <dd className="mt-0.5 font-mono text-foreground">{product.sku}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                  <dd className="mt-0.5">
                    <Badge variant={statusVariant[product.status]}>
                      {product.status.replace("_", " ")}
                    </Badge>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Link to="/products">
            <Button variant="outline">Back to products</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
