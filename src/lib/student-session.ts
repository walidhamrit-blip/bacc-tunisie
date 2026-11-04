import { isSection, type SectionName } from "@/lib/sections";

export const STUDENT_CODE_COOKIE = "bac_student_code";
export const DEVICE_TOKEN_COOKIE = "bac_device_token";

/**
 * Plafond d'appareils personnels autorisés simultanément sur un même abonnement
 * (ex. 1 smartphone + 1 ordinateur) afin d'empêcher le partage de compte.
 */
export const MAX_PERSONAL_DEVICES = 2;

const CODE_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/**
 * Génère un code élève lisible sans caractères ambigus (0/O, 1/I) : ex. `BAC-7K9P-4M`.
 */
export function generateSyncCode(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]);
  return `BAC-${chars.slice(0, 4).join("")}-${chars.slice(4, 6).join("")}`;
}

/**
 * Normalise la saisie d'un code élève (`bac7k9p4m` ou `bac-7k9p-4m` -> `BAC-7K9P-4M`).
 */
export function normalizeSyncCode(raw: string): string {
  const cleaned = raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/^BAC/, "");

  if (cleaned.length !== 6) {
    return raw.trim().toUpperCase();
  }
  return `BAC-${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}`;
}

export type RegistrationInput = {
  name: string;
  email: string;
  lycee: string;
  section: string;
  confirmSingleSection: boolean;
};

export type RegistrationValidation =
  | {
      ok: true;
      sanitized: {
        name: string;
        email: string;
        lycee: string;
        section: SectionName;
      };
    }
  | {
      ok: false;
      errors: string[];
    };

const SIMPLE_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateRegistrationInput(input: RegistrationInput): RegistrationValidation {
  const errors: string[] = [];

  const name = input.name.trim().replace(/\s+/g, " ").slice(0, 80);
  const email = input.email.trim().toLowerCase().slice(0, 120);
  const lycee = input.lycee.trim().replace(/\s+/g, " ").slice(0, 100);

  if (name.length < 2) {
    errors.push("Indique ton nom et prénom (au moins 2 caractères).");
  }

  if (email.length > 0 && !SIMPLE_EMAIL_REGEX.test(email)) {
    errors.push("L'adresse e-mail saisie n'est pas valide.");
  }

  if (!isSection(input.section)) {
    errors.push("Choisis obligatoirement ton unique section officielle du Baccalauréat.");
  }

  if (!input.confirmSingleSection) {
    errors.push(
      "Tu dois confirmer que ton abonnement couvre exclusivement cette seule section (non modifiable après validation).",
    );
  }

  if (errors.length > 0 || !isSection(input.section)) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    sanitized: {
      name,
      email,
      lycee,
      section: input.section,
    },
  };
}

export function isLockedStudent(student: {
  isDemo: boolean;
  sectionLocked: boolean;
}): boolean {
  return !student.isDemo && student.sectionLocked;
}
