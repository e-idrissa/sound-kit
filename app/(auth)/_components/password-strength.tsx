import { PasswordStrengthProps } from "@/lib/types/props";
import { useEffect, useState } from "react";

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback([]);
      return;
    }

    let currentStrength = 0;
    const newFeedback: string[] = [];

    // Length check
    if (password.length >= 8) {
      currentStrength += 1;
    } else {
      newFeedback.push('Password should be at least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      currentStrength += 1;
    } else {
      newFeedback.push('Add an uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      currentStrength += 1;
    } else {
      newFeedback.push('Add a lowercase letter');
    }

    // Number check
    if (/[0-9]/.test(password)) {
      currentStrength += 1;
    } else {
      newFeedback.push('Add a number');
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      currentStrength += 1;
    } else {
      newFeedback.push('Add a special character');
    }

    setStrength(currentStrength);
    setFeedback(newFeedback);
  }, [password]);

  const getStrengthLabel = () => {
    if (strength === 0) return 'Very Weak';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    if (strength === 4) return 'Strong';
    return 'Very Strong';
  };

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-red-500';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-green-500';
    return 'bg-green-500';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getStrengthColor()}`} 
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium">{getStrengthLabel()}</span>
      </div>
      
      {feedback.length > 0 && (
        <ul className="text-xs text-muted-foreground space-y-1">
          {feedback.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <span className="text-xs">•</span> {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
