// app/POSSystem.tsx
"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  CartItem,
  Product,
  MOCK_PRODUCTS, // Corrected from MOCK_PRODUCT
  MOCK_TRANSACTIONS,
  CATEGORIES,
} from '@/lib/mockdata'; // Adjusted imports to mockdata
import { Header } from '@/components/Header'; // Adjusted path
import { CartSummary } from '@/components/CartSummary'; // Assuming these are in a 'pos' subfolder
import { ProductGrid } from '@/components/ProductGrid'; // Assuming these are in a 'pos' subfolder
import { ModalsProvider } from '@/components/ModalsProvider'; // Assuming these are in a 'pos' subfolder

const POSSystem: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Header States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedRegister, setSelectedRegister] = useState<string>('');

  // Discount State (Editable)
  const [discountPercentage, setDiscountPercentage] = useState<number>(0); // Default to 0%

  // Modal states for various functionalities
  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState<boolean>(false);
  const [paymentMethodType, setPaymentMethodType] = useState<'cash' | 'debit' | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);
  const [isVoidConfirmModalOpen, setIsVoidConfirmModalOpen] = useState<boolean>(false);
  const [isCartEmptyInfoModalOpen, setIsCartEmptyInfoModalOpen] = useState<boolean>(false);
  const [isTransactionHeldInfoModalOpen, setIsTransactionHeldInfoModalOpen] = useState<boolean>(false);
  const [isAmountInsufficientInfoModalOpen, setIsAmountInsufficientInfoModalOpen] = useState<boolean>(false);
  const [isOrderHistoryModalOpen, setIsOrderHistoryModalOpen] = useState<boolean>(false);
  const [isDailySalesSummaryModalOpen, setIsDailySalesSummaryModalOpen] = useState<boolean>(false);

  // State for Post-Payment Personalized Message
  const [personalizedCustomerMessage, setPersonalizedCustomerMessage] = useState<string>('');
  const [isGeneratingPersonalizedMessage, setIsGeneratingPersonalizedMessage] = useState<boolean>(false);

  // Calculate totals
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.total, 0),
    [cartItems]
  );
  const tax = useMemo(() => subtotal * 0.05, [subtotal]); // 5% tax example
  const discount = useMemo(() => subtotal * (discountPercentage / 100), [subtotal, discountPercentage]);
  const finalTotal = useMemo(
    () => subtotal + tax - discount,
    [subtotal, tax, discount]
  );

  // Function to add a product to the cart
  const addToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          { ...product, quantity: 1, total: product.price },
        ];
      }
    });
  }, []);

  // Function to update item quantity in cart
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: newQuantity,
                  total: newQuantity * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0)
    );
  }, []);

  // Handle a specific payment method click (Cash, Debit)
  const handlePaymentMethodClick = useCallback((type: 'cash' | 'debit') => {
    if (cartItems.length === 0) {
      setIsCartEmptyInfoModalOpen(true);
      return;
    }
    setPaymentMethodType(type);
    setIsPaymentMethodModalOpen(true);
  }, [cartItems.length]);

  // Callback from PaymentMethodModal when confirmed
  const onSpecificPaymentSuccess = useCallback(() => {
    setIsPaymentMethodModalOpen(false);
    setIsReceiptModalOpen(true);
    setPersonalizedCustomerMessage('');
    setIsGeneratingPersonalizedMessage(false);
  }, []);

  // Callback for insufficient cash
  const onAmountInsufficient = useCallback(() => {
    setIsAmountInsufficientInfoModalOpen(true);
  }, []);

  // Handle Pay Now button
  const handlePayNow = useCallback(() => {
    if (cartItems.length === 0) {
      setIsCartEmptyInfoModalOpen(true);
      return;
    }
    handlePaymentMethodClick('cash');
  }, [cartItems.length, handlePaymentMethodClick]);

  // Function to clear the cart (used by "Reset" and "Receipt Modal Close")
  const clearCart = useCallback(() => {
    setCartItems([]);
    setDiscountPercentage(0); // Reset discount when cart clears
  }, []);

  // Handle Void button (Cancel Transaction)
  const confirmVoidTransaction = useCallback(() => {
    clearCart();
    setIsVoidConfirmModalOpen(false);
  }, [clearCart]);

  // --- Gemini API Integration Functions ---
  const generatePersonalizedMessage = useCallback(async () => {
    setIsGeneratingPersonalizedMessage(true);
    setPersonalizedCustomerMessage('');

    const orderDetails = cartItems.map(item => `${item.quantity} ${item.name}`).join(', ');
    const prompt = `Generate a short, friendly, and appreciative message for a customer who just completed an order. Their order included: ${orderDetails}. The total amount was Rs${finalTotal.toFixed(2)}. Encourage them to visit again and maybe mention a loyalty program. Keep it under 50 words.`;

    const chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    const payload = { contents: chatHistory };
    // Replace with your actual API key handling if not using Canvas's automatic injection
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setPersonalizedCustomerMessage(text);
      } else {
        setPersonalizedCustomerMessage("Thank you for your order!");
      }
    } catch (error) {
      console.error("Error generating personalized message:", error);
      setPersonalizedCustomerMessage("Thank you for your order! We appreciate your business.");
    } finally {
      setIsGeneratingPersonalizedMessage(false);
    }
  }, [cartItems, finalTotal]);


  return (
    <div className="flex flex-col lg:h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-inter overflow-hidden">
      {/*
        Header component will need its own props for search, customer, register,
        and modal toggles if it's handling those states.
        For this example, I'm passing dummy props or assuming they exist in Header.
      */}
      <Header
         
         searchTerm={searchTerm}
         setSearchTerm={setSearchTerm}
         selectedCustomer={selectedCustomer}
         setSelectedCustomer={setSelectedCustomer}
         selectedRegister={selectedRegister}
         setSelectedRegister={setSelectedRegister}
         setIsOrderHistoryModalOpen={setIsOrderHistoryModalOpen}
         setIsDailySalesSummaryModalOpen={setIsDailySalesSummaryModalOpen}
      />

      <main className="flex flex-col lg:flex-row flex-grow p-4 gap-4 overflow-hidden">
        {/* Left Panel: Cart Summary */}
        <CartSummary
          cartItems={cartItems}
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          discountPercentage={discountPercentage}
          setDiscountPercentage={setDiscountPercentage}
          finalTotal={finalTotal}
          updateQuantity={updateQuantity}
          handlePaymentMethodClick={handlePaymentMethodClick}
          setIsScanModalOpen={setIsScanModalOpen}
          setIsVoidConfirmModalOpen={setIsVoidConfirmModalOpen}
          setIsTransactionHeldInfoModalOpen={setIsTransactionHeldInfoModalOpen}
          handlePayNow={handlePayNow}
          clearCart={clearCart}
        />

        {/* Right Panel: Product Grid */}
        <ProductGrid
          products={MOCK_PRODUCTS} // Corrected from MOCK_PRODUCT
          categories={CATEGORIES}
          addToCart={addToCart}
          searchTerm={searchTerm}
        />
      </main>

      {/* All Modals Grouped Here */}
      <ModalsProvider
        isScanModalOpen={isScanModalOpen}
        setIsScanModalOpen={setIsScanModalOpen}
        isPaymentMethodModalOpen={isPaymentMethodModalOpen}
        setIsPaymentMethodModalOpen={setIsPaymentMethodModalOpen}
        paymentMethodType={paymentMethodType}
        finalTotal={finalTotal}
        onSpecificPaymentSuccess={onSpecificPaymentSuccess}
        onAmountInsufficient={onAmountInsufficient}
        isCartEmptyInfoModalOpen={isCartEmptyInfoModalOpen}
        setIsCartEmptyInfoModalOpen={setIsCartEmptyInfoModalOpen}
        isTransactionHeldInfoModalOpen={isTransactionHeldInfoModalOpen}
        setIsTransactionHeldInfoModalOpen={setIsTransactionHeldInfoModalOpen}
        isAmountInsufficientInfoModalOpen={isAmountInsufficientInfoModalOpen}
        setIsAmountInsufficientInfoModalOpen={setIsAmountInsufficientInfoModalOpen}
        isVoidConfirmModalOpen={isVoidConfirmModalOpen}
        setIsVoidConfirmModalOpen={setIsVoidConfirmModalOpen}
        confirmVoidTransaction={confirmVoidTransaction}
        isReceiptModalOpen={isReceiptModalOpen}
        setIsReceiptModalOpen={(isOpen) => {
          if (!isOpen) { // When receipt modal is closed
            clearCart(); // Clear cart
          }
          setIsReceiptModalOpen(isOpen);
        }}
        cartItems={cartItems}
        subtotal={subtotal}
        tax={tax}
        discount={discount}
        personalizedCustomerMessage={personalizedCustomerMessage}
        isGeneratingPersonalizedMessage={isGeneratingPersonalizedMessage}
        generatePersonalizedMessage={generatePersonalizedMessage}
        isDailySalesSummaryModalOpen={isDailySalesSummaryModalOpen}
        setIsDailySalesSummaryModalOpen={setIsDailySalesSummaryModalOpen}
        isOrderHistoryModalOpen={isOrderHistoryModalOpen}
        setIsOrderHistoryModalOpen={setIsOrderHistoryModalOpen}
        mockTransactions={MOCK_TRANSACTIONS}
      />
    </div>
  );
};

export default POSSystem;