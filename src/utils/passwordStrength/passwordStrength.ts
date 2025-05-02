 export const calculateStrength = (length: number, enabledOptionCount: number): number => {
    if (enabledOptionCount === 0 || length === 0) return 0;
    
    const lengthFactor = Math.min(length, 20) / 20;
    
    const optionsFactor = enabledOptionCount / 4;
    
    const combinedScore = (lengthFactor * 0.7) + (optionsFactor * 0.3);
    
    if (combinedScore < 0.25) return 1; // Weak
    if (combinedScore < 0.5) return 2; // Medium
    if (combinedScore < 0.75) return 3; // Strong
    return 4; // Very Strong
  };