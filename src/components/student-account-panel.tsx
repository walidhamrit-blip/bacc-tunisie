"use client";

import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import {
  loginWithSyncCode,
  logoutStudentAccount,
  registerStudentAccount,
  revokeOtherDevices,
  updateStudentProfile,
  type AccountActionState,
} from "@/app/actions";
import type { StudentSessionStatus } from "@/lib/data";
import { SECTION_INFO, SECTIONS, type SectionName } from "@/lib/sections";
import { MAX_PERSONAL_DEVICES } from "@/lib/student-session";

export type SectionSubjectPreview = {
  section: SectionName;
  subjectCount: number;
  topSubjects: string[];
};

export type StudentAccountPanelProps = {
  student: {
    id: number;
    name: string;
    email: string;
    lycee: string;
    section: string;
    sectionLocked: boolean;
    syncCode: string | null;
    deviceCount: number;
    isDemo: boolean;
    xpPoints: number;
    streakDays: number;
  };
  sessionStatus: StudentSessionStatus;
  sectionPreviews: SectionSubjectPreview[];
};

const INITIAL_STATE: AccountActionState = {
  ok: false,
  errors: [],
  message: "",
};

export function StudentAccountPanel({
  student,
  sessionStatus,
  sectionPreviews,
}: StudentAccountPanelProps) {
  const [activeTab, setActiveTab] = useState<"register" | "login">(
    sessionStatus === "evicted_by_device_limit" ? "login" : "register",
  );
  const [selectedSection, setSelectedSection] = useState<SectionName>("Sciences expérimentales");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [registerState, registerAction, isRegistering] = useActionState(
    registerStudentAccount,
    INITIAL_STATE,
  );
  const [loginState, loginAction, isLoggingIn] = useActionState(
    loginWithSyncCode,
    INITIAL_STATE,
  );

  const previewBySection = new Map(sectionPreviews.map((item) => [item.section, item]));

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      window.setTimeout(() => setCopiedCode(false), 2200);
    } catch {
      setCopiedCode(false);
    }
  };

  /* VUE ÉLÈVE INSCRIT AVEC ABONNEMENT MONO-SECTION VERROUILLÉ */
  if (!student.isDemo && student.sectionLocked) {
    return (
      <div className="space-y-6">
        {registerState.ok && registerState.message ? (
          <div
            role="status"
            className="rounded-2xl border p-4 text-sm font-medium"
            style={{
              background: "var(--green-soft)",
              borderColor: "var(--green-border)",
              color: "var(--green-ink)",
            }}
          >
            ✅ {registerState.message}
          </div>
        ) : null}

        {loginState.ok && loginState.message ? (
          <div
            role="status"
            className="rounded-2xl border p-4 text-sm font-medium"
            style={{
              background: "var(--green-soft)",
              borderColor: "var(--green-border)",
              color: "var(--green-ink)",
            }}
          >
            ✅ {loginState.message}
          </div>
        ) : null}

        <section className="card overflow-hidden p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--line)] pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-green">✓ Abonnement individuel actif</span>
                <span className="badge badge-brand">🔒 Mono-section verrouillée</span>
              </div>
              <h2 className="display mt-2.5 text-2xl font-semibold text-[var(--ink)]">
                {student.name}
              </h2>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">
                {student.lycee ? `${student.lycee} · ` : ""}
                {student.xpPoints} XP · Série active : {student.streakDays} jour
                {student.streakDays > 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/evaluation" className="btn btn-primary btn-sm">
                Mon tableau de niveau →
              </Link>
              <Link href="/programme" className="btn btn-ghost btn-sm">
                Mon programme
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {/* BLOC SECTION DÉFINITIVE */}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-4">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                Section officielle souscrite (définitive)
              </p>
              <p className="display mt-1.5 flex items-center gap-2 text-xl font-semibold text-[var(--ink)]">
                <span aria-hidden>🔒</span>
                <span>{student.section}</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                Conformément aux conditions d&apos;abonnement individuel, ton accès couvre{" "}
                <strong className="text-[var(--ink)]">exclusivement cette section</strong>. Les autres
                sections sont désactivées afin d&apos;empêcher l&apos;utilisation partagée d&apos;un même
                abonnement par plusieurs élèves.
              </p>
            </div>

            {/* BLOC CODE ÉLÈVE & APPAREILS AUTORISÉS */}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--ink-soft)]">
                  Code Élève multi-appareils
                </p>
                <span className="badge badge-slate">
                  {student.deviceCount} / {MAX_PERSONAL_DEVICES} appareil(s)
                </span>
              </div>

              {student.syncCode ? (
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5">
                  <code className="font-mono text-base font-bold tracking-wider text-[var(--brand)]">
                    {student.syncCode}
                  </code>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(student.syncCode!)}
                    className="btn btn-ghost btn-sm !py-1 !text-xs"
                  >
                    {copiedCode ? "✓ Copié !" : "Copier"}
                  </button>
                </div>
              ) : null}

              <p className="mt-2 text-xs leading-relaxed text-[var(--ink-soft)]">
                Utilise ce code personnel pour retrouver ta progression sur ton téléphone et ton
                ordinateur (maximum {MAX_PERSONAL_DEVICES} appareils personnels simultanés).
              </p>

              {student.deviceCount > 1 ? (
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      await revokeOtherDevices();
                    })
                  }
                  className="mt-2.5 cursor-pointer text-xs font-semibold text-[var(--brand)] underline"
                >
                  Déconnecter immédiatement l&apos;autre appareil
                </button>
              ) : null}
            </div>
          </div>
        </section>

        {/* FORMULAIRE DE MISE À JOUR DU PROFIL (SANS CHANGEMENT DE SECTION) */}
        <section className="card p-5 sm:p-6">
          <p className="eyebrow">Informations personnelles</p>
          <h3 className="display mt-1 text-lg font-semibold text-[var(--ink)]">
            Modifier mes coordonnées d&apos;élève
          </h3>
          <form action={updateStudentProfile} className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Nom &amp; Prénom</span>
              <input
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={80}
                defaultValue={student.name}
                className="input !py-2 !text-sm"
              />
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Lycée / Gouvernorat</span>
              <input
                name="lycee"
                type="text"
                maxLength={100}
                defaultValue={student.lycee}
                placeholder="Ex. : Lycée Pilote · Sfax"
                className="input !py-2 !text-sm"
              />
            </label>

            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">
                Section inscrite (verrouillée)
              </span>
              <input
                type="text"
                disabled
                readOnly
                value={`🔒 ${student.section}`}
                className="input cursor-not-allowed !bg-[var(--surface-subtle)] !py-2 !text-sm opacity-80"
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4 sm:col-span-3">
              <button type="submit" className="btn btn-dark btn-sm">
                Enregistrer mes informations
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={() =>
                  startTransition(async () => {
                    await logoutStudentAccount();
                  })
                }
                className="btn btn-ghost btn-sm"
              >
                Se déconnecter de cet appareil
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }

  /* VUE VISITEUR / INSCRIPTION MONO-SECTION & CONNEXION PAR CODE ÉLÈVE */
  return (
    <div className="space-y-6">
      {sessionStatus === "evicted_by_device_limit" ? (
        <div
          role="alert"
          className="rounded-2xl border p-4 text-sm"
          style={{
            background: "var(--callout-warn-bg)",
            borderColor: "var(--callout-warn-border)",
            color: "var(--callout-warn-ink)",
          }}
        >
          <strong>⚠️ Session déconnectée (protection anti-partage) :</strong> ton Code Élève a été
          activé sur un nouvel appareil au-delà de la limite autorisée ({MAX_PERSONAL_DEVICES}{" "}
          appareils personnels max). Reconnecte cet appareil ci-dessous si c&apos;est bien le tien.
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("register")}
          className={`btn btn-sm ${activeTab === "register" ? "btn-primary" : "btn-ghost"}`}
        >
          🔒 Nouvelle inscription (1 seule section)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={`btn btn-sm ${activeTab === "login" ? "btn-primary" : "btn-ghost"}`}
        >
          🔑 J&apos;ai déjà mon Code Élève
        </button>
      </div>

      {activeTab === "register" ? (
        <section className="card p-5 sm:p-7">
          <div className="border-b border-[var(--line)] pb-4">
            <span className="badge badge-brand">Abonnement personnel · 1 section unique</span>
            <h2 className="display mt-2 text-2xl font-semibold text-[var(--ink)]">
              Créer mon compte élève Bac Coach
            </h2>
            <p className="mt-1.5 text-sm text-[var(--ink-soft)]">
              Pour garantir un suivi individuel fiable et éviter le partage d&apos;un même abonnement
              entre plusieurs personnes, <strong className="text-[var(--ink)]">l&apos;inscription couvre une seule et unique section du Baccalauréat</strong>,
              verrouillée dès la validation.
            </p>
          </div>

          {registerState.errors.length > 0 ? (
            <div
              role="alert"
              className="mt-4 rounded-xl border p-3.5 text-xs"
              style={{
                background: "var(--danger-soft)",
                borderColor: "var(--danger-border)",
                color: "var(--brand)",
              }}
            >
              <p className="font-bold">Inscription incomplète :</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {registerState.errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <form action={registerAction} className="mt-5 space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block text-xs">
                <span className="mb-1 block font-semibold text-[var(--ink)]">
                  Nom &amp; Prénom de l&apos;élève *
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Ex. : Mariem Ben Ali"
                  className="input !py-2 !text-sm"
                />
              </label>

              <label className="block text-xs">
                <span className="mb-1 block font-semibold text-[var(--ink)]">
                  Adresse e-mail (recommandé)
                </span>
                <input
                  name="email"
                  type="email"
                  maxLength={120}
                  placeholder="mariem@exemple.tn"
                  className="input !py-2 !text-sm"
                />
              </label>

              <label className="block text-xs">
                <span className="mb-1 block font-semibold text-[var(--ink)]">
                  Lycée &amp; Gouvernorat (optionnel)
                </span>
                <input
                  name="lycee"
                  type="text"
                  maxLength={100}
                  placeholder="Ex. : Lycée Menzah 6 · Ariana"
                  className="input !py-2 !text-sm"
                />
              </label>
            </div>

            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink)]">
                Choisis ton unique section du Baccalauréat (choix définitif) *
              </span>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {SECTIONS.map((sec) => {
                  const info = SECTION_INFO[sec];
                  const preview = previewBySection.get(sec);
                  const checked = selectedSection === sec;
                  return (
                    <label
                      key={sec}
                      className={`cursor-pointer rounded-2xl border p-3.5 transition ${
                        checked
                          ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                          : "border-[var(--line)] bg-[var(--surface-subtle)] hover:border-[var(--line-strong)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="section"
                            value={sec}
                            checked={checked}
                            onChange={() => setSelectedSection(sec)}
                            className="mt-0.5 accent-[var(--brand)]"
                          />
                          <span className="text-sm font-bold text-[var(--ink)]">{sec}</span>
                        </div>
                        {preview ? (
                          <span className="badge badge-slate">{preview.subjectCount} mat.</span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                        {info.description}
                      </p>
                      {preview && preview.topSubjects.length > 0 ? (
                        <p className="mt-2 text-[0.68rem] font-semibold text-[var(--ink)]">
                          Clés : {preview.topSubjects.join(" · ")}
                        </p>
                      ) : null}
                    </label>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-2xl border p-4 text-xs"
              style={{
                background: "var(--callout-warn-bg)",
                borderColor: "var(--callout-warn-border)",
              }}
            >
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  name="confirmSingleSection"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]"
                />
                <span className="leading-relaxed text-[var(--ink)]">
                  <strong>Engagement abonnement mono-section :</strong> je confirme m&apos;inscrire
                  dans la section <strong>« {selectedSection} »</strong>. Je comprends que mon
                  abonnement est personnel, verrouillé sur cette seule section (aucun changement de
                  filière après validation) et limité à {MAX_PERSONAL_DEVICES} appareils personnels
                  (téléphone + ordinateur).
                </span>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[var(--ink-soft)]">
                Un <strong>Code Élève personnel</strong> te sera remis instantanément (+25 XP de
                bienvenue).
              </p>
              <button
                type="submit"
                disabled={isRegistering}
                className="btn btn-primary disabled:opacity-50"
              >
                {isRegistering
                  ? "Création de ton compte…"
                  : `Valider mon inscription en ${selectedSection} →`}
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section className="card max-w-xl p-5 sm:p-7">
          <span className="badge badge-slate">Synchronisation Téléphone ↔ Ordinateur</span>
          <h2 className="display mt-2 text-2xl font-semibold text-[var(--ink)]">
            Reprendre mon compte avec mon Code Élève
          </h2>
          <p className="mt-1.5 text-sm text-[var(--ink-soft)]">
            Saisis le code personnel remis lors de ton inscription (format{" "}
            <code className="font-mono font-semibold text-[var(--ink)]">BAC-XXXX-XX</code>) pour
            retrouver ta section verrouillée, tes notes et tes XP sur cet appareil.
          </p>

          {loginState.errors.length > 0 ? (
            <div
              role="alert"
              className="mt-4 rounded-xl border p-3.5 text-xs"
              style={{
                background: "var(--danger-soft)",
                borderColor: "var(--danger-border)",
                color: "var(--brand)",
              }}
            >
              {loginState.errors.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          ) : null}

          <form action={loginAction} className="mt-5 space-y-4">
            <label className="block text-xs">
              <span className="mb-1 block font-semibold text-[var(--ink)]">Ton Code Élève *</span>
              <input
                name="syncCode"
                type="text"
                required
                placeholder="BAC-7K9P-4M"
                className="input font-mono uppercase tracking-wider !text-base"
              />
            </label>

            <p className="text-[0.72rem] text-[var(--ink-soft)]">
              🔒 Rappel anti-partage : un abonnement autorise au maximum {MAX_PERSONAL_DEVICES}{" "}
              appareils actifs simultanément. Toute connexion supplémentaire déconnecte
              automatiquement l&apos;appareil le plus ancien.
            </p>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary w-full sm:w-auto"
            >
              {isLoggingIn ? "Vérification…" : "Synchroniser cet appareil →"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
