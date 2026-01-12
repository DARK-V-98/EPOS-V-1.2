
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  PlusCircle,
  MinusCircle,
  XCircle,
  UserPlus,
  CreditCard,
  DollarSign,
  QrCode,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { posProducts } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { Logo } from '@/components/icons';

type CartItem = (typeof posProducts)[0] & { quantity: number };

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product: (typeof posProducts)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const filteredProducts = posProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="flex h-screen w-full bg-background font-body">
      <div className="flex w-full flex-col lg:flex-row">
        {/* Left Side: Product Selection */}
        <div className="flex w-full flex-col lg:w-3/5 xl:w-2/3">
          <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6" />
              <span className="font-headline text-lg">Inventory Ace POS</span>
            </Link>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </header>
          <ScrollArea className="flex-1">
            <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredProducts.map((product) => {
                const placeholderImage = getImage(product.imageId);
                return (
                  <Card
                    key={product.id}
                    className="cursor-pointer overflow-hidden transition-all hover:shadow-lg"
                    onClick={() => addToCart(product)}
                  >
                    <div className="relative">
                      {placeholderImage && (
                        <Image
                          src={placeholderImage.imageUrl}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="h-32 w-full object-cover"
                          data-ai-hint={placeholderImage.imageHint}
                        />
                      )}
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-medium leading-tight">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        ${product.price.toFixed(2)}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Right Side: Cart and Checkout */}
        <div className="flex w-full flex-col border-l bg-card lg:w-2/5 xl:w-1/3">
          <div className="flex h-16 items-center justify-between border-b px-6">
            <h2 className="text-lg font-semibold font-headline">Current Order</h2>
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No products in cart.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="border-t p-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold font-headline">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              <Button variant="secondary" size="lg" className="flex-col h-auto">
                <CreditCard className="mb-1" /> Card
              </Button>
              <Button variant="secondary" size="lg" className="flex-col h-auto">
                <DollarSign className="mb-1" /> Cash
              </Button>
              <Button variant="secondary" size="lg" className="flex-col h-auto">
                <QrCode className="mb-1" /> Other
              </Button>
            </div>
            <Button size="lg" className="mt-4 w-full text-lg">
              Complete Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
