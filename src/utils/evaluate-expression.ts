const SAFE_EXPRESSION = /^[\d+\-*/().%\s]+$/;

export function evaluateExpression(expression: string): string {
  const sanitized = expression.replace(/\s/g, "");
  if (!sanitized || !SAFE_EXPRESSION.test(sanitized)) {
    return "Error";
  }

  try {
    // Validated to digits and math operators only.
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitized})`)();
    if (typeof result !== "number" || !Number.isFinite(result)) {
      return "Error";
    }
    return String(result);
  } catch {
    return "Error";
  }
}
