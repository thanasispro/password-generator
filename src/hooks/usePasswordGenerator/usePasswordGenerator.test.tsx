import { renderHook, act } from "@testing-library/react";
import { usePasswordGenerator } from "./usePasswordGenerator";
import { generatePassword as generatePasswordUtil } from "../../utils/generate/generate";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock the generate utility
vi.mock("../../utils/generate/generate", () => ({
  generatePassword: vi.fn(),
}));

describe("usePasswordGenerator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation returns a simple password
    (
      generatePasswordUtil as unknown as ReturnType<typeof vi.fn>
    ).mockImplementation((length) => "a".repeat(length));
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePasswordGenerator());

    expect(result.current.passwordLength).toBe(10);
    expect(result.current.options).toEqual({
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
  });

  it("should change password length", () => {
    const { result } = renderHook(() => usePasswordGenerator());

    act(() => {
      result.current.setPasswordLength(16);
    });

    expect(result.current.passwordLength).toBe(16);
  });

  it("should update options", () => {
    const { result } = renderHook(() => usePasswordGenerator());

    act(() => {
      result.current.handleOptionChange("uppercase")(false);
    });

    expect(result.current.options.uppercase).toBe(false);

    act(() => {
      result.current.handleOptionChange("symbols")(true);
    });

    expect(result.current.options.symbols).toBe(true);
  });

  it("should call the generate utility with correct parameters", () => {
    const { result } = renderHook(() => usePasswordGenerator());

    // Mock the return value specifically for this test
    (generatePasswordUtil as unknown as ReturnType<typeof vi.fn>).mockReturnValue("a".repeat(20));

    act(() => {
      result.current.setPasswordLength(20);
    });
    
    // Store the return value from generatePassword
    let generatedPassword;
    act(() => {
      generatedPassword = result.current.generatePassword();
    });

    expect(generatePasswordUtil).toHaveBeenCalledWith(
      {
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false,
      },
      20
    );
    expect(result.current.password).toBe("a".repeat(20));
    expect(generatedPassword).toBe("a".repeat(20));
  });

  it("should return the generated password", () => {
    const { result } = renderHook(() => usePasswordGenerator());
    
    (generatePasswordUtil as unknown as ReturnType<typeof vi.fn>).mockReturnValue("test-password");
    
    let returnedPassword;
    act(() => {
      returnedPassword = result.current.generatePassword();
    });

    expect(returnedPassword).toBe("test-password");
    expect(result.current.password).toBe("test-password");
  });

  it("should pass updated options to generate utility", () => {
    const { result } = renderHook(() => usePasswordGenerator());

    act(() => {
      result.current.handleOptionChange("uppercase")(false);
    });
    
    act(() => {
      result.current.handleOptionChange("symbols")(true);
    });
    
    act(() => {
      result.current.generatePassword();
    });

    expect(generatePasswordUtil).toHaveBeenCalledWith(
      {
        uppercase: false,
        lowercase: true,
        numbers: true,
        symbols: true,
      },
      10
    );
  });

  it("should allow custom initial password length", () => {
    const { result } = renderHook(() => usePasswordGenerator(16));

    expect(result.current.passwordLength).toBe(16);
  });
});
