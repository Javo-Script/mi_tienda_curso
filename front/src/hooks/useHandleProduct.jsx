import { useState, useRef, useEffect } from "react";

const useHandleProduct = (initialProduct = {}) => {
  const [product, setProduct] = useState({ ...initialProduct });
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [editingImageIndex, setEditingImageIndex] = useState(null);
  const [nuevaURL, setNuevaURL] = useState("");
  const fichaRef = useRef(null);
  const lastInputRef = useRef(null);
  const [showGradient, setShowGradient] = useState(false);

  const handleInputChange = (key, value) => {
    setProduct((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...(product.imagenes || [])];
    updated[index] = value;
    setProduct((prev) => ({ ...prev, imagenes: updated }));
    setNuevaURL("");
    setEditingImageIndex(null);
  };

  const handleFichaChange = (key, value) => {
    setProduct((prev) => ({
      ...prev,
      ficha_tecnica: {
        ...prev.ficha_tecnica,
        [key]: value,
      },
    }));
  };

  const removeFeatureField = (key) => {
    const newFicha = { ...product.ficha_tecnica };
    delete newFicha[key];
    setProduct((prev) => ({ ...prev, ficha_tecnica: newFicha }));
  };
  
  const handleSave = async (newProduct) => {
    try {
      const response = await fetch('https://mi-tienda-curso.onrender.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      console.log("Producto guardado exitosamente");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await fetch(`https://mi-tienda-curso.onrender.com/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) throw new Error("Error al actualizar el producto");

      console.log("Producto actualizado exitosamente");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleDelete = async (deleteProduct) => {
    try {
      const response = await fetch(`https://mi-tienda-curso.onrender.com/products/${deleteProduct.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deleteProduct),
      });

      if (!response.ok) throw new Error("Error al eliminar el producto");

      console.log("Producto eliminado exitosamente");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };



  const addNewField = () => {
    if (!newFieldKey || !newFieldValue) return;
    setProduct((prev) => ({
      ...prev,
      ficha_tecnica: {
        ...prev.ficha_tecnica,
        [newFieldKey]: newFieldValue,
      },
    }));
    setNewFieldKey("");
    setNewFieldValue("");
  };

  useEffect(() => {
    const container = fichaRef.current;

    const checkOverflow = () => {
      if (!container) return false;
      return container.scrollHeight > container.clientHeight;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasOverflow = checkOverflow();
        setShowGradient(hasOverflow && !entry.isIntersecting);
      },
      {
        root: container,
        threshold: 1.0,
      }
    );

    if (lastInputRef.current) observer.observe(lastInputRef.current);

    return () => {
      if (lastInputRef.current) observer.unobserve(lastInputRef.current);
    };
  }, [product.ficha_tecnica]);

  return {
    product, setProduct,
    newFieldKey, setNewFieldKey,
    newFieldValue, setNewFieldValue,
    editingImageIndex, setEditingImageIndex,
    nuevaURL,setNuevaURL,
    addNewField, fichaRef,
    showGradient,
    lastInputRef,
    handleInputChange,
    handleImageChange,
    handleFichaChange,
    removeFeatureField,
    handleSave, handleUpdate, handleDelete
  };
};

export default useHandleProduct;