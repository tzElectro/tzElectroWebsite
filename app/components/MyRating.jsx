"use client";

import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

export default function MyRating({ value = 0, readOnly = false, size = "medium", precision = 0.5 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Rating
      name="product-rating"
      value={value}
      readOnly={readOnly}
      size={size}
      precision={precision}
    />
  );
}
