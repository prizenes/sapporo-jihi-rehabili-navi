"use client";

import { useMemo, useState } from "react";
import { consultationTopics, plans, type ServicePlanId } from "@/lib/service-content";

type SubmitState = "idle" | "submitting" | "error";

const inputClass =
  "mt-2 w-full rounded-md border border-ink/20 bg-white px-4 py-3 text-base text-ink shadow-sm transition focus:border-sea focus:ring-2 focus:ring-sea/20";

export function ApplyForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const defaultPlan = useMemo<ServicePlanId>(() => plans[0].id, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const topics = formData.getAll("topics").map(String);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      country: String(formData.get("country") ?? ""),
      timezone: String(formData.get("timezone") ?? ""),
      age: String(formData.get("age") ?? ""),
      planId: String(formData.get("planId") ?? defaultPlan),
      topics,
      currentSymptoms: String(formData.get("currentSymptoms") ?? ""),
      diagnosis: String(formData.get("diagnosis") ?? ""),
      surgeryHistory: String(formData.get("surgeryHistory") ?? ""),
      exerciseRestrictions: String(formData.get("exerciseRestrictions") ?? ""),
      redFlags: String(formData.get("redFlags") ?? ""),
      preferredSchedule: String(formData.get("preferredSchedule") ?? ""),
      familyAttendance: String(formData.get("familyAttendance") ?? ""),
      receipt: String(formData.get("receipt") ?? ""),
      consentNonMedical: formData.get("consentNonMedical") === "on",
      consentLocalCare: formData.get("consentLocalCare") === "on",
      consentSelfPaced: formData.get("consentSelfPaced") === "on"
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "決済ページを作成できませんでした。");
      }

      window.location.href = data.url;
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "送信中にエラーが発生しました。");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-md bg-white p-5 shadow-soft sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-bold text-ink">
          氏名
          <input className={inputClass} name="name" autoComplete="name" required />
        </label>
        <label className="font-bold text-ink">
          メールアドレス
          <input className={inputClass} name="email" type="email" autoComplete="email" required />
        </label>
        <label className="font-bold text-ink">
          居住国
          <input className={inputClass} name="country" autoComplete="country-name" required />
        </label>
        <label className="font-bold text-ink">
          タイムゾーン
          <input className={inputClass} name="timezone" placeholder="例: America/Los_Angeles" required />
        </label>
        <label className="font-bold text-ink">
          年齢
          <input className={inputClass} name="age" inputMode="numeric" required />
        </label>
        <label className="font-bold text-ink">
          希望サービス
          <select className={inputClass} name="planId" defaultValue={defaultPlan} required>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} {plan.price}
                {plan.interval ?? ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="rounded-md border border-ink/15 p-4">
        <legend className="px-2 text-lg font-bold text-ink">主な相談内容</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {consultationTopics.map((topic) => (
            <label key={topic} className="flex items-center gap-3 rounded-md bg-mist px-3 py-3 text-base font-semibold">
              <input className="h-5 w-5 accent-sea" type="checkbox" name="topics" value={topic} />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="font-bold text-ink">
        現在の症状
        <textarea className={inputClass} name="currentSymptoms" rows={4} required />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="font-bold text-ink">
          診断名の有無
          <input className={inputClass} name="diagnosis" placeholder="例: あり・なし・不明" />
        </label>
        <label className="font-bold text-ink">
          手術歴
          <input className={inputClass} name="surgeryHistory" placeholder="例: なし / 2023年に膝の手術" />
        </label>
        <label className="font-bold text-ink">
          医師からの運動制限の有無
          <select className={inputClass} name="exerciseRestrictions" required>
            <option value="">選択してください</option>
            <option value="なし">なし</option>
            <option value="あり">あり</option>
            <option value="不明">不明</option>
          </select>
        </label>
        <label className="font-bold text-ink">
          強い痛み・しびれ・麻痺・急な症状悪化・転倒後の痛みの有無
          <select className={inputClass} name="redFlags" required>
            <option value="">選択してください</option>
            <option value="なし">なし</option>
            <option value="あり">あり</option>
            <option value="不明">不明</option>
          </select>
        </label>
        <label className="font-bold text-ink">
          希望日時
          <textarea className={inputClass} name="preferredSchedule" rows={3} placeholder="候補日時を複数ご記入ください" required />
        </label>
        <label className="font-bold text-ink">
          家族同席の希望
          <select className={inputClass} name="familyAttendance" required>
            <option value="">選択してください</option>
            <option value="希望する">希望する</option>
            <option value="希望しない">希望しない</option>
            <option value="相談したい">相談したい</option>
          </select>
        </label>
        <label className="font-bold text-ink">
          領収書の要否
          <select className={inputClass} name="receipt" required>
            <option value="">選択してください</option>
            <option value="必要">必要</option>
            <option value="不要">不要</option>
          </select>
        </label>
      </div>

      <fieldset className="rounded-md border border-coral/35 bg-coral/5 p-4">
        <legend className="px-2 text-lg font-bold text-ink">同意チェック</legend>
        <div className="mt-3 grid gap-3">
          <label className="flex gap-3 text-base font-semibold leading-7">
            <input className="mt-1 h-5 w-5 shrink-0 accent-sea" type="checkbox" name="consentNonMedical" required />
            本サービスは診断・治療を目的とした医療行為ではないことを理解しました
          </label>
          <label className="flex gap-3 text-base font-semibold leading-7">
            <input className="mt-1 h-5 w-5 shrink-0 accent-sea" type="checkbox" name="consentLocalCare" required />
            必要に応じて現地医療機関を受診します
          </label>
          <label className="flex gap-3 text-base font-semibold leading-7">
            <input className="mt-1 h-5 w-5 shrink-0 accent-sea" type="checkbox" name="consentSelfPaced" required />
            運動は無理のない範囲で実施します
          </label>
        </div>
      </fieldset>

      {error ? <p className="rounded-md bg-coral/10 p-4 font-bold text-coral">{error}</p> : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-md bg-sea px-6 py-4 text-lg font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-ink/45"
      >
        {state === "submitting" ? "決済ページを準備しています" : "内容を送信して決済へ進む"}
      </button>
    </form>
  );
}
