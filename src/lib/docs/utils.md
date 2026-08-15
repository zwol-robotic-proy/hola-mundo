# utils.ts - Utilidades de Clases CSS

## 📌 Descripción

Módulo de utilidades para combinar y fusionar clases CSS Tailwind de forma segura y eficiente. Proporciona la función `cn()` que resuelve automáticamente conflictos entre clases Tailwind.

## 🎯 Propósito

- Combinar múltiples clases CSS en una sola cadena
- Resolver conflictos automáticamente entre clases Tailwind
- Soportar condiciones y lógica compleja para aplicar estilos
- Mantener la legibilidad del código en componentes React

## 📦 Importación

```typescript
import { cn } from '@/lib/utils'
```

## 🔧 Función Principal

### `cn(...inputs: ClassValue[]): string`

Combina y fusiona clases CSS, resolviendo automáticamente conflictos de Tailwind.

#### Parámetros
- `inputs` - Variable number of class inputs (strings, objects, arrays)

#### Retorna
- `string` - Cadena combinada de clases

#### Características
- ✅ Utiliza `clsx` para condicionales
- ✅ Utiliza `tailwind-merge` para resolver conflictos
- ✅ Soporta múltiples formatos de entrada
- ✅ Elimina duplicados y espacios en blanco
- ✅ Totalmente type-safe

## 📖 Ejemplos de Uso

### Ejemplo 1: Clases Básicas
```typescript
import { cn } from '@/lib/utils'

cn('px-2', 'py-1')
// Resultado: 'px-2 py-1'

cn('bg-white', 'text-black', 'border')
// Resultado: 'bg-white text-black border'
```

### Ejemplo 2: Clases Condicionales
```typescript
const Button = ({ variant = 'primary', disabled = false }) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        {
          'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
          'bg-gray-200 text-gray-600': variant === 'secondary',
          'opacity-50 cursor-not-allowed': disabled,
        }
      )}
    >
      Click me
    </button>
  )
}
```

### Ejemplo 3: Resolución de Conflictos Tailwind
```typescript
// Los conflictos se resuelven, la última clase gana
cn('bg-red-500', 'bg-blue-500')
// Resultado: 'bg-blue-500'

// Útil para overrides
cn('px-2', 'px-4')  // 'px-4'
cn('p-2 m-2', 'p-4 m-0')  // 'p-4 m-0'
```

### Ejemplo 4: Arrays y Objetos Anidados
```typescript
const baseClasses = ['px-2', 'py-1']
const conditionalClasses = {
  'shadow': true,
  'border': false,
}

cn(
  'rounded',
  baseClasses,
  conditionalClasses,
  'bg-white'
)
// Resultado: 'rounded px-2 py-1 shadow bg-white'
```

### Ejemplo 5: Composición en Componentes
```typescript
// Custom Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const Button = ({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        // Base styles
        'font-semibold transition-colors duration-200 rounded-lg',
        
        // Variant styles
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
        },
        
        // Size styles
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        
        // Custom className
        className
      )}
      {...props}
    />
  )
}

// Uso
<Button variant="primary" size="lg" className="w-full" />
```

### Ejemplo 6: Conditional Application
```typescript
const isActive = true
const isDisabled = false

cn(
  'btn',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed',
  !isDisabled && 'hover:bg-blue-600'
)
// Resultado: 'btn bg-blue-500 hover:bg-blue-600'
```

### Ejemplo 7: Casos Complejos
```typescript
const Card = ({ highlighted, theme = 'light' }) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg transition-all',
        theme === 'light' && 'bg-white text-black border border-gray-200',
        theme === 'dark' && 'bg-gray-900 text-white border border-gray-700',
        highlighted && [
          'ring-2 ring-offset-2',
          theme === 'light' && 'ring-blue-500 ring-offset-white',
          theme === 'dark' && 'ring-blue-400 ring-offset-gray-900',
        ]
      )}
    >
      Content
    </div>
  )
}
```

## 🧪 Tests

Total de tests: **22**

### Categorías de Tests

#### 1. Funcionalidad Básica (4 tests)
- Merge de strings
- Manejo de strings vacíos
- Clases condicionales con objetos
- Manejo de arrays

#### 2. Comportamiento Tailwind Merge (3 tests)
- Resolución de conflictos básicos
- Conflictos de padding
- Múltiples conflictos

#### 3. Casos Complejos (3 tests)
- Mezcla de tipos de entrada
- Condiciones anidadas
- Clases custom con Tailwind

#### 4. Edge Cases (3 tests)
- Sin argumentos
- Un solo argumento
- Strings solo con espacios

#### 5. Integración (6 tests)
- Tests adicionales de integración

### Ejecutar Tests
```bash
# Solo tests de utils
npm test -- src/lib/__tests__/utils.test.ts

# Con watch
npm test -- --watch src/lib/__tests__/utils.test.ts

# Con coverage
npm test -- --coverage src/lib/__tests__/utils.test.ts
```

## 🔍 Cómo Funciona

### Flujo Interno

1. **clsx** - Toma los inputs y crea una cadena de clases, ignorando valores falsy
   ```typescript
   clsx('a', false && 'b', 'c') // 'a c'
   ```

2. **twMerge** - Toma la cadena de clsx y resuelve conflictos Tailwind
   ```typescript
   twMerge('px-2 px-4') // 'px-4'
   ```

### Ejemplo de Flujo
```typescript
cn('px-2', { 'py-1': true, 'py-2': false }, 'bg-white', 'px-4')

// 1. clsx convierte a:
//    'px-2 py-1 bg-white px-4'

// 2. twMerge resuelve conflictos:
//    'py-1 bg-white px-4' (px-4 reemplaza px-2)
```

## ⚠️ Limitaciones

1. **Solo CSS Tailwind** - Optimizado para Tailwind, puede no resolver conflictos en clases custom
2. **Orden de precedencia** - La última clase conflictiva siempre gana
3. **Clases anidadas** - Profundidad ilimitada soportada, pero puede afectar performance

## 💡 Best Practices

### ✅ Hacer

```typescript
// 1. Usar para combinar clases base con variables
const buttonClass = cn('btn', 'btn-primary', customClass)

// 2. Usar para condicionales complejos
cn(
  'base',
  condition1 && 'class1',
  condition2 && 'class2'
)

// 3. Usar en componentes reutilizables
const reusableComponent = ({ className }) => (
  <div className={cn('default-styles', className)} />
)
```

### ❌ Evitar

```typescript
// 1. No concatenar strings manualmente
className={'px-2' + ' py-1'}  // ❌

// 2. No usar para lógica no-CSS
cn(isActive && 'active')  // ✅ Si es para CSS
if (cn(isActive && 'active')) // ❌ Si es para lógica

// 3. No olvidar resolver conflictos en componentes
<Button className="px-8" />  // Puede conflictuar con px-4 base
```

## 🐛 Solución de Problemas

### Las clases no se aplican
```typescript
// Verificar que el valor sea truthy
cn('class1', false && 'class2', undefined && 'class3')

// Si usa objetos, verificar las keys
cn({ 'my-class': true })  // ✅
cn({ 'my-class': false }) // ❌ No se incluye
```

### Conflictos no se resuelven
```typescript
// twMerge solo resuelve conflictos Tailwind reconocidos
cn('custom-padding-1', 'custom-padding-2')  // Ambas se incluyen

// Solución: usar clases Tailwind estándar
cn('p-1', 'p-2')  // Solo 'p-2' se incluye
```

### Performance issues
```typescript
// Para casos muy complejos, considerar memoización
const memoizedClassName = useMemo(() => cn(...), [dependencies])
```

## 📚 Dependencias

- **clsx** - ^2.1.1
- **tailwind-merge** - ^3.3.1

## 🔗 Ver también

- [tailwind-merge Documentation](https://github.com/dcastil/tailwind-merge)
- [clsx GitHub](https://github.com/lukeed/clsx)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Última actualización:** 2024
**Estado:** Production Ready
