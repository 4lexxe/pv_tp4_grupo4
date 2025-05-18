
import { useMemo, useCallback } from 'react';
export const useFilterProducts = ({products,setSearchTerm,searchTerm,freeShippingOnly,discountFilter,selectedCategories,setDiscountFilter,setFreeShippingOnly,setSelectedCategories,setPriceRange,priceRange}) => {
    
    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    const handleCategoryChange = useCallback((e) => {
        const { name, checked } = e.target;
        const categoryName = name.replace('category', '');
        
        if (checked) {
        setSelectedCategories(prev => [...prev, categoryName]);
        } else {
        setSelectedCategories(prev => prev.filter(cat => cat !== categoryName));
        }
    }, []);

    const handleSliderChange = useCallback((e) => {
        const value = e.target.value;
        setPriceRange(prev => ({
        ...prev,
        sliderValue: parseInt(value, 10),
        max: value
        }));
    }, []);

    const handlePriceInputChange = useCallback((e) => {
        const { id, value } = e.target;
        const numericValue = value === '' ? '' : parseInt(value, 10);
        
        if (id === 'minPrice') {
        setPriceRange(prev => ({ ...prev, min: numericValue }));
        } else if (id === 'maxPrice') {
        setPriceRange(prev => ({ ...prev, max: numericValue }));
        }
    }, []);

    const applyPriceFilter = useCallback(() => {
        console.log('Aplicando filtro de precio:', priceRange);
    }, [priceRange]);

    const handleFreeShippingChange = useCallback((e) => {
        setFreeShippingOnly(e.target.checked);
    }, []);

    const handleDiscountFilterChange = useCallback((e) => {
        setDiscountFilter(e.target.value);
    }, []);

    const clearAllFilters = useCallback(() => {
        setSelectedCategories([]);
        setPriceRange({ min: '', max: '', sliderValue: 300000 });
        setFreeShippingOnly(false);
        setDiscountFilter('all');
        setSearchTerm('');
    }, []);
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
        const matchesSearchTerm = !searchTerm.trim() || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase().trim()));
        
        if (!matchesSearchTerm) return false;
        
        const matchesCategory = selectedCategories.length === 0 || 
            selectedCategories.some(cat => 
            product.category && product.category.toLowerCase().includes(cat.toLowerCase())
            );
        
        if (!matchesCategory) return false;
        
        const price = product.descuento > 0 ? product.precioConDescuento : product.precioUnitario;
        const matchesMinPrice = priceRange.min === '' || price >= priceRange.min;
        const matchesMaxPrice = priceRange.max === '' || price <= priceRange.max;
        
        if (!matchesMinPrice || !matchesMaxPrice) return false;
        
        const matchesFreeShipping = !freeShippingOnly || product.freeShipping;
        
        if (!matchesFreeShipping) return false;
        
        const matchesDiscount = discountFilter === 'all' || 
            (discountFilter === 'withDiscount' && product.descuento > 0);
        
        return matchesDiscount;
        });
    }, [products,
        searchTerm, 
        selectedCategories, 
        priceRange.min, 
        priceRange.max, 
        freeShippingOnly, 
        discountFilter
    ]);

    return {
        searchTerm,
        selectedCategories,
        priceRange,
        freeShippingOnly,
        discountFilter,
        handleSearch,
        handleCategoryChange,
        handleSliderChange,
        handlePriceInputChange,
        applyPriceFilter,
        handleFreeShippingChange,
        handleDiscountFilterChange,
        clearAllFilters,
        filteredProducts,
        setPriceRange
    };
}

