"use client";

import { useRouter } from "next/navigation";
import ButtonOutline from "./buttonOutline";

export default function BackButton({ className, children }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div onClick={handleBack}>
      <ButtonOutline className={className}>{children}</ButtonOutline>
    </div>
  );
}
