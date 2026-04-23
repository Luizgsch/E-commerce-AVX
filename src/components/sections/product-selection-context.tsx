"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { ProductModelValue } from "@/src/lib/product-models";

type ProductSelectionContextValue = {
  selectedModel: ProductModelValue;
  setSelectedModel: (model: ProductModelValue) => void;
};

const ProductSelectionContext = createContext<
  ProductSelectionContextValue | undefined
>(undefined);

export function ProductSelectionProvider({
  children,
  initialModel = "autopropelidos",
}: {
  children: ReactNode;
  initialModel?: ProductModelValue;
}) {
  const [selectedModel, setSelectedModelState] =
    useState<ProductModelValue>(initialModel);

  const setSelectedModel = useCallback((model: ProductModelValue) => {
    setSelectedModelState(model);
  }, []);

  const value = useMemo(
    () => ({ selectedModel, setSelectedModel }),
    [selectedModel, setSelectedModel],
  );

  return (
    <ProductSelectionContext.Provider value={value}>
      {children}
    </ProductSelectionContext.Provider>
  );
}

export function useProductSelection(): ProductSelectionContextValue {
  const ctx = useContext(ProductSelectionContext);
  if (!ctx) {
    throw new Error(
      "useProductSelection must be used within ProductSelectionProvider",
    );
  }
  return ctx;
}
