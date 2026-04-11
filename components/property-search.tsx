export default function PropertySearch() {
  return (
    <form
      action="/properties"
      className="hero-filter-enter grid gap-3 rounded-3xl border border-white/35 bg-white/10 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className="text-xs uppercase tracking-[0.3em] text-white/90">
        Location
        <input
          type="text"
          name="location"
          placeholder="Karen, Runda, Kilimani"
          className="mt-2 w-full rounded-2xl border border-white/35 bg-white/90 px-4 py-3 text-base text-ink-900 outline-none transition focus:border-[#145b36]"
        />
      </label>
      <label className="text-xs uppercase tracking-[0.3em] text-white/90">
        Min Price (KES)
        <input
          type="number"
          name="minPrice"
          placeholder="25000000"
          className="mt-2 w-full rounded-2xl border border-white/35 bg-white/90 px-4 py-3 text-base text-ink-900 outline-none transition focus:border-[#145b36]"
        />
      </label>
      <label className="text-xs uppercase tracking-[0.3em] text-white/90">
        Bedrooms
        <input
          type="number"
          name="bedrooms"
          min={1}
          placeholder="3"
          className="mt-2 w-full rounded-2xl border border-white/35 bg-white/90 px-4 py-3 text-base text-ink-900 outline-none transition focus:border-[#145b36]"
        />
      </label>
      <button
        type="submit"
        className="mt-auto rounded-2xl bg-[#145b36] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 hover:bg-[#114b2d]"
      >
        Search
      </button>
    </form>
  );
}
