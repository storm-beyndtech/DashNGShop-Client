import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Heart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const CartPage = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const shipping = total > 50000 ? 0 : 2500
  const tax = total * 0.075 // 7.5% VAT
  const finalTotal = total + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-neutral-400" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-neutral-900">Shopping Cart</h1>
              <p className="text-neutral-600">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-neutral-600 hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 border-b border-neutral-100 last:border-b-0"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md bg-neutral-100"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/products/${item.productId}`}
                        className="text-lg font-medium text-neutral-900 hover:text-primary-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="mt-1 text-sm text-neutral-600 space-y-1">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                        <p className="font-medium text-neutral-900">{formatPrice(item.price)}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-neutral-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-2 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-2 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {/* Add to wishlist logic */}}
                          className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                          title="Save for later"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stock Warning */}
                  {item.quantity >= item.maxStock && (
                    <div className="mt-3 text-sm text-orange-600">
                      Only {item.maxStock} items in stock
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 sticky top-24"
            >
              <h2 className="text-xl font-serif font-semibold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal ({itemCount} items)</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax (VAT 7.5%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>

                {shipping === 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">
                    🎉 You qualify for free shipping!
                  </div>
                )}

                {total < 50000 && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                    Add {formatPrice(50000 - total)} more for free shipping
                  </div>
                )}

                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link to="/checkout" className="btn-primary w-full">
                  Proceed to Checkout
                </Link>
                <Link to="/products" className="btn-secondary w-full">
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="inline-flex items-center text-xs text-neutral-500">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure checkout with SSL encryption
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage