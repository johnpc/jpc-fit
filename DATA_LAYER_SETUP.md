# Data Layer Setup Complete

## What's Been Created

### Core Infrastructure

1. **`src/lib/amplify-client.ts`** - Amplify client configuration
2. **`src/lib/types.ts`** - TypeScript types for all entities

### Hooks (TanStack Query)

All hooks follow the jpc-eats pattern with queries and mutations:

1. **`src/hooks/useAuth.tsx`** - Authentication with AuthProvider
2. **`src/hooks/useFood.ts`** - Food entries (CRUD operations)
3. **`src/hooks/useGoal.ts`** - Calorie goals (read/update)
4. **`src/hooks/useWeight.ts`** - Weight tracking (create/delete)
5. **`src/hooks/useQuickAdd.ts`** - Quick-add buttons (CRUD)
6. **`src/hooks/usePreferences.ts`** - User preferences (read/update)

### Providers

1. **`src/providers/SubscriptionProvider.tsx`** - Real-time subscriptions for all models

### Main Setup

- **`src/main.tsx`** - Configured with all providers:
  - QueryClientProvider (TanStack Query)
  - AuthProvider
  - SubscriptionProvider
  - ThemeProvider (Amplify UI)

## Hook Usage Examples

### Food Tracking
```tsx
import { useFood, useCreateFood, useDeleteFood } from './hooks/useFood';

function CaloriePage() {
  const today = '2025-11-16';
  const { data: foods, isLoading } = useFood(today);
  const createFood = useCreateFood();
  const deleteFood = useDeleteFood();

  const handleAdd = () => {
    createFood.mutate({
      name: 'Apple',
      calories: 95,
      day: today,
    });
  };

  return (
    <div>
      {foods?.map(food => (
        <div key={food.id}>
          {food.name} - {food.calories} cal
          <button onClick={() => deleteFood.mutate(food.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAdd}>Add Food</button>
    </div>
  );
}
```

### Goal Management
```tsx
import { useGoal, useUpdateGoal } from './hooks/useGoal';

function GoalSettings() {
  const { data: goal } = useGoal();
  const updateGoal = useUpdateGoal();

  const handleUpdate = () => {
    updateGoal.mutate({ dietCalories: 2000 });
  };

  return (
    <div>
      Current Goal: {goal?.dietCalories} calories
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
```

### Weight Tracking
```tsx
import { useWeight, useCreateWeight } from './hooks/useWeight';

function WeightPage() {
  const { data: weights } = useWeight();
  const createWeight = useCreateWeight();

  const handleAdd = () => {
    createWeight.mutate({ currentWeight: 180 });
  };

  return (
    <div>
      {weights?.map(w => (
        <div key={w.id}>{w.currentWeight} lbs</div>
      ))}
      <button onClick={handleAdd}>Add Weight</button>
    </div>
  );
}
```

## Key Features

- ✅ TanStack Query for all server state
- ✅ Automatic cache invalidation via subscriptions
- ✅ Optimistic updates ready
- ✅ Type-safe with TypeScript
- ✅ Auth context available everywhere
- ✅ Real-time updates across devices
- ✅ Follows jpc-eats patterns

## Next Steps

1. Build UI components using these hooks
2. Add loading/error states
3. Implement optimistic updates where needed
4. Add HealthKit integration hooks
5. Create page components (CaloriePage, WeightPage, etc.)
