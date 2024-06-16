import Image from 'next/image'
import Link from 'next/link'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductType } from '@/schemaValidations/product.schema'
import { Button } from '@/components/ui/button'

interface ProductListProps {
  productList: ProductType[]
}

export function ProductList({ productList }: ProductListProps) {
  return (
    <div>
      <Table>
        <TableCaption>Product List</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Product Description</TableHead>
            <TableHead>Product Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {productList.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image src={product.image} width={48} height={48} alt={product.name} />
              </TableCell>

              <TableCell className="text-blue-500">
                <Link href={`/products/${product.id}/details`}>{product.name}</Link>
              </TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>

              <TableCell>
                <div className="gap-2 flex">
                  <Link href={`/products/${product.id}`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" variant="destructive">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
