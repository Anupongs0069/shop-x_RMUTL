import React, { useState, useCallback, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

interface QuantityControlProps {
  min: number;
  max: number;
  onChange?: (num: number) => void
}

const QuantityControl: React.FC<QuantityControlProps> = ({ min, max, onChange }: QuantityControlProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecrease = useCallback(() => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, min));
  }, [onChange]);

  const handleIncrease = useCallback(() => {
    setQuantity(prevQuantity => Math.min(prevQuantity + 1, max));
  }, [onChange]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setQuantity(min);
    } else if (value < min) {
      setQuantity(min);
    } else if (value > max) {
      setQuantity(max);
    } else {
      setQuantity(value);
    }
  }, [min, max, onChange]);

  useEffect(() => {
    if (onChange)
      onChange(quantity);
  }, [quantity, onChange])

  return (
    <InputGroup className='w-auto'>
      <Button variant="outline-secondary" onClick={handleDecrease}>
        -
      </Button>
      <FormControl
        type="number"
        value={quantity}
        onChange={handleChange}
        style={{ textAlign: 'center', maxWidth: '80px' }}
      />
      <Button variant="outline-secondary" onClick={handleIncrease}>
        +
      </Button>
    </InputGroup>
  );
};

export default QuantityControl;
