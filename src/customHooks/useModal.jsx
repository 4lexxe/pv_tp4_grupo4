import React from 'react'
import {useCallback } from 'react';
export const useModal = ({setEditingProduct, setIsModalOpen}) => {
    const openAddModal = useCallback(() => {
      setEditingProduct(null);
      setIsModalOpen(true);
    }, []);
    
    const openEditModal = useCallback((product) => {
      setEditingProduct(product);
      setIsModalOpen(true);
    }, []);
    
    const closeModal = useCallback(() => {
      setIsModalOpen(false);
      setEditingProduct(null);
    }, []);
  
    return {
      openAddModal,
      openEditModal,
      closeModal
    };
}

