export const processRecipeData = (recipeData) => {
  // Group by Product
  const groupedByProduct = recipeData.reduce((acc, item) => {
    if (!acc[item.Product]) {
      acc[item.Product] = {
        Product: item.Product,
        Ingredients: [],
        Ingredient_weight: []
      };
    }
    
    acc[item.Product].Ingredients.push(item.Ingredients);
    acc[item.Product].Ingredient_weight.push(item["Ingredient Weight (kg)"]);
    
    return acc;
  }, {});

  console.log(groupedByProduct);
  // Convert to array format
  return Object.values(groupedByProduct);
};

export const processIngredientData = (ingredientData) => {
    // Group by Ingredient
    const groupedByIngredient = ingredientData.reduce((acc, item) => {
        if (!acc[item.Ingredient]) {
            acc[item.Ingredient] = {
                Ingredient: item.Ingredient,
                Price: item.Price
            };
        }
    }, {});

    console.log(groupedByIngredient);
    // Convert to array format
    return Object.values(groupedByIngredient);
};