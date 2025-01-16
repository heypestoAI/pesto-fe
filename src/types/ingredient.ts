export type IngredientType = "raw" | "processed" | "packaging" | "other";

export interface Ingredient {
  id?: string;
  name: string;
  packSize: number;
  packCost: number;
  pricePerUnit: number;
  caseSize: number;
  supplier: string;
  type: IngredientType;
  secondarySupplier?: string;
}

export type InputMethod = "file" | "email" | "form";
