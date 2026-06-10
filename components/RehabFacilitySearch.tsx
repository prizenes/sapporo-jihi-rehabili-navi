"use client";

import { useMemo, useState } from "react";
import { facilities, purposes, qualifications, serviceTypes, statusLabels, wards, type PurposeId } from "@/data/facilities";

const purposeById = new Map(purposes.map((purpose) => [purpose.id, purpose]));
const statusStyles = {
  official: "bg-[#4D9B7C] text-white",
  candidate: "bg-[#FFF6DF] text-[#7A5200] border border-[#F1D38A]",
  checking: "bg-[#EAF4F9] text-[#2C5F80] border border-[#CFE2EC]"
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
    <label className="grid gap-2 text-sm font-bold text-[#5A6B73]">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-xl border-2 border-[#D9E6EC] bg-[#FBFDFE] px-4 py-3 text-base font-medium text-[#2E3A40] outline-none transition focus:border-[#3D7EA6]"
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
  const [purpose, setPurpose] = useState<PurposeId | "">("");
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
    <div className="grid gap-7">
      <div className="rounded-[18px] border border-[#D9E6EC] bg-white p-5 shadow-[0_4px_18px_rgba(61,126,166,.10)] sm:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end">
          <SelectField label="エリア" value={ward} onChange={setWard} options={[...wards]} placeholder="すべての区" />
          <SelectField
            label="目的"
            value={purpose}
            onChange={(value) => setPurpose(value as PurposeId | "")}
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
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-xl border-2 border-[#D9E6EC] bg-white px-5 py-3 text-sm font-bold text-[#5A6B73] transition hover:border-[#5A6B73] hover:text-[#2E3A40]"
          >
            条件をリセット
          </button>
        </div>
      </div>

      <p className="text-sm font-semibold text-[#5A6B73]">
        <strong className="text-xl font-black text-[#2C5F80]">{filteredFacilities.length}</strong> 件の施設が見つかりました（全 {facilities.length} 件）
      </p>

      <div className="grid gap-5 lg:grid-cols-2">
        {filteredFacilities.map((facility, index) => (
          <article key={facility.name} className="flex flex-col overflow-hidden rounded-[18px] border border-[#D9E6EC] bg-white shadow-[0_2px_10px_rgba(61,126,166,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(61,126,166,.10)]">
            <div className="relative grid h-[150px] place-items-center bg-gradient-to-br from-[#7FB3CF] to-[#A8D5BA] text-4xl font-black text-white">
              {facility.ward.slice(0, 1)}
              <span className="absolute bottom-3 right-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-[#5A6B73]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-black leading-8 text-[#2E3A40]">{facility.name}</h3>
                <span className="flex-none rounded-full bg-[#EAF4F9] px-4 py-1.5 text-sm font-black text-[#2C5F80]">{facility.ward}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-black ${statusStyles[facility.status]}`}>
                  {statusLabels[facility.status]}
                </span>
                {facility.types.map((type) => (
                  <span key={type} className="rounded-full bg-[#EAF4F9] px-3 py-1 text-xs font-bold text-[#2C5F80]">
                    {type}
                  </span>
                ))}
              </div>
              <p className="text-sm font-bold leading-6 text-[#5A6B73]">{facility.address}</p>
              <p className="rounded-r-xl border-l-4 border-[#4D9B7C] bg-[#FBFDFE] px-4 py-3 text-sm font-semibold leading-7 text-[#2E3A40]">
                {facility.feature}
              </p>

              <dl className="grid gap-3 border-t border-[#D9E6EC] pt-4">
                <div>
                  <dt className="text-sm font-black text-[#2E3A40]">在籍・監修資格</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {facility.qualifications.map((item) => (
                      <span key={item} className="rounded-full border border-[#CDE8DB] bg-[#EAF5EF] px-3 py-1 text-xs font-black text-[#3A7A61]">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-[#2E3A40]">主な対象</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {facility.targets.map((item) => (
                      <span key={item} className="rounded-full bg-[#F2F6F8] px-3 py-1 text-xs font-bold text-[#5A6B73]">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-[#2E3A40]">対応目的</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {facility.purposes.map((item) => (
                      <span key={item} className="rounded-full bg-[#EAF4F9] px-3 py-1 text-xs font-bold text-[#2C5F80]">
                        {purposeById.get(item)?.label ?? item}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-[#2E3A40]">料金目安</dt>
                  <dd className="mt-1 text-sm font-black text-[#2C5F80]">{facility.price}</dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-[#2E3A40]">情報確認日</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#5A6B73]">{facility.verifiedAt}</dd>
                </div>
                <div>
                  <dt className="text-sm font-black text-[#2E3A40]">掲載メモ</dt>
                  <dd className="mt-1 text-sm font-semibold leading-6 text-[#5A6B73]">{facility.note}</dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
                {facility.officialUrl ? (
                  <a
                    href={facility.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border-2 border-[#3D7EA6] bg-white px-5 py-2 text-sm font-black text-[#3D7EA6] transition hover:bg-[#EAF4F9]"
                  >
                    公式サイト
                  </a>
                ) : null}
                {facility.contactUrl ? (
                  <a
                    href={facility.contactUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#4D9B7C] px-5 py-2 text-sm font-black text-white transition hover:bg-[#3A7A61]"
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
        <div className="rounded-[18px] bg-white p-10 text-center">
          <p className="text-lg font-bold text-[#2E3A40]">条件に合う施設が見つかりませんでした。</p>
          <button type="button" onClick={resetFilters} className="mt-5 rounded-full bg-[#3D7EA6] px-6 py-3 font-black text-white">
            条件をリセット
          </button>
        </div>
      ) : null}
    </div>
  );
}
