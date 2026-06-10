"use client";

import { useMemo, useState } from "react";
import { facilities, purposes, qualifications, serviceTypes, statusLabels, wards } from "@/data/facilities";

const purposeById = new Map(purposes.map((purpose) => [purpose.id, purpose]));
const statusStyles = {
  official: "bg-leaf text-white",
  candidate: "bg-[#fff6df] text-[#7a5200]",
  checking: "bg-[#eaf4f9] text-[#2c5f80]"
};

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<string | { value: string; label: string }>;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-md border border-sea/20 bg-white px-4 py-3 text-base font-medium text-ink shadow-sm outline-none transition focus:border-sea"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;

          return (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export function RehabFacilitySearch() {
  const [ward, setWard] = useState("");
  const [purpose, setPurpose] = useState("");
  const [qualification, setQualification] = useState("");
  const [serviceType, setServiceType] = useState("");

  const filteredFacilities = useMemo(
    () =>
      facilities.filter((facility) => {
        const matchesWard = !ward || facility.ward === ward;
        const matchesPurpose = !purpose || facility.purposes.includes(purpose);
        const matchesQualification = !qualification || facility.qualifications.includes(qualification);
        const matchesServiceType = !serviceType || facility.types.includes(serviceType);

        return matchesWard && matchesPurpose && matchesQualification && matchesServiceType;
      }),
    [purpose, qualification, serviceType, ward]
  );

  const resetFilters = () => {
    setWard("");
    setPurpose("");
    setQualification("");
    setServiceType("");
  };

  return (
    <div className="grid gap-8">
      <div className="rounded-md bg-white p-5 shadow-soft sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SelectField label="エリア" value={ward} onChange={setWard} options={[...wards]} placeholder="すべての区" />
          <SelectField
            label="目的"
            value={purpose}
            onChange={setPurpose}
            options={purposes.map((item) => ({ value: item.id, label: item.label }))}
            placeholder="すべての目的"
          />
          <SelectField
            label="資格"
            value={qualification}
            onChange={setQualification}
            options={qualifications}
            placeholder="すべての資格"
          />
          <SelectField
            label="サービス"
            value={serviceType}
            onChange={setServiceType}
            options={serviceTypes}
            placeholder="すべての形式"
          />
        </div>
        <div className="mt-5 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-bold text-ink">
            <span className="text-2xl text-sea">{filteredFacilities.length}</span> 件の施設が見つかりました
            <span className="text-ink/50">（全 {facilities.length} 件）</span>
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-sea/25 bg-white px-5 py-2 text-sm font-bold text-sea transition hover:bg-mist"
          >
            条件をリセット
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filteredFacilities.map((facility, index) => (
          <article key={facility.name} className="overflow-hidden rounded-md bg-white shadow-soft">
            <div className="flex min-h-36 items-end bg-gradient-to-br from-[#d9edf5] via-[#eef7f4] to-[#dcefe6] p-5">
              <div className="grid h-16 w-16 place-items-center rounded-md bg-white/90 text-lg font-black text-sea shadow-sm">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-sea px-3 py-1 text-xs font-bold text-white">{facility.ward}</span>
                <span className={`rounded-md px-3 py-1 text-xs font-bold ${statusStyles[facility.status]}`}>
                  {statusLabels[facility.status]}
                </span>
                {facility.types.map((type) => (
                  <span key={type} className="rounded-md bg-mist px-3 py-1 text-xs font-bold text-sea">
                    {type}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-2xl font-black leading-tight text-ink">{facility.name}</h3>
              <p className="mt-3 text-sm font-bold text-ink/60">{facility.address}</p>
              <p className="mt-4 leading-7 text-ink/75">{facility.feature}</p>

              <dl className="mt-5 grid gap-4 border-t border-ink/10 pt-5">
                <div>
                  <dt className="text-sm font-black text-ink">在籍・監修資格</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {facility.qualifications.map((item) => (
                      <span key={item} className="rounded-md bg-paper px-3 py-1 text-sm font-bold text-ink/75">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-ink">主な対象</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {facility.targets.map((item) => (
                      <span key={item} className="rounded-md bg-paper px-3 py-1 text-sm font-bold text-ink/75">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-ink">対応目的</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {facility.purposes.map((item) => (
                      <span key={item} className="rounded-md bg-paper px-3 py-1 text-sm font-bold text-ink/75">
                        {purposeById.get(item)?.label ?? item}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-ink">料金目安</dt>
                  <dd className="mt-1 font-bold text-sea">{facility.price}</dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-ink">情報確認日</dt>
                  <dd className="mt-1 font-semibold text-ink/70">{facility.verifiedAt}</dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-ink">掲載メモ</dt>
                  <dd className="mt-1 text-sm font-semibold leading-6 text-ink/65">{facility.note}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {facility.officialUrl ? (
                  <a
                    href={facility.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-md bg-sea px-5 py-2 text-sm font-bold text-white transition hover:bg-ink"
                  >
                    公式サイト
                  </a>
                ) : null}
                {facility.contactUrl ? (
                  <a
                    href={facility.contactUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-sea bg-white px-5 py-2 text-sm font-bold text-sea transition hover:bg-mist"
                  >
                    問い合わせ
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredFacilities.length === 0 ? (
        <div className="rounded-md bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-ink">条件に合う施設が見つかりませんでした。</p>
          <button type="button" onClick={resetFilters} className="mt-5 rounded-md bg-sea px-5 py-3 font-bold text-white">
            条件をリセット
          </button>
        </div>
      ) : null}
    </div>
  );
}
