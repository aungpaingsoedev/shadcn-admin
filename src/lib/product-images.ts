/**
 * Product images for admin (Unsplash).
 */

const categoryPhotoIds: Record<number, string> = {
  1: "1498049794561-7780e7231661",
  2: "1445205170230-053b83016050",
  3: "1556909114-f6e7ad7d3136",
  4: "1517836357463-d25dfeac3438",
  5: "1507003211169-0a1dd7228f2d",
}

export function getProductImageUrl(_productId: number, categoryId: number, width = 400): string {
  const id = categoryPhotoIds[categoryId as keyof typeof categoryPhotoIds] ?? categoryPhotoIds[1]
  return `https://images.unsplash.com/photo-${id}?w=${width}&q=80`
}
