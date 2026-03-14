/**
 * Demo data – no API calls. Use for development and demo.
 */

export interface User {
  id: number
  name: string
  email: string
  username: string
  role: string
  status: "active" | "inactive"
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  productCount: number
}

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  company?: string
  status: "active" | "inactive"
}

export interface Product {
  id: number
  name: string
  sku: string
  categoryId: number
  price: number
  stock: number
  status: "in_stock" | "low_stock" | "out_of_stock"
}

export const demoCustomers: Customer[] = [
  { id: 1, name: "Ko Min Aung", email: "minaung@example.com", phone: "+95 9 123 456 789", company: "Tech Co", status: "active" },
  { id: 2, name: "Ma Su Su", email: "susu@example.com", phone: "+95 9 234 567 890", company: "Design Studio", status: "active" },
  { id: 3, name: "U Hla Shwe", email: "hlashwe@example.com", phone: "+95 9 345 678 901", status: "inactive" },
  { id: 4, name: "Daw Khin Khin", email: "khinkhin@example.com", phone: "+95 9 456 789 012", company: "Retail Plus", status: "active" },
  { id: 5, name: "Ko Zaw Min", email: "zawmin@example.com", phone: "+95 9 567 890 123", company: "Startup XYZ", status: "active" },
]

export const demoUsers: User[] = [
  { id: 1, name: "Aung Paing Soe", email: "aungpaingsoe@example.com", username: "aungpaingsoe", role: "Admin", status: "active" },
  { id: 2, name: "Aung Paing Soe", email: "aung@example.com", username: "aungpaing", role: "Editor", status: "active" },
  { id: 3, name: "Thidar Htun", email: "thidar@example.com", username: "thidar", role: "Viewer", status: "active" },
  { id: 4, name: "Zaw Zaw", email: "zaw@example.com", username: "zawzaw", role: "Editor", status: "inactive" },
  { id: 5, name: "Mya Mya", email: "mya@example.com", username: "myamya", role: "Viewer", status: "active" },
]

export const demoCategories: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics", description: "Phones, laptops, gadgets", productCount: 7 },
  { id: 2, name: "Clothing", slug: "clothing", description: "Apparel and accessories", productCount: 6 },
  { id: 3, name: "Home & Garden", slug: "home-garden", description: "Furniture and decor", productCount: 5 },
  { id: 4, name: "Sports", slug: "sports", description: "Sports equipment and gear", productCount: 5 },
  { id: 5, name: "Books", slug: "books", description: "Books and stationery", productCount: 5 },
]

export const demoProducts: Product[] = [
  // Electronics (categoryId: 1)
  { id: 1, name: "Wireless Earbuds Pro", sku: "ELEC-001", categoryId: 1, price: 89.99, stock: 120, status: "in_stock" },
  { id: 2, name: "Laptop Stand", sku: "ELEC-002", categoryId: 1, price: 45.00, stock: 3, status: "low_stock" },
  { id: 7, name: "USB-C Hub", sku: "ELEC-003", categoryId: 1, price: 55.00, stock: 45, status: "in_stock" },
  { id: 9, name: "Portable Power Bank 20K", sku: "ELEC-004", categoryId: 1, price: 39.99, stock: 85, status: "in_stock" },
  { id: 10, name: "Bluetooth Speaker", sku: "ELEC-005", categoryId: 1, price: 69.00, stock: 42, status: "in_stock" },
  { id: 11, name: "Mechanical Keyboard", sku: "ELEC-006", categoryId: 1, price: 119.99, stock: 5, status: "low_stock" },
  { id: 12, name: "Wireless Mouse", sku: "ELEC-007", categoryId: 1, price: 29.99, stock: 0, status: "out_of_stock" },
  // Clothing (categoryId: 2)
  { id: 3, name: "Cotton T-Shirt", sku: "CLTH-001", categoryId: 2, price: 24.99, stock: 0, status: "out_of_stock" },
  { id: 8, name: "Running Shorts", sku: "CLTH-002", categoryId: 2, price: 32.00, stock: 18, status: "in_stock" },
  { id: 13, name: "Denim Jacket", sku: "CLTH-003", categoryId: 2, price: 79.99, stock: 22, status: "in_stock" },
  { id: 14, name: "Summer Dress", sku: "CLTH-004", categoryId: 2, price: 54.50, stock: 15, status: "in_stock" },
  { id: 15, name: "Sports Cap", sku: "CLTH-005", categoryId: 2, price: 19.99, stock: 90, status: "in_stock" },
  { id: 16, name: "Wool Sweater", sku: "CLTH-006", categoryId: 2, price: 64.00, stock: 2, status: "low_stock" },
  // Home & Garden (categoryId: 3)
  { id: 4, name: "Desk Lamp LED", sku: "HOME-001", categoryId: 3, price: 34.50, stock: 56, status: "in_stock" },
  { id: 17, name: "Throw Pillow Set", sku: "HOME-002", categoryId: 3, price: 28.00, stock: 38, status: "in_stock" },
  { id: 18, name: "Plant Pot Ceramic", sku: "HOME-003", categoryId: 3, price: 22.99, stock: 60, status: "in_stock" },
  { id: 19, name: "Wall Clock Modern", sku: "HOME-004", categoryId: 3, price: 44.00, stock: 12, status: "in_stock" },
  { id: 20, name: "Storage Baskets (Set of 3)", sku: "HOME-005", categoryId: 3, price: 35.99, stock: 4, status: "low_stock" },
  // Sports (categoryId: 4)
  { id: 5, name: "Yoga Mat", sku: "SPRT-001", categoryId: 4, price: 29.99, stock: 7, status: "low_stock" },
  { id: 21, name: "Resistance Bands Set", sku: "SPRT-002", categoryId: 4, price: 24.99, stock: 55, status: "in_stock" },
  { id: 22, name: "Water Bottle 1L", sku: "SPRT-003", categoryId: 4, price: 18.50, stock: 100, status: "in_stock" },
  { id: 23, name: "Jump Rope", sku: "SPRT-004", categoryId: 4, price: 14.99, stock: 0, status: "out_of_stock" },
  { id: 24, name: "Dumbbells 2kg Pair", sku: "SPRT-005", categoryId: 4, price: 42.00, stock: 20, status: "in_stock" },
  // Books (categoryId: 5)
  { id: 6, name: "Notebook Set", sku: "BOOK-001", categoryId: 5, price: 12.00, stock: 200, status: "in_stock" },
  { id: 25, name: "Ballpoint Pen Pack", sku: "BOOK-002", categoryId: 5, price: 8.99, stock: 150, status: "in_stock" },
  { id: 26, name: "Desk Organizer", sku: "BOOK-003", categoryId: 5, price: 26.50, stock: 35, status: "in_stock" },
  { id: 27, name: "Sticky Notes (6 Pack)", sku: "BOOK-004", categoryId: 5, price: 11.99, stock: 80, status: "in_stock" },
  { id: 28, name: "A4 Paper Ream", sku: "BOOK-005", categoryId: 5, price: 6.50, stock: 3, status: "low_stock" },
]

export function getCategoryById(id: number): Category | undefined {
  return demoCategories.find((c) => c.id === id)
}
